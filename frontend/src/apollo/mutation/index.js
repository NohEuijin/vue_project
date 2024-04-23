import gql from 'graphql-tag'
/*
변수명 신경쓰기
username = userId
*/

//  회원가입
export const register = gql `
mutation register(
  $username : String!,
  $password : String!,
  $email : String!,
  $name : String,
  $phone : String,
  $addressZipCode : String,
  $address : String,
  $addressDong : String,
  $addressDetail : String,
  $role :ID
){
  register(
    input : {
      username : $username,
      password : $password,
      email : $email,
      name : $name,
      phone : $phone,
      addressZipCode : $addressZipCode,
      address : $address,
      addressDong : $addressDong,
      addressDetail : $addressDetail,
      role :$role
    })
    {
      jwt
      user{
      id
        role{
          id
          name
        }
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
        role{
          id
          name
        }
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

/**

여기서 부터 관리자 관련

*/


// 관리자 승인 대기 ( role = 4 )

export const updateAdmin = gql`
mutation updateAdmin(
  $id:ID!,
  $email : String,
  $password : String,
  $name : String,
  $role:ID
){
  updateUser(
    input : {
      where :{
        id:$id,
      }
      data:{
      email : $email,
      password : $password,
      name:$name,
      role:$role,
      }
    })
    {
      user{
      id
        role{
          id
          name
        }
    }
  }
}
`
export const deleteuser = gql`
mutation deleteUser(
  $id: ID!
){
  deleteUser(
    input: {
      where: {
        id: $id
      }
    }
  )
  {
    user {
      id
    }
  }
}
`
