import { RtcRole } from 'agora-access-token'
import { generateRTCToken } from './../../services/agora'
import { ValidationError } from 'apollo-server-express'
import { AudienceRole, RoomStatus, RoomType } from '../../generated/graphql'
import { RoomAudienceModel, RoomModel } from '../../models'
import { v4 as uuidv4 } from 'uuid'
import pubsub from '../pubsub'
import { CODE_ERROR, SUBCRIPTION_AUDIENCE_CHANGED, SUBCRIPTION_ROOM_CHANGED } from '../../settings/constants'
import roomAudienceService from '../../services/roomAudience'
import { withFilter } from 'graphql-subscriptions'

export default {
  Query: {
    room: async (_parent, { id: roomId }, { me }) => {
      const room = await RoomModel.query().findById(roomId)
      return room
    },
    getLiveRoom: async (_parent, {}, { me }) => {
      const roomList = await RoomModel.query()
        .withGraphFetched('[creator,audience.user]')
        .where({ 'room.status': RoomStatus.Live })
        .orderBy('start', 'desc')
      return { result: roomList || [], total: roomList.length }
    },
    getRoomAudience: async (_parent, { id: roomId }, { me }) => {
      const audiences = roomAudienceService.getRoomAudience(roomId)
      return audiences
    },
    getLiveStream: async (_parent, { roomId }, { me }) => {
      const [room, myRoomAudience] = await Promise.all([
        RoomModel.query().findById(roomId).withGraphFetched('[creator, audience.user]'),
        RoomAudienceModel.query().findOne({ userId: me.id, roomId }),
      ])

      if (!room || !myRoomAudience) {
        throw new ValidationError(CODE_ERROR.INVALID_ROOM)
      }

      let token = null
      if (room.status === RoomStatus.Live) {
        token = generateRTCToken(
          room.playbackId,
          me.id,
          myRoomAudience.role === AudienceRole.Audience ? RtcRole.SUBSCRIBER : RtcRole.PUBLISHER
        )
      }
      return { room, token }
    },
  },

  Mutation: {
    createRoom: async (_parent, { input }, { me }) => {
      const params = {
        ...input,
        type: input?.password ? RoomType.Private : input?.status || RoomType.Public,
        status: input?.status || RoomStatus.Open,
        password: input?.password ? RoomModel.generateHash(input?.password) : null,
        audience: [{ userId: me.id, role: AudienceRole.Owner, seat: 1 }],
      }
      const room = await RoomModel.query().insertGraph(params).withGraphFetched('audience.user')
      return room
    },
    startLive: async (_parent, { id }, { me }) => {
      let room = await RoomModel.query().withGraphFetched('[audience]').findById(id)
      if (!room) throw new ValidationError('INVALID_ROOM')
      if (room.status === RoomStatus.Live) {
        const token = generateRTCToken(room?.playbackId, me.id, RtcRole.PUBLISHER)
        return { room, token }
      }
      const isHost = room.audience.some((a) => a.role === AudienceRole.Owner && a.userId === me.id)
      if (!isHost) {
        throw new ValidationError('INVALID_PERMISSION')
      }

      const playbackId = uuidv4()
      const token = generateRTCToken(playbackId, me.id, RtcRole.PUBLISHER)

      room = await room.$query().patchAndFetch({
        playbackId,
        start: new Date().toISOString(),
        status: RoomStatus.Live,
      })

      pubsub.publish(SUBCRIPTION_ROOM_CHANGED, { roomChanged: room })
      return { room, token }
    },
    joinRoom: async (_parent, { id, password }, { me }) => {
      let room = await RoomModel.query().withGraphFetched('[audience]').findById(id)
      if (!room) throw new ValidationError(CODE_ERROR.INVALID_ROOM)
      if (room.status === RoomStatus.Close) throw new ValidationError(CODE_ERROR.ROOM_ENDED)
      if (room.status === RoomStatus.Live) {
        await RoomAudienceModel.query().where({ userId: me.id, isInRoom: true }).patch({ isInRoom: false })
      }
      const currentAudience = await roomAudienceService.joinRoom(room, me, password)
      pubsub.publish(SUBCRIPTION_AUDIENCE_CHANGED, { audienceChanged: currentAudience })
      return currentAudience
    },
    editLiveRoom: async (_parent, { id, input }, { me }) => {
      let room: any = await RoomModel.query().findById(id).withGraphFetched('[audience]')

      if (!room) throw new ValidationError(CODE_ERROR.INVALID_ROOM)
      if (!room.audience.map((a) => a.userId).includes(me.id)) {
        throw new ValidationError(CODE_ERROR.PERMISSION_DENIED)
      }
      room = await RoomModel.query().upsertGraphAndFetch({ id, ...input })
      pubsub.publish(SUBCRIPTION_ROOM_CHANGED, { roomChanged: room })
      return room
    },
    updateAudience: async (_parent, { roomId, input }, { me }) => {
      let room = await RoomModel.query().findById(roomId)
      if (!room) throw new ValidationError(CODE_ERROR.INVALID_ROOM)
      if (room.status === RoomStatus.Live) {
        let audience = await RoomAudienceModel.query().findOne({ roomId, userId: me.id })
        audience = await audience
          .$query()
          .updateAndFetch({ roomId, userId: me.id, ...input })
          .withGraphFetched('user')
        pubsub.publish(SUBCRIPTION_AUDIENCE_CHANGED, { audienceChanged: audience })
        return audience
      }
      throw new ValidationError(CODE_ERROR.INVALID_ROOM)
    },
    leaveRoom: async (_parent, { roomId }, { me }) => {
      let room = await RoomModel.query().findById(roomId)
      if (room.status === RoomStatus.Live) {
        RoomAudienceModel.query()
          .where({ roomId, userId: me.id })
          .patch({ isInRoom: false })
          .then(async () => {
            const audience = await RoomAudienceModel.query().findOne({ roomId, userId: me.id }).withGraphFetched('user')
            pubsub.publish(SUBCRIPTION_AUDIENCE_CHANGED, { audienceChanged: audience })
          })

        return true
      }
    },
    stopLive: async (_parent, { id }, { me }) => {
      let room = await RoomModel.query().findById(id)
      if (!room) throw new ValidationError('INVALID_ROOM')
      const isOwner = room.audience.some((u) => u.role === AudienceRole.Owner && u.id === me.id)
      if (!isOwner) throw new ValidationError('INVALID_PERMISSION')
      room = await room.$query().patchAndFetch({
        status: RoomStatus.Close,
        end: new Date().toISOString(),
      })
      return room
    },
  },

  Subscription: {
    audienceChanged: {
      subscribe: withFilter(
        (_, args) => pubsub.asyncIterator(SUBCRIPTION_AUDIENCE_CHANGED),
        (payload, variables) => {
          return payload.audienceChanged.roomId === variables.roomId
        }
      ),
    },
    roomChanged: {
      subscribe: withFilter(
        (_, args) => pubsub.asyncIterator(SUBCRIPTION_ROOM_CHANGED),
        (payload, variables) => {
          return payload.roomChanged.roomId === variables.roomId
        }
      ),
    },
  },
}
