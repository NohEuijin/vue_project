import gql from 'graphql-tag'

// 중복 아이디 체크
export const duplicateUser = gql`
query duplicateUser($username:String!){
  users(where : {username:$username}){
    username
  }
}
`

// 중복 이메일 체크
export const duplicateEmail = gql`
query duplicateEmail($email:String!){
  users(where : {email:$email}){
    email
  }
}
`

export const myData = gql`
  query medata{
    me{
      id
    	name
      username
    }
  }
`

/*
- aggregate: 해당 필터링에 해당하는 게시글의 총 개수를 반환
- where: title_contains 필드
  = 제목에 특정 문자열이 포함된 게시글을 필터링
*/

//자유게시판 리스트
export const freeBoardList = gql`
  query freeBoardList($sortCondition:String, $search:String, $start:Int, $limit:Int){
    freeBoardsConnection(where:{title_contains:$search}){
      aggregate{
        count
      }
    }
      freeBoards(sort:$sortCondition,where:{title_contains:$search}, start:$start, limit:$limit){
        id
        title
        content
        created_at
        updated_at
        viewcount
        user{
          username
        }
      }
    }
`

//자유게시판 글 상세보기
export const freeBoardDetail = gql`
  query freeBoardDetail($id:ID){
    freeBoards(where:{id:$id}){
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
`

//댓글 불러오기
export const replyList = gql`
query replyList($freeBoard_id:ID){
  replies(where:{free_board:$freeBoard_id}){
    free_board{
      id
    }
    user{
      id
      username
    }
    id
    content
    created_at
    updated_at
  }
}
`

