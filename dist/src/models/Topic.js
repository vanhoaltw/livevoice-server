"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
class Topic extends Base_1.default {
    constructor() {
        super();
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string', minLength: 1, maxLength: 50 },
                slug: { type: 'string', minLength: 1, maxLength: 100 },
            },
        };
    }
}
Topic.tableName = 'topic';
exports.default = Topic;
//# sourceMappingURL=Topic.js.map