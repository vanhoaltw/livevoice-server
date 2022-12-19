import { mergeTypeDefs } from '@graphql-tools/merge'
import { formatError } from './../settings/middleware'
import moment from 'moment'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { Application } from 'express'
import { MyContext } from './context'
import { Server } from 'http'
import { UserModel } from '../models'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws'
import { GRAPHQL_WS, SubscriptionServer } from 'subscriptions-transport-ws'
import { mergeResolvers } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { execute, subscribe } from 'graphql'

interface IContext {
  req: Request & { headers: { authorization?: string; Authorization?: string } }
  connection: any
}

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './types')))
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')))

const getContext = async (token: string): Promise<MyContext | null> => {
  let me: UserModel
  const decoded = UserModel.decodeToken(token)
  if (decoded) {
    if (decoded.email) {
      me = await UserModel.query().findOne({ email: decoded.email })
    }
    if (me) {
      if (moment(decoded.at, 'YYYYMMDDHHmmss').add(90, 'days').isBefore(moment())) {
        throw new AuthenticationError('EXPIRED_TOKEN')
      }
    }
    return { me }
  }

  return null
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const getDynamicContext = async (ctx, msg?: any, args?: any) => {
  const connectionParams = ctx.connectionParams
  const authorization = connectionParams.authorization || connectionParams.Authorization
  try {
    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      const token = authorization.split(' ')[1]
      const ctx = await getContext(token)
      if (ctx) return ctx
    }
    throw new AuthenticationError('Missing auth token!')
  } catch (err) {
    if (err instanceof Error) {
      throw new AuthenticationError(err.message)
    }
  }
}

export const startApolloServer = async (app: Application, httpServer: Server) => {
  // graphql-ws
  const wsServer = new WebSocketServer({ noServer: true })
  const serverCleanup = useServer(
    {
      schema,
      context: (ctx, msg, args) => {
        return getDynamicContext(ctx, msg, args)
      },
    },
    wsServer
  )

  // subscriptions-transport-ws
  const subTransWs = new WebSocketServer({ noServer: true })
  SubscriptionServer.create(
    {
      schema,
      subscribe: subscribe,
      execute: execute,
      onConnect: async (connectionParams: any) => {
        getDynamicContext({ connectionParams })
      },
    },
    subTransWs
  )

  httpServer.on('upgrade', (req, socket, head) => {
    // extract websocket subprotocol from header
    const protocol = req.headers['sec-websocket-protocol']
    const protocols = Array.isArray(protocol) ? protocol : protocol?.split(',').map((p) => p.trim())

    // decide which websocket server to use
    const wss =
      protocols?.includes(GRAPHQL_WS) && // subscriptions-transport-ws subprotocol
      !protocols.includes(GRAPHQL_TRANSPORT_WS_PROTOCOL) // graphql-ws subprotocol
        ? subTransWs
        : // graphql-ws will welcome its own subprotocol and
          // gracefully reject invalid ones. if the client supports
          // both transports, graphql-ws will prevail
          wsServer
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req)
    })
  })

  const graphqlServer = new ApolloServer({
    introspection: process.env.NODE_ENV !== 'production',
    formatError,
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
    context: async ({ req, connection }: IContext): Promise<MyContext> => {
      try {
        if (connection) return connection.context
        const HEADER_REGEX = /Bearer (.*)$/
        const authorization = req.headers?.authorization || req.headers?.Authorization
        let ctx: MyContext = {}
        if (authorization) {
          const token = HEADER_REGEX.exec(authorization as string)?.[1]
          ctx = await getContext(token)
        }

        return { ...ctx }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Connnection error', error.message)
          throw new AuthenticationError(error.message)
        }
      }
    },
  })

  await graphqlServer.start()
  graphqlServer.applyMiddleware({ app, path: graphqlServer.graphqlPath })

  return graphqlServer
}
