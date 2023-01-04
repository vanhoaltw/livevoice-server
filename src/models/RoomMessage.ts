import { AudienceRole } from '../generated/graphql'
import BaseModel from './Base'
import UserModel from './User'
import RoomModel from './Room'
import { Model } from 'objection'

class RoomMessage extends BaseModel {
  id!: number
  roomId!: number
  userId!: number
  text: string
  messageType: string
  attachments: []
  reactions: []

  room?: RoomModel
  user?: UserModel

  constructor() {
    super()
  }

  static tableName: string = 'room_message'

  // Input validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['roomId', 'userId'],
      properties: {
        id: { type: 'integer' },
        roomId: { type: 'integer' },
        userId: { type: 'integer' },
        text: { type: 'string' },
        messageType: { type: 'string' },
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

export default RoomMessage
