import { AttachType, CreatePostInput, PostType, ReactPostAction } from './../../generated/graphql'
import { AuthenticationError, ValidationError } from 'apollo-server-express'
import postCommentService from '../../services/postCommentService'
import PostReactionService from '../../services/PostReactionService'
import postService from '../../services/postService'
import { PostCommentModel, PostModel, PostReactionModel } from '../../models'

export default {
  Query: {
    post: async (_, { id }, { me }) => {
      const post = await PostModel.query().findById(id).withGraphFetched('[author]')
      if (!post) throw new ValidationError('INVALID_POST')
      return post
    },
    getPosts: async (_, { filter, page, pageSize, sort }) => {
      const posts = await postService.getPosts(filter, sort, page, pageSize)
      return posts
    },
    getPostComments: async (_, { postId, sort, page, pageSize }, { me }) => {
      const postComments = await postCommentService.getComments(postId, sort, page, pageSize)
      console.log({ postComments })
      return postComments
    },
    getPostReactions: async (_, { postId, page, pageSize }) => {
      const posts = await PostReactionService.getReactions(postId, page, pageSize)
      return posts
    },
  },
  Mutation: {
    createPost: async (_, { input }: { input: CreatePostInput }, { me }) => {
      if (!me) throw new AuthenticationError('USER_INVALID')
      const content = {
        type: input.source ? PostType.Video : PostType.Album,
        photos: [...input.photos],
        thumbnail: input.thumbnail,
        ...(input.source ? { source: input.source } : {}),
      }
      const params = { title: input?.title, description: input?.description, authorId: me.id, content }
      const newPost = await PostModel.query().insertGraph(params).withGraphFetched('[author]')
      return newPost
    },
    editPost: async (_, { postId, input }: { postId: number; input: CreatePostInput }, { me }) => {
      if (!me) throw new AuthenticationError('USER_INVALID')
      let post = await PostModel.query().findById(postId)
      if (!post) throw new ValidationError('INVALID_POST')
      if (post.authorId !== me.id) throw new ValidationError('INVALID_PERMISSION')
      post = await post.$query().patchAndFetch({ ...input })
      return post
    },
    deletePost: async (_, { postId }, { me }) => {
      if (!me) throw new AuthenticationError('USER_INVALID')
      const post = await PostModel.query().findById(postId)
      if (!post) throw new ValidationError('INVALID_POST')
      if (post.authorId !== me.id) throw new ValidationError('INVALID_PERMISSION')
      await PostModel.query().delete().where({ id: postId })
      return true
    },
    reactPost: async (_, { postId, action }, { me }) => {
      if (!me) throw new AuthenticationError('USER_INVALID')
      await PostReactionModel.transaction(async (trx) => {
        if (action === ReactPostAction.Like) {
          const isLiked = await PostReactionModel.query().findOne({ postId, authorId: me.id })
          if (isLiked) return true
          await PostModel.query(trx).findById(postId).increment('likeCount', 1)
          await PostReactionModel.query(trx).insert({ postId, authorId: me.id })
          return true
        } else if (action === ReactPostAction.Unlike) {
          await PostModel.query(trx).findById(postId).decrement('likeCount', 1)
          await PostReactionModel.query(trx).delete().where({ postId, authorId: me.id })
          return true
        }
        return false
      })
    },
    commentPost: async (_, { postId, input }, { me }) => {
      if (!me) throw new AuthenticationError('USER_INVALID')
      let post = await PostModel.query().findById(postId)
      if (!post) throw new ValidationError('INVALID_POST')
      return PostReactionModel.transaction(async (trx) => {
        const params = {
          postId,
          authorId: me.id,
          content: input?.content,
          attachment: { photos: input?.photos, type: AttachType.Album },
        }
        const newComment = await PostCommentModel.query(trx).insertGraph(params).withGraphFetched('[author]')
        await PostModel.query(trx).findById(postId).increment('commentCount', 1)
        return newComment
      })
    },
    deletePostComment: async (_, { commentId }, { me }) => {
      if (!me) throw new AuthenticationError('USER_INVALID')
      const comment = await PostCommentModel.query().findById(commentId)
      if (!comment) throw new ValidationError('INVALID_COMMENT')
      let post = await PostModel.query().findById(comment.postId)
      if (post.authorId !== me.id || comment.authorId !== me.id) {
        throw new ValidationError('INVALID_PERMISSION')
      }
      post = await post.$query().decrement('commentCount', 1)
      await PostCommentModel.query().delete().where({ id: commentId })
      return true
    },
  },

  Post: {
    isReacted: async (post, _, { me }) => {
      if (!me || !post) return null
      const isReacted = await PostReactionModel.query().findOne({ postId: post.id, authorId: me.id })
      return !!isReacted
    },
  },
}
