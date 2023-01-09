import { AuthenticationError, PersistedQueryNotFoundError } from 'apollo-server-errors'
import { UserModel, UserConnectionModel } from '../../models'

export default {
  Query: {
    me: async (_parent, _, { me }) => {
      const user = await UserModel.query().findById(me.id)
      return user
    },
    user: async (_parent, { id, username }, { me }) => {
      let user = null
      if (id) user = await UserModel.query().findById(id)
      else if (username) user = await UserModel.query().findOne({ username })

      if (!user) throw new PersistedQueryNotFoundError()
      return user
    },
  },
  Mutation: {
    editUser: async (_parent, { input }, { me }) => {
      if (!me?.id) throw new PersistedQueryNotFoundError()
      const user = await UserModel.query().findById(me?.id)
      if (!user) throw new PersistedQueryNotFoundError()
      const result = await UserModel.query().upsertGraphAndFetch({ ...input, id: me.id })
      return result
    },
  },

  User: {
    isFollowing: async (user, _, { me }) => {
      if (!me || user.id === me?.id) return null
      const isFollowing = await UserConnectionModel.query().findOne({ followerId: me.id, followingId: user.id })
      return !!isFollowing
    },
    isFollowed: async (user, _, { me }) => {
      if (!me || user.id === me?.id) return null
      const isFollowed = await UserConnectionModel.query().findOne({ followerId: user.id, followingId: me.id })
      return !!isFollowed
    },
  },
}
