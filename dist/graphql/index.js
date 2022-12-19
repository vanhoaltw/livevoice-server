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
// import { makeExecutableSchema } from '@graphql-tools/schema'
const merge_2 = require("@graphql-tools/merge");
const load_files_1 = require("@graphql-tools/load-files");
const path_1 = __importDefault(require("path"));
const typeDefs = (0, merge_1.mergeTypeDefs)((0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './types')));
const resolvers = (0, merge_2.mergeResolvers)((0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './resolvers')));
const getContext = async (token) => {
    let me;
    const decoded = models_1.UserModel.decodeToken(token);
    if (decoded) {
        if (decoded.id) {
            me = await models_1.UserModel.query().findOne({ id: decoded.id });
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
const startApolloServer = async (app, httpServer) => {
    const graphqlServer = new apollo_server_express_1.ApolloServer({
        introspection: process.env.NODE_ENV !== 'production',
        formatError: middleware_1.formatError,
        typeDefs,
        resolvers,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        context: async ({ req, connection, }) => {
            if (connection) {
                return connection.context;
            }
            try {
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