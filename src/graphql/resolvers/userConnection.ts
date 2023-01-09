import { FollowAction } from './../../generated/graphql'
import UserConnectionModel from '../../models/UserConnection'
import { UserModel } from '../../models'

export default {
  Query: {},
  Mutation: {
    follow: async (_parent, { userId, action }, { me }) => {
      await UserModel.transaction(async (trx) => {
        if (action === FollowAction.Follow) {
          const isFollow = await UserConnectionModel.query().findOne({ followerId: me.id, followingId: userId })
          if (isFollow) return true
          await UserModel.query(trx).findById(me.id).increment('followingCount', 1)
          await UserModel.query(trx).findById(userId).increment('followerCount', 1)
          await UserConnectionModel.query(trx).insert({ followerId: me.id, followingId: userId })
          return true
        } else if (action === FollowAction.Unfollow) {
          await UserModel.query(trx).findById(me.id).decrement('followingCount', 1)
          await UserModel.query(trx).findById(userId).decrement('followerCount', 1)
          await UserConnectionModel.query(trx).delete().where({ followerId: me.id, followingId: userId })
          return true
        }
        return false
      })
    },
  },
}
