import { gql } from "@apollo/client";

export const GET_POST = gql`
query Posts {
  posts {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      UpdatedAt
    }
    likes {
      username
      createdAt
      UpdatedAt
    }
    author {
      _id
      name
      username
      email
    }
    createdAt
    updatedAt
  }
}
`

export const LIKE = gql`
mutation AddLike($postId: String!) {
  addLike(postId: $postId)
}
`

export const POST_BYID = gql`
query PostById($postId: String!) {
  postById(postId: $postId) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      UpdatedAt
    }
    likes {
      username
      createdAt
      UpdatedAt
    }
    author {
      _id
      name
      username
      email
    }
    createdAt
    updatedAt
  }
}
`

export const ADD_COMMENT =gql`
mutation AddComment($postId: String, $comment: commentForm) {
  addComment(postId: $postId, comment: $comment)
}
`

export const ADD_POST =gql`
mutation AddPost($form: postForm) {
  addPost(form: $form) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      UpdatedAt
    }
    likes {
      username
      createdAt
      UpdatedAt
    }
    author {
      _id
      name
      username
      email
    }
    createdAt
    updatedAt
  }
}
`