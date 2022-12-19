"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class BaseModel extends objection_1.Model {
    $beforeInsert() {
        const currentTime = new Date();
        this.created = this.created || currentTime;
        this.updated = currentTime;
    }
    $beforeUpdate() {
        delete this.created;
        this.updated = new Date();
    }
}
exports.default = BaseModel;
//# sourceMappingURL=Base.js.map