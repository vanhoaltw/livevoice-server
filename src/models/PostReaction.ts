import { PostStatus } from '../generated/graphql'
import BaseModel from './Base'
import { Model } from 'objection'
import UserModel from './User'
import PostModel from './Post'

class PostReaction extends BaseModel {
  id!: number
  postId: number
  authorId: number

  post: PostModel
  author: UserModel

  static tableName: string = 'post_reaction'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['authorId'],
      properties: {
        id: { type: 'integer' },
        postId: { type: 'integer' },
        authorId: { type: 'integer' },
      },
    }
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'post_reaction.authorid',
          to: 'user.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: PostModel,
        join: {
          from: 'post_reaction.postId',
          to: 'post.id',
        },
      },
    }
  }
}

export default PostReaction
