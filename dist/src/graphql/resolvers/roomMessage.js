"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const faker_1 = require("@faker-js/faker");
const constants_1 = require("../../settings/constants");
const models_1 = require("../../models");
const pubsub_1 = __importDefault(require("../pubsub"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
exports.default = {
    Mutation: {
        sendMessage: async (_parent, { roomId, input }, { me }) => {
            const room = await models_1.RoomModel.query().findById(roomId);
            if (!room || !room.allowChat) {
                throw new apollo_server_express_1.ValidationError(constants_1.CODE_ERROR.INVALID_ROOM);
            }
            const message = {
                id: faker_1.faker.datatype.uuid(),
                text: input?.text || '',
                sender: me,
                room,
            };
            pubsub_1.default.publish(constants_1.SUBCRIPTION_ROOM_MESSAGES, { messageAdded: message });
            return message;
        },
    },
    Subscription: {
        messageAdded: {
            subscribe: (0, graphql_subscriptions_1.withFilter)((_, args) => pubsub_1.default.asyncIterator(constants_1.SUBCRIPTION_ROOM_MESSAGES), (payload, variables) => {
                return payload.messageAdded.room.id === variables.roomId;
            }),
        },
    },
};
//# sourceMappingURL=roomMessage.js.map