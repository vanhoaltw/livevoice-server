"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("./../../generated/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const postCommentService_1 = __importDefault(require("../../services/postCommentService"));
const PostReactionService_1 = __importDefault(require("../../services/PostReactionService"));
const postService_1 = __importDefault(require("../../services/postService"));
const models_1 = require("../../models");
exports.default = {
    Query: {
        getPosts: async (_, { filter, page, pageSize, sort }) => {
            const posts = await postService_1.default.getPosts(filter, sort, page, pageSize);
            return posts;
        },
        getMyPosts: async (_, { sort, page, pageSize }, { me }) => {
            if (!me)
                throw new apollo_server_express_1.AuthenticationError('USER_INVALID');
            const posts = await postService_1.default.getMyPosts(me.id, sort, page, pageSize);
            return posts;
        },
        getPostComments: async (_, { postId, sort, page, pageSize }, { me }) => {
            const postComments = await postCommentService_1.default.getComments(postId, sort, page, pageSize);
            return postComments;
        },
        getPostReactions: async (_, { postId, page, pageSize }) => {
            const posts = await PostReactionService_1.default.getReactions(postId, page, pageSize);
            return posts;
        },
    },
    Mutation: {
        createPost: async (_, { input }, { me }) => {
            if (!me)
                throw new apollo_server_express_1.AuthenticationError('USER_INVALID');
            const content = {
                type: input.source ? graphql_1.PostType.Video : graphql_1.PostType.Album,
                photos: [...input.photos],
                thumbnail: input.thumbnail,
                ...(input.source ? { source: input.source } : {}),
            };
            console.log({ input, content, me });
            const params = { title: input?.title, description: input?.description, authorId: me.id, content };
            const newPost = await models_1.PostModel.query().insertGraph(params).withGraphFetched('[author]');
            return newPost;
        },
        editPost: async (_, { postId, input }, { me }) => {
            if (!me)
                throw new apollo_server_express_1.AuthenticationError('USER_INVALID');
            let post = await models_1.PostModel.query().findById(postId);
            if (!post)
                throw new apollo_server_express_1.ValidationError('INVALID_POST');
            if (post.authorId !== me.id)
                throw new apollo_server_express_1.ValidationError('INVALID_PERMISSION');
            post = await post.$query().patchAndFetch({ ...input });
            return post;
        },
        deletePost: async (_, { postId }, { me }) => {
            if (!me)
                throw new apollo_server_express_1.AuthenticationError('USER_INVALID');
            const post = await models_1.PostModel.query().findById(postId);
            if (!post)
                throw new apollo_server_express_1.ValidationError('INVALID_POST');
            if (post.authorId !== me.id)
                throw new apollo_server_express_1.ValidationError('INVALID_PERMISSION');
            await models_1.PostModel.query().delete().where({ postId });
            return true;
        },
        reactPost: async (_, { postId, action }, { me }) => {
            if (!me)
                throw new apollo_server_express_1.AuthenticationError('USER_INVALID');
            await models_1.PostReactionModel.transaction(async (trx) => {
                if (action === graphql_1.ReactPostAction.Like) {
                    const isLiked = await models_1.PostReactionModel.query().findOne({ postId, authorId: me.id });
                    if (isLiked)
                        return true;
                    await models_1.PostModel.query(trx).findById(postId).increment('likeCount', 1);
                    await models_1.PostReactionModel.query(trx).insert({ postId, authorId: me.id });
                    return true;
                }
                else if (action === graphql_1.ReactPostAction.Like) {
                    await models_1.PostModel.query(trx).findById(postId).decrement('likeCount', 1);
                    await models_1.PostReactionModel.query(trx).delete().where({ postId, authorId: me.id });
                    return true;
                }
                return false;
            });
        },
        commentPost: async (_, { postId, input }, { me }) => {
            if (!me)
                throw new apollo_server_express_1.AuthenticationError('USER_INVALID');
            let post = await models_1.PostModel.query().findById(postId);
            if (!post)
                throw new apollo_server_express_1.ValidationError('INVALID_POST');
            return models_1.PostReactionModel.transaction(async (trx) => {
                const newComment = await models_1.PostCommentModel.query(trx)
                    .insertGraph({ ...input, postId, authorId: me.id })
                    .withGraphFetched('[author]');
                await models_1.PostModel.query(trx).findById(postId).increment('commentCount', 1);
                return newComment;
            });
        },
        deletePostComment: async (_, { commentId }, { me }) => {
            if (!me)
                throw new apollo_server_express_1.AuthenticationError('USER_INVALID');
            const comment = await models_1.PostCommentModel.query().findById(commentId);
            if (!comment)
                throw new apollo_server_express_1.ValidationError('INVALID_COMMENT');
            let post = await models_1.PostModel.query().findById(comment.postId);
            if (post.authorId !== me.id || comment.authorId !== me.id) {
                throw new apollo_server_express_1.ValidationError('INVALID_PERMISSION');
            }
            post = await post.$query().decrement('commentCount', 1);
            await models_1.PostCommentModel.query().delete().where({ commentId });
            return true;
        },
    },
};
//# sourceMappingURL=post.js.map