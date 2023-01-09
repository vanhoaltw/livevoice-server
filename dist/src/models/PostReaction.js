"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
const Post_1 = __importDefault(require("./Post"));
class PostReaction extends Base_1.default {
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['authorId'],
            properties: {
                id: { type: 'integer' },
                postId: { type: 'integer' },
                authorId: { type: 'integer' },
            },
        };
    }
    static get relationMappings() {
        return {
            author: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'post_reaction.authorid',
                    to: 'user.id',
                },
            },
            post: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Post_1.default,
                join: {
                    from: 'post_reaction.postId',
                    to: 'post.id',
                },
            },
        };
    }
}
PostReaction.tableName = 'post_reaction';
exports.default = PostReaction;
//# sourceMappingURL=PostReaction.js.map