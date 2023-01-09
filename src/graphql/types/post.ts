export default `
    enum PostStatus {
        public
        social
        private
    }

    enum PostType { 
        album
        video
    }

    enum ReactPostAction  {
        like
        unlike
    }

    input CreatePostInput {
        title: String
        description: String
        type: PostType
        photos: [String]
        thumbnail: String
        source: JSON
        status: PostStatus
    }

    input CreatePostCommentInput { 
        postId: Int
        authorId: Int
        content: String
    }

    type PostContent {
        type: PostType
        photos: [String]
        thumbnail: String
        source: JSON
    }

    type Post {
        id: Int!
        title: String
        description: String
        content: PostContent
        likeCount: Int
        commentCount: Int
        status: PostStatus
        authorId: Int
        author: User
        created: Date
        updated: Date
    }

    type PostComment {
        id: Int!
        postId: Int
        authorId: Int
        content: String
        likeCount: Int
        commentCount: Int
        author: User
    }

    type PostReaction {
        id: Int!
        postId: Int
        authorId: Int
        author: User
    }

    type PostPagination {
        results: [Post]
        total: Int
        currentPage: Int
        pageSize: Int
    }

    extend type Query {
        post(id: Int!): Post
        getPosts(filter: JSON, page: Int, pageSize: Int, sort: JSON): PostPagination
        getMyPosts(page: Int, pageSize: Int, sort: JSON): [Post]
        getPostComments(postId: Int!, sort: JSON): [PostComment]
        getPostReactions(postId: Int!): [PostReaction]
    }

    extend type Mutation {
        createPost(input: CreatePostInput): Post
        editPost(postId: Int!, input: CreatePostInput): Post
        reactPost(postId: Int!, action: ReactPostAction ): Post
        commentPost(postId:Int!, input: CreatePostCommentInput): Post
        deletePost(postId: Int!): Boolean
        deletePostComment(commentId: Int!): Boolean
    }
`
