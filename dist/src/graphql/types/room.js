"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
    type Room {
        id: Int!
        creatorId: Int!
        title: String
        description: String
        notification: String
        imageUrl: String
        status: RoomStatus
        start: Date
        end: Date
        type: RoomType
        password: String
        playbackId: String
        allowChat: Boolean
        freeMic: Boolean
        mode: RoomMode
        creator: User
        seatLocked: String
        audience: [RoomAudience]
    }

    type RoomAudience {
        id: Int!
        userId: Int!
        roomId: Int!
        seat: Int
        role: AudienceRole
        isInRoom: Boolean
        isHandUp: Boolean
        isMuted: Boolean
        user: User
    }

    type RoomWithToken {
        token: String
        room: Room
    }

    type GetLiveRoom {
        result: [Room]
        total: Int
    }

    input CreateRoomInput {
        title: String!
        thumbUrl: String
        description: String
        hostIds: [Int]
        guestIds: [Int]
        type: RoomType
        comunityId: Int
        topic: [Int]
        status: RoomStatus
        creatorId: Int!
        password: String
    }

    input EditLiveRoomInput{
        title: String
        description: String
        type: RoomType
        freeMic: Boolean
        muteAll: Boolean
        password: String
        imageUrl: String
        seatLocked: String
        notification: String
    }

    input UpdateAudienceInput{
        seat: Int
        role: AudienceRole
        isInRoom: Boolean
        isHandUp: Boolean
        isMuted: Boolean
    }
  
   type Query {
        room(id: Int!): Room
        getLiveRoom: GetLiveRoom
        getLiveStream(roomId: Int!): RoomWithToken
        getRoomAudience(roomId: Int!): [RoomAudience]
    }

    type Mutation {
        createRoom(input: CreateRoomInput!): Room
        startLive(id: Int!): RoomWithToken
        stopLive(id: Int!): Room
        joinRoom(id: Int!, password: String): RoomAudience
        updateAudience(roomId: Int!, input:UpdateAudienceInput): RoomAudience 
        editLiveRoom(id: Int!, input: EditLiveRoomInput!): Room
        leaveRoom(roomId: Int!): Boolean
    }

    type Subscription {
        roomChanged(roomId: Int!): Room!
        audienceChanged(roomId: Int!): RoomAudience!
    }
  `;
//# sourceMappingURL=room.js.map