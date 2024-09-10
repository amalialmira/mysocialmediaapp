const { ObjectId } = require("mongodb")
const Follow = require("../models/follow")

const followTypeDefs = `#graphql

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  type followDataRes {
    user: User
    followers: [User]
    followings: [User]
  }

  type Query {
    followData(otherUserId: String): followDataRes
  }

  type Mutation {
    follow(followId: String): Follow
  }

`
const followResolvers = {
  Query: {
    followData: async(parent, args, contextValue) => {
        const user = await contextValue.authentication()
        // console.log(user, "FOLLOW DATA");

        let result
        if (args.otherUserId !== undefined ){
            // console.log(args);
            result = await Follow.getAllFollow(args.otherUserId)
        }
        else {
            result = await Follow.getAllFollow(user._id)
        }

        return result
    }
},
    Mutation: {
        follow: async(parent, {followId}, contextValue) => {
            const user = await contextValue.authentication()

            let following = {
                followerId: user._id,
                followingId: new ObjectId(followId) 
            }

            const followed = Follow.follow(following)
            return followed
        }
    }
}

module.exports = {followTypeDefs, followResolvers}