import { AudienceRole, RoomType } from '../generated/graphql'
import { RoomModel, UserModel } from '..//models'
import RoomAudience from '../models/RoomAudience'
import { CODE_ERROR } from '../settings/constants'
import BaseService from './baseServiec'

class RoomAudienceService extends BaseService<RoomAudience> {
  async getRoomAudience(roomId: number) {
    const audienceList = await RoomAudience.query().where({ roomId }).withGraphFetched('[user, room]')
    return audienceList
  }
  async joinRoom(room: RoomModel, me: UserModel, password?: string) {
    let currentAudience = await RoomAudience.query().findOne({ userId: me.id, roomId: room.id })
    if (room.type === RoomType.Private && !RoomModel.validPassword(password || '', room.password)) {
      throw new Error(CODE_ERROR.WRONG_ROOM_PASSWORD)
    }
    if (!currentAudience) {
      currentAudience = await RoomAudience.query().insertAndFetch({
        roomId: room.id,
        userId: me.id,
        isInRoom: true,
        role: AudienceRole.Audience,
      })
    } else {
      currentAudience = await currentAudience.$query().patchAndFetch({
        isInRoom: true,
      })
    }
    currentAudience = await currentAudience.$query().withGraphFetched('user')
    return currentAudience
  }
}

export default new RoomAudienceService(new RoomAudience())
