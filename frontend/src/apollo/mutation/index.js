import gql from 'graphql-tag'
/*
변수명 신경쓰기
username = userId
*/

//  회원가입
export const createUser = gql `
mutation createUser(
  $username : String!,
  $password : String!,
  $name : String,
  $phone : String,
  $email : String!,
  $addressZipCode : String,
  $address : String,
  $addressDong : String,
  $addressDetail : String,
){
  createUser(
    input : {
      data:{
      username : $username,
      password : $password,
      name : $name,
      phone : $phone,
      email : $email,
      addressZipCode : $addressZipCode,
      address : $address,
      addressDong : $addressDong,
      addressDetail : $addressDetail,
      }
    })
    {
      user{
      id
    }
  }
}
`
//로그인
export const login = gql`
  mutation login(
    $identifier : String!,
    $password : String!,
    ){
      login(
        input : {
          identifier : $identifier,
          password : $password,
        }
      )
    {
      jwt
        user{
        id,
        username,
      }
    }
  }
`

  //자유게시판 글 작성
  export const createFreeBoard = gql`
  mutation createFreeBoard(
    $userId : ID,
    $title : String,
    $content :String
  ){
    createFreeBoard(
      input : {
        data:{
          user : $userId,
          title :$title,
          content:$content
        }}){
      freeBoard{
        id
        title
        content
        created_at
        updated_at
        viewcount
        user{
          id
          username
        }
      }
    }
  }
`

// input 내가보내주는 input 값
// mutation modifyFreeBoard(
//   $id: ID!,
//   $title: String,
//   $content: String
// ){
//자유게시판 글수정
export const modifyFreeBoard = gql`
mutation modifyFreeBoard(
  $id: ID!,
  $title: String,
  $content: String,
  $viewcount : Int,
){
  updateFreeBoard(
    input: {
      where: { id: $id },
      data: {
        title: $title,
        content: $content,
        viewcount : $viewcount
      }
    }
  ){
    freeBoard {
      id
      title
      content
      created_at
      updated_at
      viewcount
      user {
        id
      }
    }
  }
}
`

//자유게시판 글 삭제
export const deleteFreeBoard = gql`
mutation deleteFreeBoard($id: ID!){
  deleteFreeBoard(input: { where: { id: $id } }) {
    freeBoard {
      id
    }
  }
}
`

//댓글 작성
export const createReply = gql`
  mutation createReply(
    $user_id : ID,
    $freeBoardId: ID,
    $content: String!
  ){
    createReply(
      input: {
        data: {
          user :$user_id
          free_board: $freeBoardId
          content: $content
        }
      }
    ){
      reply{
        id
        content
        updated_at
        user{
          id
          username
        }
        free_board{
          id
        }
      }
    }
  }
`
//댓글 수정하기
export const modifyReply = gql`
  mutation modifyReply(
    $id: ID!,
    $content: String!
  ) {
    updateReply(
      input: {
        where: { id: $id },
        data: {
          content: $content
        }
      }
    ) {
      reply {
        id
        content
        updated_at
        user {
          id
          username
        }
        free_board {
          id
        }
      }
    }
  }
`

//댓글 삭제 하기
export const deleteReply = gql`
  mutation deleteRelpy($id:ID!){
    deleteReply(
        input:{
        where:{
          id:$id
        }
      }
    ){
      reply{
        id
      }
    }
  }
`
