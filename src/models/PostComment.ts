import { PostStatus } from '../generated/graphql'
import BaseModel from './Base'
import { Model } from 'objection'
import UserModel from './User'

interface IContent {
  type: 'album' | 'video'
  photos?: string[]
  thumbnail?: string
  source?: any
}

class PostComment extends BaseModel {
  id!: number
  postId: number
  authorId: number
  content: string
  likeCount: number
  commentCount: number

  author: UserModel

  static tableName: string = 'post_comment'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['authorId'],
      properties: {
        id: { type: 'integer' },
        postId: { type: 'integer' },
        authorId: { type: 'integer' },
        content: { type: ['string', 'null'] },
        likeCount: { type: 'integer', default: 0 },
        commentCount: { type: 'integer', default: 0 },
      },
    }
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'post_comment.authorId',
          to: 'user.id',
        },
      },
    }
  }
}

export default PostComment
