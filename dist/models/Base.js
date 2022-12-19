"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class BaseModel extends objection_1.Model {
    $beforeInsert() {
        const currentTime = new Date();
        this.createdAt = this.createdAt || currentTime;
        this.updatedAt = currentTime;
    }
    $beforeUpdate() {
        delete this.createdAt;
        this.updatedAt = new Date();
    }
}
exports.default = BaseModel;
//# sourceMappingURL=Base.js.map