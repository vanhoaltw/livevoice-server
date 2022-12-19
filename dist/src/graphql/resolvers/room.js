"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const agora_access_token_1 = require("agora-access-token");
const agora_1 = require("./../../services/agora");
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("../../generated/graphql");
const models_1 = require("../../models");
const uuid_1 = require("uuid");
const pubsub_1 = __importDefault(require("../pubsub"));
const constants_1 = require("../../settings/constants");
const roomAudience_1 = __importDefault(require("../../services/roomAudience"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
exports.default = {
    Query: {
        room: async (_parent, { id: roomId }, { me }) => {
            const room = await models_1.RoomModel.query().findById(roomId);
            return room;
        },
        getLiveRoom: async (_parent, {}, { me }) => {
            const roomList = await models_1.RoomModel.query()
                .withGraphFetched('[creator,audience.user]')
                .where({ 'room.status': graphql_1.RoomStatus.Live })
                .orderBy('start', 'desc');
            return { result: roomList || [], total: roomList.length };
        },
        getRoomAudience: async (_parent, { id: roomId }, { me }) => {
            const audiences = roomAudience_1.default.getRoomAudience(roomId);
            return audiences;
        },
        getLiveStream: async (_parent, { roomId }, { me }) => {
            const [room, myRoomAudience] = await Promise.all([
                models_1.RoomModel.query().findById(roomId).withGraphFetched('[creator, audience.user]'),
                models_1.RoomAudienceModel.query().findOne({ userId: me.id, roomId }),
            ]);
            if (!room || !myRoomAudience) {
                throw new apollo_server_express_1.ValidationError(constants_1.CODE_ERROR.INVALID_ROOM);
            }
            let token = null;
            if (room.status === graphql_1.RoomStatus.Live) {
                token = (0, agora_1.generateRTCToken)(room.playbackId, me.id, myRoomAudience.role === graphql_1.AudienceRole.Audience ? agora_access_token_1.RtcRole.SUBSCRIBER : agora_access_token_1.RtcRole.PUBLISHER);
            }
            return { room, token };
        },
    },
    Mutation: {
        createRoom: async (_parent, { input }, { me }) => {
            const params = {
                ...input,
                type: input?.password ? graphql_1.RoomType.Private : input?.status || graphql_1.RoomType.Public,
                status: input?.status || graphql_1.RoomStatus.Open,
                password: input?.password ? models_1.RoomModel.generateHash(input?.password) : null,
                audience: [{ userId: me.id, role: graphql_1.AudienceRole.Owner, seat: 1 }],
            };
            const room = await models_1.RoomModel.query().insertGraph(params).withGraphFetched('audience.user');
            return room;
        },
        startLive: async (_parent, { id }, { me }) => {
            let room = await models_1.RoomModel.query().withGraphFetched('[audience]').findById(id);
            if (!room)
                throw new apollo_server_express_1.ValidationError('INVALID_ROOM');
            if (room.status === graphql_1.RoomStatus.Live) {
                const token = (0, agora_1.generateRTCToken)(room?.playbackId, me.id, agora_access_token_1.RtcRole.PUBLISHER);
                return { room, token };
            }
            const isHost = room.audience.some((a) => a.role === graphql_1.AudienceRole.Owner && a.userId === me.id);
            if (!isHost) {
                throw new apollo_server_express_1.ValidationError('INVALID_PERMISSION');
            }
            const playbackId = (0, uuid_1.v4)();
            const token = (0, agora_1.generateRTCToken)(playbackId, me.id, agora_access_token_1.RtcRole.PUBLISHER);
            room = await room.$query().patchAndFetch({
                playbackId,
                start: new Date().toISOString(),
                status: graphql_1.RoomStatus.Live,
            });
            pubsub_1.default.publish(constants_1.SUBCRIPTION_ROOM_CHANGED, { roomChanged: room });
            return { room, token };
        },
        joinRoom: async (_parent, { id, password }, { me }) => {
            let room = await models_1.RoomModel.query().withGraphFetched('[audience]').findById(id);
            if (!room)
                throw new apollo_server_express_1.ValidationError(constants_1.CODE_ERROR.INVALID_ROOM);
            if (room.status === graphql_1.RoomStatus.Close)
                throw new apollo_server_express_1.ValidationError(constants_1.CODE_ERROR.ROOM_ENDED);
            if (room.status === graphql_1.RoomStatus.Live) {
                await models_1.RoomAudienceModel.query().where({ userId: me.id, isInRoom: true }).patch({ isInRoom: false });
            }
            const currentAudience = await roomAudience_1.default.joinRoom(room, me, password);
            pubsub_1.default.publish(constants_1.SUBCRIPTION_AUDIENCE_CHANGED, { audienceChanged: currentAudience });
            return currentAudience;
        },
        editLiveRoom: async (_parent, { id, input }, { me }) => {
            let room = await models_1.RoomModel.query().findById(id).withGraphFetched('[audience]');
            if (!room)
                throw new apollo_server_express_1.ValidationError(constants_1.CODE_ERROR.INVALID_ROOM);
            if (!room.audience.map((a) => a.userId).includes(me.id)) {
                throw new apollo_server_express_1.ValidationError(constants_1.CODE_ERROR.PERMISSION_DENIED);
            }
            room = await models_1.RoomModel.query().upsertGraphAndFetch({ id, ...input });
            pubsub_1.default.publish(constants_1.SUBCRIPTION_ROOM_CHANGED, { roomChanged: room });
            return room;
        },
        updateAudience: async (_parent, { roomId, input }, { me }) => {
            let room = await models_1.RoomModel.query().findById(roomId);
            if (!room)
                throw new apollo_server_express_1.ValidationError(constants_1.CODE_ERROR.INVALID_ROOM);
            if (room.status === graphql_1.RoomStatus.Live) {
                let audience = await models_1.RoomAudienceModel.query().findOne({ roomId, userId: me.id });
                audience = await audience
                    .$query()
                    .updateAndFetch({ roomId, userId: me.id, ...input })
                    .withGraphFetched('user');
                pubsub_1.default.publish(constants_1.SUBCRIPTION_AUDIENCE_CHANGED, { audienceChanged: audience });
                return audience;
            }
            throw new apollo_server_express_1.ValidationError(constants_1.CODE_ERROR.INVALID_ROOM);
        },
        leaveRoom: async (_parent, { roomId }, { me }) => {
            let room = await models_1.RoomModel.query().findById(roomId);
            if (room.status === graphql_1.RoomStatus.Live) {
                models_1.RoomAudienceModel.query()
                    .where({ roomId, userId: me.id })
                    .patch({ isInRoom: false })
                    .then(async () => {
                    const audience = await models_1.RoomAudienceModel.query().findOne({ roomId, userId: me.id }).withGraphFetched('user');
                    pubsub_1.default.publish(constants_1.SUBCRIPTION_AUDIENCE_CHANGED, { audienceChanged: audience });
                });
                return true;
            }
        },
        stopLive: async (_parent, { id }, { me }) => {
            let room = await models_1.RoomModel.query().findById(id);
            if (!room)
                throw new apollo_server_express_1.ValidationError('INVALID_ROOM');
            const isOwner = room.audience.some((u) => u.role === graphql_1.AudienceRole.Owner && u.id === me.id);
            if (!isOwner)
                throw new apollo_server_express_1.ValidationError('INVALID_PERMISSION');
            room = await room.$query().patchAndFetch({
                status: graphql_1.RoomStatus.Close,
                end: new Date().toISOString(),
            });
            return room;
        },
    },
    Subscription: {
        audienceChanged: {
            subscribe: (0, graphql_subscriptions_1.withFilter)((_, args) => pubsub_1.default.asyncIterator(constants_1.SUBCRIPTION_AUDIENCE_CHANGED), (payload, variables) => {
                return payload.audienceChanged.roomId === variables.roomId;
            }),
        },
        roomChanged: {
            subscribe: (0, graphql_subscriptions_1.withFilter)((_, args) => pubsub_1.default.asyncIterator(constants_1.SUBCRIPTION_ROOM_CHANGED), (payload, variables) => {
                return payload.roomChanged.roomId === variables.roomId;
            }),
        },
    },
};
//# sourceMappingURL=room.js.map