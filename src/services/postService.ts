import BaseService, { FilterOpts } from './baseServiec'
import PostModel from '../models/Post'
import { PAGE_SIZE } from '../settings/constants'

class PostService extends BaseService<PostModel> {
  async getPosts(filter: FilterOpts[], sort: [{ field: 'created'; value: 'desc' }], page, pageSize = PAGE_SIZE) {
    const _query = PostModel.query().withGraphFetched('[author]')
    const finalQuery = await this.sortJson(this.filterJson(_query, filter), sort).page(page, pageSize)
    return finalQuery
  }
  async getMyPosts(userId, sort: [], page, pageSize) {
    const _query = PostModel.query().withGraphFetched('[author]').where({ authorId: userId })
    return this.sortJson(_query, sort).page(page, pageSize)
  }
}

export default new PostService(new PostModel())
