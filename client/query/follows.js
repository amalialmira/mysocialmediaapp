import { gql } from "@apollo/client";

export const FOLLOW_DATA = gql`
query FollowData {
  followData {
    followers {
      _id
      name
      username
      email
    }
    followings {
      _id
      name
      username
      email
    }
    user {
      _id
      name
      username
      email
    }
  }
}
`

export const FOLLOW = gql`
mutation Follow($followId: String) {
  follow(followId: $followId) {
    _id
    followingId
    followerId
    createdAt
    updatedAt
  }
}
`