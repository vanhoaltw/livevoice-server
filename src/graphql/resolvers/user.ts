import { PersistedQueryNotFoundError } from 'apollo-server-errors'
import { UserModel } from '../../models'

export default {
  Query: {
    me: async (_parent, _, { me }) => {
      const user = await UserModel.query().findById(me.id)
      return user
    },
    user: async (_parent, { id, username }, { me }) => {
      let user = null
      console.log({ username})
      if (id) user = await UserModel.query().findById(id)
      else if (username) user = await UserModel.query().findOne({ username })
      if (!user) throw new PersistedQueryNotFoundError()
      return user
    },
  },
  Mutation: {
    editUser: async (_parent, { input }, { me }) => {
      const user = await UserModel.query().findById(me?.id)
      if (!user) throw new PersistedQueryNotFoundError()
      const result = await UserModel.query().upsertGraphAndFetch({ id: user.id, ...input })
      console.log({ result, input })
      return result
    },
  },
}
