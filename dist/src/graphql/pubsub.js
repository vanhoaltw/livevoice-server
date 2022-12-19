"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const ioredis_1 = __importDefault(require("ioredis"));
const HOST = process.env.REDIS_HOST || 'localhost';
const PORT = process.env.REDIS_PORT || '6379';
const options = {
    host: HOST,
    port: Number(PORT),
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
    ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
};
const pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
    publisher: new ioredis_1.default(options),
    subscriber: new ioredis_1.default(options),
});
exports.default = pubsub;
//# sourceMappingURL=pubsub.js.map