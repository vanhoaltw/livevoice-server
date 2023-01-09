"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("./../../generated/graphql");
const UserConnection_1 = __importDefault(require("../../models/UserConnection"));
const models_1 = require("../../models");
exports.default = {
    Query: {},
    Mutation: {
        follow: async (_parent, { userId, action }, { me }) => {
            await models_1.UserModel.transaction(async (trx) => {
                if (action === graphql_1.FollowAction.Follow) {
                    const isFollow = await UserConnection_1.default.query().findOne({ followerId: me.id, followingId: userId });
                    if (isFollow)
                        return true;
                    await models_1.UserModel.query(trx).findById(me.id).increment('followingCount', 1);
                    await models_1.UserModel.query(trx).findById(userId).increment('followerCount', 1);
                    await UserConnection_1.default.query(trx).insert({ followerId: me.id, followingId: userId });
                    return true;
                }
                else if (action === graphql_1.FollowAction.Unfollow) {
                    await models_1.UserModel.query(trx).findById(me.id).decrement('followingCount', 1);
                    await models_1.UserModel.query(trx).findById(userId).decrement('followerCount', 1);
                    await UserConnection_1.default.query(trx).delete().where({ followerId: me.id, followingId: userId });
                    return true;
                }
                return false;
            });
        },
    },
};
//# sourceMappingURL=userConnection.js.map