import BaseService from './baseServiec'
import { PAGE_SIZE } from '../settings/constants'
import PostReaction from '../models/PostReaction'

class PostReactionService extends BaseService<PostReaction> {
  async getReactions(postId, page, pageSize = PAGE_SIZE) {
    const _query = PostReaction.query().withGraphFetched('[author]').where({ postId })
    return _query.page(page, pageSize)
  }
}

export default new PostReactionService(new PostReaction())
