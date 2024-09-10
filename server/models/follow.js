const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");
const User = require("./user");

class Follow {
    static col(){
        return db.collection('Follows')
    }

    static async follow(following){
        following.createdAt = following.updatedAt = new Date().toISOString()
        
        const result = await this.col().insertOne(following)

        return {
            _id: result.insertedId,
            ...following
        }
    }

    static async getAllFollow(userId) {
        try {
            // console.log(userId, "??????");
            const user = await User.findOne({ _id: new ObjectId(userId) })
            // console.log(user, "INI YG DICARIIIIII AAAAA");
            const followers = []
            const followings = []

            const follower = await this.col().aggregate([
                {
                    $match: {
                        followingId: new ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "User",
                        localField: "followerId",
                        foreignField: "_id",
                        as: "follower"
                    }
                },
                {
                    $unwind: {
                        path: "$follower"
                    }
                }
            ]).toArray()

            const following = await this.col().aggregate([
                {
                    $match: {
                        followerId: new ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "User",
                        localField: "followingId",
                        foreignField: "_id",
                        as: "following"
                    }
                },
                {
                    $unwind: {
                        path: "$following"
                    }
                }
            ]).toArray()

            follower.map(el => {
                followers.push(el.follower)
            })

            following.map(el => {
                followings.push(el.following)
            })

            console.log(following, "FOLLOWING");
            console.log(follower, "FOLLOWEER");

            return {
                user,
                followers,
                followings
            }

        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = Follow