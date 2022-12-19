"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../generated/graphql");
const Base_1 = __importDefault(require("./Base"));
const User_1 = __importDefault(require("./User"));
const Room_1 = __importDefault(require("./Room"));
const objection_1 = require("objection");
class RoomAudience extends Base_1.default {
    constructor() {
        super();
    }
    // Input validation
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['roomId', 'userId'],
            properties: {
                id: { type: 'integer' },
                roomId: { type: 'integer' },
                userId: { type: 'integer' },
                seat: { type: ['integer', 'null'] },
                role: { type: 'string', enum: Object.values(graphql_1.AudienceRole) },
                isInRoom: { type: 'boolean' },
                isHandUp: { type: 'boolean' },
                isMuted: { type: 'boolean' },
            },
        };
    }
    static get relationMappings() {
        return {
            user: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'room_audience.userId',
                    to: 'user.id',
                },
            },
            room: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: Room_1.default,
                join: {
                    from: 'room_audience.roomId',
                    to: 'room.id',
                },
            },
        };
    }
}
RoomAudience.tableName = 'room_audience';
exports.default = RoomAudience;
//# sourceMappingURL=RoomAudience.js.map