"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseServiec_1 = __importDefault(require("./baseServiec"));
const constants_1 = require("../settings/constants");
const PostComment_1 = __importDefault(require("../models/PostComment"));
const PostComment_2 = __importDefault(require("../models/PostComment"));
class PostCommentService extends baseServiec_1.default {
    async getComments(postId, sort, page, pageSize = constants_1.PAGE_SIZE) {
        const _query = PostComment_1.default.query().withGraphFetched('[author]').where({ postId });
        return this.sortJson(_query, sort).page(page, pageSize);
    }
}
exports.default = new PostCommentService(new PostComment_2.default());
//# sourceMappingURL=postCommentService.js.map