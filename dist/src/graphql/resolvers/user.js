"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const models_1 = require("../../models");
exports.default = {
    Query: {
        me: async (_parent, _, { me }) => {
            const user = await models_1.UserModel.query().findById(me.id);
            return user;
        },
        user: async (_parent, { id, username }, { me }) => {
            let user = null;
            if (id)
                user = await models_1.UserModel.query().findById(id);
            else if (username)
                user = await models_1.UserModel.query().findOne({ username });
            if (!user)
                throw new apollo_server_errors_1.PersistedQueryNotFoundError();
            return user;
        },
    },
    Mutation: {
        editUser: async (_parent, { input }, { me }) => {
            if (!me?.id)
                throw new apollo_server_errors_1.PersistedQueryNotFoundError();
            const user = await models_1.UserModel.query().findById(me?.id);
            if (!user)
                throw new apollo_server_errors_1.PersistedQueryNotFoundError();
            const result = await models_1.UserModel.query().upsertGraphAndFetch({ ...input, id: me.id });
            return result;
        },
    },
    User: {
        isFollowing: async (user, _, { me }) => {
            if (!me || user.id === me?.id)
                return null;
            const isFollowing = await models_1.UserConnectionModel.query().findOne({ followerId: me.id, followingId: user.id });
            return !!isFollowing;
        },
        isFollowed: async (user, _, { me }) => {
            if (!me || user.id === me?.id)
                return null;
            const isFollowed = await models_1.UserConnectionModel.query().findOne({ followerId: user.id, followingId: me.id });
            return !!isFollowed;
        },
    },
};
//# sourceMappingURL=user.js.map