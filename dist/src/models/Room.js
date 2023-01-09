"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../generated/graphql");
const Base_1 = __importDefault(require("./Base"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const RoomAudience_1 = __importDefault(require("./RoomAudience"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../settings/env"));
const objection_1 = require("objection");
const User_1 = __importDefault(require("./User"));
class RoomModel extends Base_1.default {
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['creatorId'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 120 },
                notification: { type: 'string', maxLength: 250 },
                description: { type: ['string', 'null'] },
                imageUrl: { type: ['string', 'null'] },
                status: { type: 'string', enum: Object.values(graphql_1.RoomStatus), default: graphql_1.RoomStatus.Open },
                start: { type: 'string', default: new Date().toISOString() },
                end: { type: 'string' },
                type: { type: 'string', enum: Object.values(graphql_1.RoomType), default: graphql_1.RoomType.Public },
                password: { type: ['string', 'null'] },
                playbackId: { type: ['string'] },
                creatorId: { type: 'integer' },
                allowChat: { type: 'boolean' },
                freeMic: { type: 'boolean' },
                mode: { type: ['string', 'null'] },
                speaker: { type: 'string' },
                seatLocked: { type: 'string' },
            },
        };
    }
    static get relationMappings() {
        return {
            creator: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: User_1.default,
                join: {
                    from: 'room.creatorId',
                    to: 'user.id',
                },
            },
            audience: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: RoomAudience_1.default,
                join: {
                    from: 'room.id',
                    to: 'room_audience.roomId',
                },
            },
        };
    }
    static generateHash(password) {
        return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
    }
    static jsonToToken(json) {
        return jsonwebtoken_1.default.sign(json, env_1.default.JWT.SECRET);
    }
    // checking if password is valid
    static validPassword(input, password) {
        return bcrypt_1.default.compareSync(input, password);
    }
    static decodeToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT.SECRET);
            return decoded;
        }
        catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }
}
RoomModel.tableName = 'room';
exports.default = RoomModel;
//# sourceMappingURL=Room.js.map