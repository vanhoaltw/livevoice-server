"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const graphql_1 = require("./graphql");
const http_1 = require("http");
const knex_1 = __importDefault(require("./utils/knex"));
const models = __importStar(require("./models"));
const objection_1 = require("objection");
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
knex_1.default.raw('select 1+1 as result').then(async () => {
    await (0, objection_1.initialize)(Object.values(models));
    console.log('good connection?');
});
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(express_1.default.json({ limit: '10mb' }));
app.set('trust proxy', true);
app.use((0, morgan_1.default)('combined'));
(0, routes_1.default)(app);
(0, graphql_1.startApolloServer)(app, httpServer).then((graphqlServer) => {
    httpServer.listen({ port: PORT }, () => {
        console.log('NODE_ENV', NODE_ENV);
        console.log(`🚀 Server ready at http://localhost:${PORT}${graphqlServer.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${graphqlServer.graphqlPath}`);
        console.log(`🚀 Metrics are exposed on http://localhost:${PORT}/metrics`);
    });
});
//# sourceMappingURL=index.js.map