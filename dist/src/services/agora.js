"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRTCToken = void 0;
const env_1 = __importDefault(require("../settings/env"));
const agora_access_token_1 = require("agora-access-token");
const generateRTCToken = (channelName, uid, role = agora_access_token_1.RtcRole.PUBLISHER | agora_access_token_1.RtcRole.SUBSCRIBER, expiry = 3600) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expiry;
    const token = agora_access_token_1.RtcTokenBuilder.buildTokenWithUid(env_1.default.AGORA.APP_ID, env_1.default.AGORA.APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
    return token;
};
exports.generateRTCToken = generateRTCToken;
//# sourceMappingURL=agora.js.map