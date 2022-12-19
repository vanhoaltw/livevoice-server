import { UserModel } from '../../models'

export default {
  Query: {
    me: async (_parent, _, { me }) => {
      const user = await UserModel.query().findById(me.id)
      return user
    },
  },
  Mutation: {},
}
