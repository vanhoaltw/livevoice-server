import express, { Application, Request } from 'express'
import morgan from 'morgan'
import routes from './routes'
import { startApolloServer } from './graphql'
import { createServer } from 'http'
import knex from './settings/knex'
import * as models from './models'
import { initialize } from 'objection'
import cors from 'cors'
import redisClient from './utils/redis'

const PORT: string | number = process.env.PORT || 4000
const NODE_ENV: string = process.env.NODE_ENV || 'development'

const app: Application = express()
const httpServer = createServer(app)

knex
  .raw('select 1+1 as result')
  .then(async () => {
    await initialize(Object.values(models))
    console.log('good connection?')
  })
  .catch((err) => {
    console.log('[Fatal] Failed to establish connection to database! Exiting...')
    console.log(err)
    process.exit(1)
  })

redisClient.on('connect', function () {
  console.log('Redis client connected')
})

app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: '10mb' }))
app.set('trust proxy', true)
app.use(cors())
app.use(morgan('combined'))

app.use('/api', routes)

startApolloServer(app, httpServer).then((graphqlServer) => {
  httpServer.listen({ port: PORT }, () => {
    console.log('NODE_ENV', NODE_ENV)
    console.log(`🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${graphqlServer.graphqlPath}`)
    console.log(`🚀 Metrics are exposed on http://localhost:${PORT}/metrics`)
  })
})
