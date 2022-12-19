"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const HOST = process.env.REDIS_HOST || 'localhost';
const PORT = process.env.REDIS_PORT || '6379';
const options = {
    host: HOST,
    port: Number(PORT),
    ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
    maxRetriesPerRequest: null,
};
const client = new ioredis_1.default(options);
exports.default = client;
//# sourceMappingURL=redis.js.map