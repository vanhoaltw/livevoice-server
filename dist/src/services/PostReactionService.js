"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseServiec_1 = __importDefault(require("./baseServiec"));
const constants_1 = require("../settings/constants");
const PostReaction_1 = __importDefault(require("../models/PostReaction"));
class PostReactionService extends baseServiec_1.default {
    async getReactions(postId, page, pageSize = constants_1.PAGE_SIZE) {
        const _query = PostReaction_1.default.query().withGraphFetched('[author]').where({ postId });
        return _query.page(page, pageSize);
    }
}
exports.default = new PostReactionService(new PostReaction_1.default());
//# sourceMappingURL=PostReactionService.js.map