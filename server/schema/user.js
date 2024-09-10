const { ObjectId } = require('mongodb');
const { signToken } = require('../helpers/jwt');
const User = require('../models/user')

const userTypeDefs = `#graphql

  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type Query {
    users: [User]
    userById(userId: String!): User
    searchUser(keywords: String): [User]
  }

  input registForm{
    name: String!,
    username: String!,
    email: String!,
    password: String!
  }

  input loginForm{
    username: String!,
    password: String!
  }

  type loginResponse{
    access_token: String
  }

  type Mutation{
    register(form: registForm): User
    login(form: loginForm): loginResponse
  }
`

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const userResolvers = {
    Query: {
        users: async () => {
            return await User.findAll()
        },
        userById: async (parent, args) => {
            const {userId} = args

            return await User.findOne({_id: new ObjectId(userId)})
        },
        searchUser: async (parent, {keywords}) => {
            const result = await User.searchUser(keywords)
            // console.log(result, "DIIII SCHEMA");
            return result
        }
    },
    Mutation: {
        register: async (parent, { form }) => {
            if (!form.name) {
                throw new Error("name is required")
            }
            if (!form.username) {
                throw new Error("username is required")
            }
            if (!form.email) {
                throw new Error("email is required")
            }
            if (!form.password) {
                throw new Error("password is required")
            }
            if (!validateEmail(form.email)) {
                throw new Error("email is invalid")
            }

            const user = await User.findOne({ email: form.email })
            if (user) {
                throw new Error("email already been registered")
            }

            const result = await User.create(form)
            return result
        },
        login: async (parent, { form }) => {
            try {
                if (
                    !form.username ||
                    !form.password ||
                    !form.username.length === 0 ||
                    !form.password.length === 0
                ) {
                    throw new Error("username/password cannot be empty")
                }
    
                const result = await User.login(form)
                return {
                    access_token: signToken({_id: result._id})
                }
                
            } catch (error) {
                console.log(error);
            }
        }

    }

}

module.exports = { userTypeDefs, userResolvers }