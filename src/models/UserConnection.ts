import { User } from './../generated/graphql'
import { Model } from 'objection'
import BaseModel from './Base'
import UserModel from './User'

class UserConnectionModel extends BaseModel {
  id!: number
  followerId: number
  followingId: number

  follower: User
  following: User

  static tableName: string = 'user_connection'

  // Input validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['followerId'],
      properties: {
        id: { type: 'integer' },
        followerId: { type: 'integer' },
        followingId: { type: 'integer' },
      },
    }
  }

  // Relation mapping
  static get relationMappings() {
    return {
      follower: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'user_connection.followerId',
          to: 'user.id',
        },
      },
      following: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'user_connection.followingId',
          to: 'user.id',
        },
      },
    }
  }
}

export default UserConnectionModel
