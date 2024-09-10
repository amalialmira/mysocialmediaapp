const redis = require('../configs/redis')
const Post = require('../models/post')

const postTypeDefs = `#graphql

  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comments]
    likes: [Likes]
    author: User
    createdAt: String
    updatedAt: String
  }

  type Comments {
    content: String
    username: String
    createdAt: String
    UpdatedAt: String
  }

  type Likes {
    username: String
    createdAt: String
    UpdatedAt: String
  }

  type Query {
    posts: [Post]
    postById(postId: String!): Post
  }

  input postForm {
    content: String!
    tags: [String]
    imgUrl: String
  }

  input commentForm {
    content: String!co
  }

  type Mutation {
    addPost(form: postForm): Post
    addComment(postId: String, comment: commentForm): String
    addLike(postId: String!): String
  }

`

const postResolver = {
    Query: {
        posts: async (parent, args, contextValue) => {
            const user = await contextValue.authentication()

            const postCache = await redis.get("posts:all")
            if (postCache){
                return JSON.parse(postCache)
            }

            const posts = await Post.findAll()

            await redis.set("posts:all", JSON.stringify(posts))
            return posts
         
        },
        postById: async (parent, args, contextValue) => {
            const user = await contextValue.authentication()
            const {postId} = args

            const result = await Post.findByPk(postId)
            // console.log(result, "INI YG RESULT SCHEMA");
            return result[0]
        },
    },
    Mutation:{
        addPost: async (parent, {form}, contextValue) => {
            // console.log(contextValue, "ENIH");
            const user = await contextValue.authentication()
            // console.log(user, "---------");

            if (!form.content){
                throw new Error("content cannot be empty!")
            }

            form.authorId = user._id

            const result = await Post.create(form)
            // console.log(result);
            await redis.del("posts:all")
            return result
        },

        addComment: async(parent, {postId, comment}, contextValue) => {
            const user = await contextValue.authentication()            
            
            console.log(comment, "------");
            comment.username = user.username

            const result = await Post.push(postId, "comments", comment)
            
            await redis.del("posts:all")
            return "comment has been posted"
        },

        addLike: async(parent, {postId}, contextValue) => {
            const user = await contextValue.authentication()            
            
            let likedUser = {
                username: user.username
            }

            const post = await Post.findByPk(postId)

            // console.log(postId, "tp ini ada?");
            // if(post.likes.find(el => el.username === user.username)){
            //   console.log("masuk kesini");
            //     throw new Error("you already liked this post")
            // }
            // console.log("apakah keluar?");

            const result = await Post.push(postId, "likes", likedUser)

            await redis.del("posts:all")
            return "liked!"
        }
    }

}

module.exports = {postTypeDefs, postResolver}