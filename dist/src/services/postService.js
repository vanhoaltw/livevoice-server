"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseServiec_1 = __importDefault(require("./baseServiec"));
const Post_1 = __importDefault(require("../models/Post"));
const constants_1 = require("../settings/constants");
class PostService extends baseServiec_1.default {
    async getPosts(filter, sort, page, pageSize = constants_1.PAGE_SIZE) {
        const _query = Post_1.default.query().withGraphFetched('[author]');
        const finalQuery = await this.sortJson(this.filterJson(_query, filter), sort).page(page, pageSize);
        return finalQuery;
    }
    async getMyPosts(userId, sort, page, pageSize) {
        const _query = Post_1.default.query().withGraphFetched('[author]').where({ authorId: userId });
        return this.sortJson(_query, sort).page(page, pageSize);
    }
}
exports.default = new PostService(new Post_1.default());
//# sourceMappingURL=postService.js.map