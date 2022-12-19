"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../generated/graphql");
const models_1 = require("..//models");
const RoomAudience_1 = __importDefault(require("../models/RoomAudience"));
const constants_1 = require("../settings/constants");
const baseServiec_1 = __importDefault(require("./baseServiec"));
class RoomAudienceService extends baseServiec_1.default {
    async getRoomAudience(roomId) {
        const audienceList = await RoomAudience_1.default.query().where({ roomId }).withGraphFetched('[user, room]');
        return audienceList;
    }
    async joinRoom(room, me, password) {
        let currentAudience = await RoomAudience_1.default.query().findOne({ userId: me.id, roomId: room.id });
        if (room.type === graphql_1.RoomType.Private && !models_1.RoomModel.validPassword(password || '', room.password)) {
            throw new Error(constants_1.CODE_ERROR.WRONG_ROOM_PASSWORD);
        }
        if (!currentAudience) {
            currentAudience = await RoomAudience_1.default.query().insertAndFetch({
                roomId: room.id,
                userId: me.id,
                isInRoom: true,
                role: graphql_1.AudienceRole.Audience,
            });
        }
        else {
            currentAudience = await currentAudience.$query().patchAndFetch({
                isInRoom: true,
            });
        }
        currentAudience = await currentAudience.$query().withGraphFetched('user');
        return currentAudience;
    }
}
exports.default = new RoomAudienceService(new RoomAudience_1.default());
//# sourceMappingURL=roomAudience.js.map