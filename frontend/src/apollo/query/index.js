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
  $limit:Int,
  $user_del: Boolean
){
  freeBoardsConnection(
    where:{
      title_contains:$search
      user_null: $user_del
    }){
    aggregate{
      count
    }
  }
    freeBoards(
      sort:$sortCondition,
      where:{
        title_contains:$search
        user_null: $user_del
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
유저 리스트

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
//유저 상세 보기
export const userDetail = gql`
query userDetail(
  $id: ID
  $username: String
  $name: String
  $email: String
  $phone: String
  $addressZipCode: String
  $address: String
  $addressDetail: String
  $start: Int
  $limit: Int
  $title: String
  $viewcount: Int
) {
  freeBoards(
    where: {
    user: {
      id: $id
    }
      title: $title
      viewcount: $viewcount
    }
    start: $start
    limit: $limit
  ) {
    id
    title
    created_at
    viewcount
    replies{
      id
      content
    }
  }
  users(
    where: {
      id: $id
      username: $username
      name: $name
      email: $email
      phone: $phone
      addressZipCode: $addressZipCode
      address: $address
      addressDetail: $addressDetail
    }
  ) {
    id
    username
    name
    phone
    email
    created_at
  }
  repliesConnection(where: { user: { id: $id } }) {
    aggregate {
      count
    }
  }
  freeBoardsConnection(where: { user: { id: $id } }) {
    aggregate {
      count
    }
  }
}

`
//관리자 대기 검색
export const waitingAdminList = gql`
query waitingAdminList(
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
      role:"4"
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
      role: "4",
      created_at_gte:$startDate,
      created_at_lte:$endDate,
    },
    start:$start,
    limit:$limit
  ){
    id
    username
    name
    email
    created_at
    role{
      id
    }
  }
}
`

//영화 리스트
export const posterList = gql`
query posterList(
  $start:Int,
  $limit:Int,
  $nameContains:String,
  $genreContains:String,
  $directorContains:String,
  $startDate:DateTime,
  $endDate:DateTime,
  $allSearch:JSON,
){
  postersConnection(
    where:{
      _or:$allSearch
      genre_contains:$genreContains
      name_contains:$nameContains
      director_contains:$directorContains
      created_at_gte:$startDate
      created_at_lte:$endDate
    }){
    aggregate{
      count
    }
  }
  posters(
    where:{
      _or:$allSearch
      genre_contains:$genreContains
      name_contains:$nameContains
      director_contains:$directorContains
      created_at_gte:$startDate
      created_at_lte:$endDate
    },
    start:$start,
    limit:$limit
  ){
      id
      name
      director
      starttime
      endtime
      created_at
  }
}
`

//영화 상세보기
export const posterDetail = gql`
query posterDetail($id:ID){
  posters(where: {id:$id}){
    id
    name
    genre
    director
    appearance
    viewage
    showtime
    starttime
    endtime
    summary
    mainposter{
      id
      url
    }
    stillcut{
      id
      url
    }
  }
}
`

//지역 상영관 리스트 검색
export const theaterList = gql`
query theaterList(
	$start:Int,
  $limit:Int,
  $cityContain:String,
  $titleContain:String,
  $startDate:DateTime,
  $endDate:DateTime,
){
  theatersConnection(
    where:{
    city:$cityContain,
    title:$titleContain,
    created_at_gte:$startDate,
    created_at_lte:$endDate,
    }){
    aggregate{
      count
    }
  }
  theaters(
    where:{
    city:$cityContain,
    title:$titleContain,
    created_at_gte:$startDate,
    created_at_lte:$endDate,
    },
  	start:$start,
    limit:$limit,
  ){
    id
    name
    city
    title
    created_at
  }
}
`

//상영관 상세보기
export const theaterDetail = gql`
query theaterDetail(
  $id:ID
){
  theaters(
    where:{
      id:$id
    }){
      id
      city
      title
      name
      ratio
      bokdo
      blank
      readytime
    schedules{
      date
    }
  }
}
`

//영화 정보 검색
export const selectMovie = gql`
query selectMovie(
  $id:ID
  $date:Date
){
  posters(where:{
    id:$id
    starttime_lte:$date,
    endtime_gte:$date
  }){
    id
    name
    viewage
    showtime
    starttime
    endtime
  }
}
`

//날짜별 스케이줄 조회
export const searchScheule = gql`
query searchScheule(
  $tid:ID,
  $date:Date,
){
  schedules(where:{
    theater:$tid
    date:$date,
  }){
    id
    date
    time
    booking
    poster{
      id
      name
      viewage
      showtime
    }
    theater{
      id
      city
      title
      name
    }
  }
}
`

export const scheduleCount = gql`
query scheuleCount(
  $tcity:String,
  $ttitle:String,
  $date:Date,
){
  schedulesConnection(
    where:{date:$date
     theater:{
      city:$tcity,
      title:$ttitle
    }
    }){
 aggregate{
  count
}
  }
}
`
//메인 영화 리스트
export const mainPosterList = gql `
query mainPosterList(
  $start:Int,
  $limit:Int,
  $startDate:DateTime,
  $endDate:DateTime,
){
  postersConnection(
    where:{
      created_at_gte:$startDate
      created_at_lte:$endDate
    }){
    aggregate{
      count
    }
  }
  posters(
    where:{
      created_at_gte:$startDate
      created_at_lte:$endDate
    },
    start:$start,
    limit:$limit
  ){
      id
      name
      starttime
      endtime
    	viewage
    	mainposter{
        id
        url
      }

  }
}
`

export const ticketingSchedules = gql`
query ticketingSchedules(
  $theatercity : String,
  $theatertitle : String,
  $date:Date,
  $sortCondition:String,
){
  schedules(
	sort:$sortCondition,
    where:{
      theater:{
        city:$theatercity,
        title:$theatertitle,
      },
      date:$date
  }){
      id
      date
      time
      place
      booking
    	theater{
        id
        city
        title
        name
        readytime
        ratio
        bokdo
        blank
        total
      }
      poster{
        id
        name
        viewage
        showtime
    		}
  }
}
`

export const posterNowShowtime = gql`
query posterNowShowtime(
  $starttime:Date,
  $endtime:Date
){
  posters(
    where:{
    starttime:$starttime,
    endtime:$endtime
    }){
    id
    name
    starttime
    endtime
    showtime
    viewage
  }
}
`

//회원 영화 예매 진행 보기
export const getTicketing = gql`
query getTicketing(
  $uid:ID,
){
  ticketings(where:{
      user:$uid
  }){
    id
    seat
    personnel
    user{
      id
      name
    }
    schedule{
      id
      date
      time
      place
      booking
      	theater{
        id
        city
        title
        name
        readytime
        ratio
        bokdo
        blank
        total
      }
      poster{
      id
      name
      viewage
      showtime
      }
    }
  }
}
`

//결제 전
export const getOrderInfo = gql`
query getOrderInfo(
  $id:ID,
){
  ticketings(where:{
      id:$id
  }){
    id
    seat
    personnel
    total
    user{
      id
      name
    }
    schedule{
      id
      date
      time
      booking
      	theater{
        id
        city
        title
        name
      }
      poster{
      id
      name
      viewage
      showtime
      }
    }
  }
}
`
