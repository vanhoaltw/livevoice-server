"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const db_1 = __importDefault(require("../settings/db"));
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log({ config: db_1.default[NODE_ENV] });
const knex = (0, knex_1.default)({ ...db_1.default[NODE_ENV] });
objection_1.Model.knex(knex);
exports.default = knex;
//# sourceMappingURL=knex.js.map