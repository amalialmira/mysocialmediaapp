require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbName = 'gc1-line'
const db = client.db(dbName)


module.exports = { db, client }
