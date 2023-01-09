export default `
  type User {
    id: Int!
    email: String
    emailConfirmed: Boolean
    username: String
    password: String
    birthDay: String
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
    lastActive: String
    facebookUrl: String
    twitterUrl: String
    twitchUrl: String
    telegramUrl: String
    instagramUrl: String
    websiteUrl: String

    isFollowed: Boolean
    isFollowing: Boolean
    isBlocked: Boolean

    followerCount: Int
    followingCount: Int
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
    email: String
    facebookUrl: String
    twitterUrl: String
    twitchUrl: String
    telegramUrl: String
    instagramUrl: String
    websiteUrl: String
  }

  extend type Query {
    me: User
    user(id: Int, username: String): User
  }

  extend type Mutation {
    editUser(input: UpdateUserInput!): User
  }
`
