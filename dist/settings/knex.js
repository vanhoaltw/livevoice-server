"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            user: process.env.DATABASE_USER,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'migrations',
        },
    },
    staging: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            user: process.env.DATABASE_USER,
        },
        pool: {
            min: 2,
            max: 23,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'migrations',
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            user: process.env.DATABASE_USER,
        },
        pool: {
            min: 2,
            max: 23,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'migrations',
        },
    },
};
//# sourceMappingURL=knex.js.map