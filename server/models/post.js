const { ObjectId } = require('mongodb')
const { db } = require('../configs/mongodb')

class Post {
    static col() {
        return db.collection('Posts')
    }

    static async findAll() {
        const pipeline = []

            pipeline.push({
                $sort:
                {
                    createdAt: -1
                }
            })

            pipeline.push({
                $lookup: {
                    from: "User",
                    localField: "authorId",
                    foreignField: "_id",
                    as: "author"
                }
            })

            pipeline.push({
                $unwind: {
                    path: "$author"
                }
            })


            
        const result = await this.col().aggregate(pipeline).toArray()
        return result
    }

    static async findByPk(id){
        console.log(id, "ID NYA NIH BOSSSSSSS");
        const pipeline = []

        pipeline.push({
            $match:{
                _id: new ObjectId(id)
            }
        })

        pipeline.push({
            $lookup: {
                from: "User",
                localField: "authorId",
                foreignField: "_id",
                as: "author"
            }
        })

        pipeline.push({
            $unwind: {
                path: "$author"
            }
        })
        const result = await this.col().aggregate(pipeline).toArray()
        // console.log(result, "DAPET GAAAAA");
        return result
    }

    static async create(newPost) {
        newPost.createdAt = newPost.updatedAt = new Date().toISOString()
        newPost.comments = []
        newPost.likes = []
        const result = await this.col().insertOne(newPost)
        return {
            _id: result.insertedId,
            ...newPost
        }
    }

    static async push(postId, path, value) {
        value.createdAt = new Date().toISOString()
        value.updatedAt = new Date().toISOString()
        
        const result = await this.col().updateOne(
            {_id: new ObjectId(postId)},
            {$push: {[path]: value}}
        )
        // console.log(result);
        return result
    }
}


module.exports = Post