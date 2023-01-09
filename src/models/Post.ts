import { PostStatus } from '../generated/graphql'
import BaseModel from './Base'
import { AnyQueryBuilder, Model, Modifiers, QueryBuilder } from 'objection'
import UserModel from './User'

interface IContent {
  type: 'album' | 'video'
  photos?: string[]
  thumbnail?: string
  source?: any
}

class PostModel extends BaseModel {
  id!: number
  title?: string
  description?: string
  content?: IContent
  likeCount?: number
  commentCount?: number
  isLiked?: boolean
  authorId?: number
  status?: PostStatus

  author: UserModel

  static tableName: string = 'post'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['authorId'],
      properties: {
        id: { type: 'integer' },
        authorId: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 120 },
        description: { type: ['string', 'null'] },
        content: { type: ['object', 'null'] },
        likeCount: { type: 'integer', default: 0 },
        commentCount: { type: 'integer', default: 0 },
        status: { type: 'string', enum: Object.values(PostStatus), default: PostStatus.Public },
      },
    }
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'post.authorId',
          to: 'user.id',
        },
      },
    }
  }
}

export default PostModel
