require('dotenv').config()
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { userTypeDefs, userResolvers } = require('./schema/user')
const { postTypeDefs, postResolver } = require('./schema/post')
const { followTypeDefs, followResolvers } = require('./schema/follow');
const { verify } = require('jsonwebtoken');
const { verifyToken } = require('./helpers/jwt');
const User = require('./models/user');
const { ObjectId } = require('mongodb');

const PORT = process.env.PORT || 3000

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolver, followResolvers],
  introspection:true
})

startStandaloneServer(server, {
  listen: { port: PORT },

  context: ({ req }) => {
    async function authentication(){
      const headers = req.headers.authorization || ''
      // console.log(headers, "HEADERS");
      if(!headers) throw new Error("invalid token")

      const [type, token] = headers.split(' ')
      if(type !== "Bearer") throw new Error("invalid token")

      const payload = verifyToken(token)
      // console.log(payload);

      const user = await User.findOne({_id: new ObjectId(payload._id)})
      // console.log(user, "DI CONTEXT");
      return user
    }
    return {
      authentication
    }
  }
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`)
}) 
