import BaseService, { FilterOpts } from './baseServiec'
import { PAGE_SIZE } from '../settings/constants'
import PostCommentModel from '../models/PostComment'
import PostComment from '../models/PostComment'

class PostCommentService extends BaseService<PostComment> {
  async getComments(postId: number, sort: [], page: number, pageSize = PAGE_SIZE) {
    const _query = PostCommentModel.query().withGraphFetched('[author]').where({ postId })
    return this.sortJson(_query, sort).page(page, pageSize)
  }
}

export default new PostCommentService(new PostComment())
