"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../generated/graphql");
const Base_1 = __importDefault(require("./Base"));
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
class PostModel extends Base_1.default {
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['authorId'],
            properties: {
                id: { type: 'integer' },
                authorId: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 120 },
                description: { type: ['string', 'null'] },
                content: { type: ['object', 'null'] },
                likeCount: { type: 'integer', default: 0 },
                commentCount: { type: 'integer', default: 0 },
                status: { type: 'string', enum: Object.values(graphql_1.PostStatus), default: graphql_1.PostStatus.Public },
            },
        };
    }
    static get relationMappings() {
        return {
            author: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'post.authorId',
                    to: 'user.id',
                },
            },
        };
    }
}
PostModel.tableName = 'post';
exports.default = PostModel;
//# sourceMappingURL=Post.js.map