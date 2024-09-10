const { ObjectId } = require('mongodb');
const { db } = require('../configs/mongodb');
const { hashPass, comparePass } = require('../helpers/bcrypt');

class User {
    static col() {
        return db.collection('User')
    }

    static async findAll() {
        try {

            const result = await this.col().find().toArray()
            return result
        } catch (error) {
            console.log(error);
        }
    }

    static async findOne(filter) {
        try {
            const result = await this.col().findOne(filter)
            // console.log(result, "DIIIII MODEL");
            return result
        } catch (error) {
            console.log(error);
        }
    }

    static async findUserByPk(id) {
        const pipeline = []

        pipeline.push({
            $match: {
                _id: new ObjectId(id)
            }
        })

        pipeline.push({
            $lookup: {
                from: "Posts",
                localField: "_id",
                foreignField: "authorId",
                as: "posts"
            }
        })

        pipeline.push({
            $unwind: {
                path: "$posts"
            }
        })

        const result = await this.col().aggregate(pipeline).toArray()
        console.log(result);
        return result
    }

    static async create(newUser) {
        newUser.password = await hashPass(newUser.password)

        const result = await this.col().insertOne(newUser)
        // console.log(result, "<<<<<<<<");

        delete newUser.password

        return {
            _id: result.insertedId,
            ...newUser
        }
    }

    static async login(existedUser) {
        const result = await this.col().findOne({ username: existedUser.username })

        if (!result ||
            !comparePass(existedUser.password, result.password)
        ) {
            throw new Error("invalid email/password")
        }

        return result

    }

    static async searchUser(keywords) {
        const result = await this.col().find({
            $or: [
                {
                    name: { $regex: keywords, $options: "i" }
                },
                {
                    username: ({ $regex: keywords, $options: "i" })
                }
            ]
        }).toArray()

        // console.log(result);
        return result
    }



}

module.exports = User