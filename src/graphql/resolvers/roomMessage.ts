import { ValidationError } from 'apollo-server-express'
import { faker } from '@faker-js/faker'
import { CODE_ERROR, SUBCRIPTION_ROOM_MESSAGES } from '../../settings/constants'
import { RoomModel } from '../../models'
import pubsub from '../pubsub'
import { withFilter } from 'graphql-subscriptions'

export default {
  Mutation: {
    sendMessage: async (_parent, { roomId, input }, { me }) => {
      const room = await RoomModel.query().findById(roomId)
      if (!room || !room.allowChat) {
        throw new ValidationError(CODE_ERROR.INVALID_ROOM)
      }
      const message = {
        id: faker.datatype.uuid(),
        text: input?.text || '',
        sender: me,
        room,
      }
      pubsub.publish(SUBCRIPTION_ROOM_MESSAGES, { messageAdded: message })
      return message
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        (_, args) => pubsub.asyncIterator(SUBCRIPTION_ROOM_MESSAGES),
        (payload, variables) => {
          return payload.messageAdded.room.id === variables.roomId
        }
      ),
    },
  },
}
