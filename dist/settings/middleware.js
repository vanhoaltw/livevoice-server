"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const formatError = (error) => {
    if (error?.message === 'PersistedQueryNotFoundError') {
        return error;
    }
    const code = error.extensions.exception.code;
    if (code === 'FORBIDDEN') {
        return new apollo_server_express_1.ForbiddenError(error.message);
    }
    return error;
};
exports.formatError = formatError;
//# sourceMappingURL=middleware.js.map