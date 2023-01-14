"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
exports.default = {
    development: {
        client: 'pg',
        connection: {
            // host: 'localhost',
            // port: '5432',
            // database: 'development',
            // password: '2662001',
            // user: 'super_admin',
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
//# sourceMappingURL=knexfile.js.map