import { RoomMode, RoomStatus, RoomType } from '../generated/graphql'
import BaseModel from './Base'
import bcrypt from 'bcrypt'
import RoomAudience from './RoomAudience'
import jwt from 'jsonwebtoken'
import config from '../settings/env'
import { Model } from 'objection'
import UserModel from './User'

class RoomModel extends BaseModel {
  id!: number
  title?: string
  description?: string
  notification?: string
  imageUrl?: string
  status?: RoomStatus
  start?: string
  end?: string
  type?: RoomType
  password?: string
  playbackId?: string
  creatorId?: number
  allowChat?: boolean
  freeMic?: boolean
  mode?: RoomMode
  seatLocked?: string

  creator?: UserModel
  audience?: RoomAudience[]

  static tableName: string = 'room'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['creatorId'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 120 },
        notification: { type: 'string', maxLength: 250 },
        description: { type: ['string', 'null'] },
        imageUrl: { type: ['string', 'null'] },
        status: { type: 'string', enum: Object.values(RoomStatus), default: RoomStatus.Open },
        start: { type: 'string', default: new Date().toISOString() },
        end: { type: 'string' },
        type: { type: 'string', enum: Object.values(RoomType), default: RoomType.Public },
        password: { type: ['string', 'null'] },
        playbackId: { type: ['string'] },
        creatorId: { type: 'number' },
        allowChat: { type: 'boolean' },
        freeMic: { type: 'boolean' },
        mode: { type: ['string', 'null'] },
        speaker: { type: 'string' },
        seatLocked: { type: 'string' },
      },
    }
  }

  static get relationMappings() {
    return {
      creator: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'room.creatorId',
          to: 'user.id',
        },
      },
      audience: {
        relation: Model.HasManyRelation,
        modelClass: RoomAudience,
        join: {
          from: 'room.id',
          to: 'room_audience.roomId',
        },
      },
    }
  }

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

export default RoomModel
