const { db, client } = require('./configs/mongodb')

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const userCol = db.collection('User')

        await userCol.insertOne({
            "name": "Admin",
            "username": "admin",
            "email": "admin@mail.com",
            "password": "admin"
        })

        const allUsers = await userCol.find().toArray()

        console.log(allUsers);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
