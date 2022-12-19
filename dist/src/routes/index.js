"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const upload_1 = __importDefault(require("./upload"));
const routes = (0, express_1.Router)();
routes.use('/auth', auth_1.default);
routes.use('/upload', upload_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map