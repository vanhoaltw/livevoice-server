"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
// import user from './user'
// import { gql } from 'apollo-server-express'
// import UserSchema from './user'
const typesArray = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, './'), { extensions: ['graphql'] });
console.log({ typesArray });
// console.log({ __dirname })
// const typesArray = [user]
exports.default = (0, merge_1.mergeTypeDefs)(typesArray);
// const linkSchema = gql`
//   scalar Date
//   scalar DateTime
//   scalar JSON
//   scalar JSONObject
//   enum CacheControlScope {
//     PUBLIC
//     PRIVATE
//   }
//   directive @cacheControl(
//     maxAge: Int
//     scope: CacheControlScope
//     inheritMaxAge: Boolean
//   ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
//   type Query {
//     _: Boolean
//   }
//   type Mutation {
//     _: Boolean
//   }
//   type Subscription {
//     _: Boolean
//   }
// `
// export default [linkSchema, UserSchema]
//# sourceMappingURL=index.js.map