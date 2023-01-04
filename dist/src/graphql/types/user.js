"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
  type User {
    id: Int!
    email: String
    emailConfirmed: Boolean
    username: String
    password: String
    birthDay: Date
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

  input UpdateUserInput{
    birthDay: String
    gender: Gender
    displayName: String
    bio: String
    phone: String
    avatarUrl: String
    city: String
    country: String
    job: String
    school: String
    favorite: String
}

  type Query {
    me: User
    user(id: Int, username: String): User
  }

  type Mutation {
    editUser(input: UpdateUserInput!): User
  }
`;
//# sourceMappingURL=user.js.map