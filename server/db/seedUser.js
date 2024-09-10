const usersJson = require('./users.json')
const {db} = require('../configs/mongodb')

async function seedUser() {
    try {

        const usersCollection = db.collection('User')
        
    } catch (error) {
        console.log(error);
    } finally {

    }
    
}