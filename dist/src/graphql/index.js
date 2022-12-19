"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApolloServer = void 0;
const merge_1 = require("@graphql-tools/merge");
const middleware_1 = require("./../settings/middleware");
const moment_1 = __importDefault(require("moment"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const models_1 = require("../models");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const graphql_ws_1 = require("graphql-ws");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const merge_2 = require("@graphql-tools/merge");
const load_files_1 = require("@graphql-tools/load-files");
const path_1 = __importDefault(require("path"));
const schema_1 = require("@graphql-tools/schema");
const graphql_1 = require("graphql");
const typeDefs = (0, merge_1.mergeTypeDefs)((0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './types')));
const resolvers = (0, merge_2.mergeResolvers)((0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './resolvers')));
const getContext = async (token) => {
    let me;
    const decoded = models_1.UserModel.decodeToken(token);
    if (decoded) {
        if (decoded.email) {
            me = await models_1.UserModel.query().findOne({ email: decoded.email });
        }
        if (me) {
            if ((0, moment_1.default)(decoded.at, 'YYYYMMDDHHmmss').add(90, 'days').isBefore((0, moment_1.default)())) {
                throw new apollo_server_express_1.AuthenticationError('EXPIRED_TOKEN');
            }
        }
        return { me };
    }
    return null;
};
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
const getDynamicContext = async (ctx, msg, args) => {
    const connectionParams = ctx.connectionParams;
    const authorization = connectionParams.authorization || connectionParams.Authorization;
    try {
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            const token = authorization.split(' ')[1];
            const ctx = await getContext(token);
            if (ctx)
                return ctx;
        }
        throw new apollo_server_express_1.AuthenticationError('Missing auth token!');
    }
    catch (err) {
        if (err instanceof Error) {
            throw new apollo_server_express_1.AuthenticationError(err.message);
        }
    }
};
const startApolloServer = async (app, httpServer) => {
    // graphql-ws
    const wsServer = new ws_1.WebSocketServer({ noServer: true });
    const serverCleanup = (0, ws_2.useServer)({
        schema,
        context: (ctx, msg, args) => {
            return getDynamicContext(ctx, msg, args);
        },
    }, wsServer);
    // subscriptions-transport-ws
    const subTransWs = new ws_1.WebSocketServer({ noServer: true });
    subscriptions_transport_ws_1.SubscriptionServer.create({
        schema,
        subscribe: graphql_1.subscribe,
        execute: graphql_1.execute,
        onConnect: async (connectionParams) => {
            getDynamicContext({ connectionParams });
        },
    }, subTransWs);
    httpServer.on('upgrade', (req, socket, head) => {
        // extract websocket subprotocol from header
        const protocol = req.headers['sec-websocket-protocol'];
        const protocols = Array.isArray(protocol) ? protocol : protocol?.split(',').map((p) => p.trim());
        // decide which websocket server to use
        const wss = protocols?.includes(subscriptions_transport_ws_1.GRAPHQL_WS) && // subscriptions-transport-ws subprotocol
            !protocols.includes(graphql_ws_1.GRAPHQL_TRANSPORT_WS_PROTOCOL) // graphql-ws subprotocol
            ? subTransWs
            : // graphql-ws will welcome its own subprotocol and
                // gracefully reject invalid ones. if the client supports
                // both transports, graphql-ws will prevail
                wsServer;
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        });
    });
    const graphqlServer = new apollo_server_express_1.ApolloServer({
        introspection: process.env.NODE_ENV !== 'production',
        formatError: middleware_1.formatError,
        typeDefs,
        resolvers,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
        context: async ({ req, connection }) => {
            try {
                if (connection)
                    return connection.context;
                const HEADER_REGEX = /Bearer (.*)$/;
                const authorization = req.headers?.authorization || req.headers?.Authorization;
                let ctx = {};
                if (authorization) {
                    const token = HEADER_REGEX.exec(authorization)?.[1];
                    ctx = await getContext(token);
                }
                return { ...ctx };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Connnection error', error.message);
                    throw new apollo_server_express_1.AuthenticationError(error.message);
                }
            }
        },
    });
    await graphqlServer.start();
    graphqlServer.applyMiddleware({ app, path: graphqlServer.graphqlPath });
    return graphqlServer;
};
exports.startApolloServer = startApolloServer;
//# sourceMappingURL=index.js.map