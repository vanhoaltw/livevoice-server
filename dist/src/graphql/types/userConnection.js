"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type UserConnection {
    id: Int!
    followerId: Int!
    followingId: Int!
    follower:User
    following:User
  }

  extend type Mutation {
    follow(userId: Int!, action: FollowAction): Boolean
  }
`;
//# sourceMappingURL=userConnection.js.map