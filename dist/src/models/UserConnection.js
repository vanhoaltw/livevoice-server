"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Base_1 = __importDefault(require("./Base"));
const User_1 = __importDefault(require("./User"));
class UserConnectionModel extends Base_1.default {
    // Input validation
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['followerId'],
            properties: {
                id: { type: 'integer' },
                followerId: { type: 'integer' },
                followingId: { type: 'integer' },
            },
        };
    }
    // Relation mapping
    static get relationMappings() {
        return {
            follower: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'user_connection.followerId',
                    to: 'user.id',
                },
            },
            following: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'user_connection.followingId',
                    to: 'user.id',
                },
            },
        };
    }
}
UserConnectionModel.tableName = 'user_connection';
exports.default = UserConnectionModel;
//# sourceMappingURL=UserConnection.js.map