"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
    type RoomMessage {
        id: String
        text: String
        sender: User
        room: Room
    }

    input RoomMessageInput {
        text: String
    }
  
    type Mutation {
        sendMessage( roomId: Int!, input: RoomMessageInput): RoomMessage
    }

    type Subscription {
        messageAdded(roomId: Int!): RoomMessage
    }
`;
//# sourceMappingURL=roomMessage.js.map