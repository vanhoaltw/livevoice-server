"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
    type Topic {
        id: Int!
        title: String,
        slug: String,
    }
  
   type Query {
        topic: [Topic]
    }
  `;
//# sourceMappingURL=topic.js.map