"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `type User {
  id: Int!
  username: String
  email: String!
  avatar: String
  nickname: String
  firstName: String
  lastName: String
  gender: String
  phone: String
  status: UserStatus
  completeOnboarding: Boolean
  isAvailable: Boolean
  introduction: String
  lastActivedAt: DateTime
  birthday: Date
  website: String
  deviceToken: String
  emailVerified: Boolean
  verifiedCreator: Boolean
  verifiedAccount: Boolean
}

extend type Query {
  me: User
}`;
//# sourceMappingURL=user.js.map