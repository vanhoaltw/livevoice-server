"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type User {
    id: Int!
    email: String!
    emailConfirmed: Boolean
    username: String!
    password: String!
    birthday: Date
    gender: Gender
    displayName: String
    bio: String
    phone: String
    avatarUrl: String
    bannerUrl: String
    city: String
    country: String
    job: String
    school: String
    favorite: String
    lastActive: Date
  }

  type Query {
    me: User
  }
`;
//# sourceMappingURL=user.js.map