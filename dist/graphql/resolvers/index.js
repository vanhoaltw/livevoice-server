"use strict";
// import path from 'path'
// import { mergeResolvers } from '@graphql-tools/merge'
// import { loadFilesSync } from '@graphql-tools/load-files'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const resolversArray = loadFilesSync(path.join(__dirname, '.'))
// export default mergeResolvers(resolversArray)
const user_1 = __importDefault(require("./user"));
exports.default = {
    Query: {
        ...user_1.default.Query,
    },
};
//# sourceMappingURL=index.js.map