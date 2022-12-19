"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../settings/env"));
const Base_1 = __importDefault(require("./Base"));
class UserModel extends Base_1.default {
    // Virtual Attributes
    static get virtualAttributes() {
        return ['fullName'];
    }
    fullName() {
        return [this.firstName, this.lastName].join(' ');
    }
    // Input validation
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                email: { type: 'string', minLength: 1, maxLength: 512 },
                emailConfirmed: { type: 'boolean' },
                displayName: { type: 'string', minLength: 1, maxLength: 30 },
                firstName: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
                lastName: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
                password: { type: 'string' },
                birthday: { type: 'date' },
                gender: { type: ['string', 'null'], maxLength: 32 },
                phone: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
                bio: { type: ['string', 'null'] },
                avatarUrl: { type: ['string', 'null'] },
                avatarThumbUrl: { type: ['string', 'null'] },
                country: { type: ['string', 'null'] },
                timezoneId: { type: ['string', 'null'] },
                // role: { type: 'string', enum: Object.values(UserRole) },
                followerInfo: {
                    type: 'object',
                    properties: {
                        count: { type: 'number', minimum: 0 },
                    },
                },
                followingInfo: {
                    type: 'object',
                    properties: {
                        count: { type: 'number', minimum: 0 },
                    },
                },
            },
        };
    }
    // Relation mapping
    // static get relationMappings() {
    //   return {
    //     'followerInfo.users': {
    //       relation: Model.ManyToManyRelation,
    //       modelClass: UserModel,
    //       join: {
    //         from: 'user.id',
    //         through: {
    //           from: 'user_connection.followingId',
    //           to: 'user_connection.followerId',
    //         },
    //         to: 'user.id',
    //       },
    //     },
    //     'followingInfo.users': {
    //       relation: Model.ManyToManyRelation,
    //       modelClass: UserModel,
    //       join: {
    //         from: 'user.id',
    //         through: {
    //           from: 'user_connection.followerId',
    //           to: 'user_connection.followingId',
    //         },
    //         to: 'user.id',
    //       },
    //     },
    //   }
    // }
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
UserModel.tableName = 'user';
exports.default = UserModel;
//# sourceMappingURL=User.js.map