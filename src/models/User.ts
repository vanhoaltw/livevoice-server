import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Gender } from '../generated/graphql'
import config from '../settings/env'
import BaseModel from './Base'

class UserModel extends BaseModel {
  id!: number
  email!: string
  emailConfirmed?: boolean
  username?: string
  displayName?: string
  password!: string
  birthday?: Date
  gender?: string
  bio?: string
  phone?: string
  avatarUrl?: string
  bannerUrl?: string
  city?: string
  country?: string
  job?: string
  school?: string
  favorite?: string
  lastActive?: Date
  facebookUrl: String
  twitterUrl: String
  twitchUrl: String
  telegramUrl: String
  instagramUrl: String
  websiteUrl: String

  isFollowed?: boolean
  isFollowing?: boolean

  followerCount?: Number
  followingCount?: Number

  static tableName: string = 'user'

  // Input validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 120 },
        emailConfirmed: { type: 'boolean' },
        username: { type: 'string', minLength: 1, maxLength: 120 },
        displayName: { type: 'string', minLength: 1, maxLength: 120 },
        firstName: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        lastName: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        password: { type: 'string' },
        birthday: { type: 'string' },
        gender: { type: ['string'], enum: Object.values(Gender), default: Gender.Boy },
        phone: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        bio: { type: ['string', 'null'] },
        avatarUrl: { type: ['string', 'null'] },
        bannerUrl: { type: ['string', 'null'] },
        city: { type: ['string', 'null'] },
        country: { type: ['string', 'null'] },
        job: { type: ['string', 'null'] },
        school: { type: ['string', 'null'] },
        favorite: { type: ['string', 'null'] },
        timezoneId: { type: ['string', 'null'] },
        followingCount: { type: 'integer', default: 0 },
        followerCount: { type: 'integer', default: 0 },
        facebookUrl: { type: ['string', 'null'] },
        twitterUrl: { type: ['string', 'null'] },
        twitchUrl: { type: ['string', 'null'] },
        telegramUrl: { type: ['string', 'null'] },
        instagramUrl: { type: ['string', 'null'] },
        websiteUrl: { type: ['string', 'null'] },
      },
    }
  }

  // Relation mapping
  // static get relationMappings() {
  //   return {
  //     'followerInfo.users': {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: UserModel,
  //       join: {
  //         from: 'user.id',
  //         through: {
  //           from: 'user_connection.followingId',
  //           to: 'user_connection.followerId',
  //         },
  //         to: 'user.id',
  //       },
  //     },
  //     'followingInfo.users': {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: UserModel,
  //       join: {
  //         from: 'user.id',
  //         through: {
  //           from: 'user_connection.followerId',
  //           to: 'user_connection.followingId',
  //         },
  //         to: 'user.id',
  //       },
  //     },
  //   }
  // }

  static generateHash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }

  static jsonToToken(json: any): string {
    return jwt.sign(json, config.JWT.SECRET)
  }

  // checking if password is valid
  static validPassword(input: string, password: string): boolean {
    return bcrypt.compareSync(input, password)
  }

  static decodeToken(token: string): Record<string, any> {
    try {
      const decoded = jwt.verify(token, config.JWT.SECRET)
      return decoded as Record<string, any>
    } catch (err) {
      if (err instanceof Error) {
        throw err
      }
    }
  }
}

export default UserModel
