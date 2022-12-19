"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
exports.default = {
    Query: {
        topic: async (_parent, _, { me }) => {
            const user = await models_1.UserModel.query().findById(me.id);
            return user;
        },
    },
    Mutation: {},
};
//# sourceMappingURL=topic.js.map