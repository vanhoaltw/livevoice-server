import { AudienceRole } from '../generated/graphql'
import BaseModel from './Base'
import UserModel from './User'
import RoomModel from './Room'
import { Model } from 'objection'

class RoomAudience extends BaseModel {
  id!: number
  roomId!: number
  userId!: number
  role!: AudienceRole
  seat: number
  isInRoom?: boolean
  isHandUp?: boolean
  isMuted?: boolean
  room?: RoomModel
  user?: UserModel

  constructor() {
    super()
  }

  static tableName: string = 'room_audience'

  // Input validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['roomId', 'userId'],
      properties: {
        id: { type: 'integer' },
        roomId: { type: 'integer' },
        userId: { type: 'integer' },
        seat: { type: ['integer', 'null'] },
        role: { type: 'string', enum: Object.values(AudienceRole) },
        isInRoom: { type: 'boolean' },
        isHandUp: { type: 'boolean' },
        isMuted: { type: 'boolean' },
      },
    }
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'room_audience.userId',
          to: 'user.id',
        },
      },
      room: {
        relation: Model.BelongsToOneRelation,
        modelClass: RoomModel,
        join: {
          from: 'room_audience.roomId',
          to: 'room.id',
        },
      },
    }
  }
}

export default RoomAudience
