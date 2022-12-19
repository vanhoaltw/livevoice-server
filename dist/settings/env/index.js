"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env.NODE_ENV || 'development';
const envConfig = require(`./${env}`);
exports.default = envConfig.default;
//# sourceMappingURL=index.js.map