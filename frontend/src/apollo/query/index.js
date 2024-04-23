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
      role{
        id
      }
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
query freeBoardList(
  $sortCondition:String,
  $search:String,
  $start:Int,
  $limit:Int
){
  freeBoardsConnection(
    where:{
      title_contains:$search
    }){
    aggregate{
      count
    }
  }
    freeBoards(
      sort:$sortCondition,
      where:{
        title_contains:$search
      },
      start:$start,
      limit:$limit
    ){
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
/**

여기서 부터 관리자 관련

*/


/*

role:1 회원만 검색
$search : 검색
$start:Int,$limit:Int : 페이징
$usernameContains : 카테고리(아이디)
$nameContains : 카테고리(이름)
$startDate : 시작 날짜
$endDate : 마지막 날짜,

created_at_gte:$startDate
created_at_lte:$endDate
= gte(여기서)~lte(여기까지) 검색

aggregate
: 쿼리 내 필드의 계산, 평균화, 합계 또는
최소값 또는 최대값 찾기와 같은 집계 작업을 수행

*/
export const userList = gql`
query userList(
  $start:Int,
  $limit:Int,
  $usernameContains:String,
  $nameContains:String,
  $startDate:DateTime,
  $endDate:DateTime,
  $allSearch:JSON,
){
  usersConnection(
    where:{
      _or:$allSearch,
      username_contains:$usernameContains,
      name_contains:$nameContains,
      created_at_gte:$startDate,
      created_at_lte:$endDate,
      role:"1"
    }){
    aggregate{
      count
    }
  }
  users(
    where:{
      _or:$allSearch,
      username_contains:$usernameContains,
      name_contains:$nameContains,
      role: "1",
      created_at_gte:$startDate,
      created_at_lte:$endDate,
    },
    start:$start,
    limit:$limit
  ){
    id
    username
    name
    phone
    email
    created_at
    role{
      id
    }
  }
}
`

export const userDetail = gql`
query userDetail(
  $id:ID,
  $username : String,
  $name : String,
  $email : String,
  $phone : String,
  $addressZipCode : String,
  $address : String,
  $addressDetail : String,
)
{
  users(
    where:{
			id:$id,
      username:$username,
      name:$name,
      email:$email,
      phone:$phone,
      addressZipCode:$addressZipCode,
      address:$address,
      addressDetail:$addressDetail
    }
  ){
    id
    username
    name
    phone
    email
    created_at
    free_boards{
      id
      title
      created_at
      viewcount
    }
  }
  repliesConnection(where : {user:{id:$id}}){
    aggregate{
      count
    }
  }
  freeBoardsConnection(where : {user:{id:$id}}){
    aggregate{
      count
    }
  }
}
`
