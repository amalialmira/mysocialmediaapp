import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation Mutation($form: loginForm) {
  login(form: $form) {
    access_token
  }
}
`

export const REGIST = gql`
mutation Register($form: registForm) {
  register(form: $form) {
    _id
    name
    username
    email
  }
}
`
export const USER_BY_ID = gql`
query UserById($userId: String!) {
  userById(userId: $userId) {
    _id
    name
    username
    email
    password
  }
}
`

export const SEARCH_USER = gql`
query SearchUser($keywords: String) {
  searchUser(keywords: $keywords) {
    _id
    name
    username
    email
  }
}
`