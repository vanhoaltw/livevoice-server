"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const baseServiec_1 = __importDefault(require("./baseServiec"));
class RoomService extends baseServiec_1.default {
}
exports.default = new RoomService(new models_1.RoomModel());
//# sourceMappingURL=room.js.map