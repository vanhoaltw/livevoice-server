"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
class PostComment extends Base_1.default {
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['authorId'],
            properties: {
                id: { type: 'integer' },
                postId: { type: 'integer' },
                authorId: { type: 'integer' },
                content: { type: ['string', 'null'] },
                likeCount: { type: 'integer', default: 0 },
                commentCount: { type: 'integer', default: 0 },
            },
        };
    }
    static get relationMappings() {
        return {
            author: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'post_comment.authorId',
                    to: 'user.id',
                },
            },
        };
    }
}
PostComment.tableName = 'post_comment';
exports.default = PostComment;
//# sourceMappingURL=PostComment.js.map