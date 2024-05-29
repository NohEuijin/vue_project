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


// 관리자 승인( role = 4=> )
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
//유저 탈퇴
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

//영화 등록
export const posterRegistration = gql`
mutation posterRegistration(
  $name : String,
  $genre : String,
  $director : String,
  $appearance : String,
  $viewage : ENUM_POSTER_VIEWAGE,
  $showtime : Int,
  $starttime : Date,
  $endtime : Date,
  $summary : String,
  $mainposter :ID,
  $stillcut :[ID],
){
  createPoster(
    input : {
      data:{
     	name: $name
      genre: $genre
      director: $director
      appearance: $appearance
      viewage: $viewage
      showtime: $showtime
      starttime: $starttime
      endtime: $endtime
      summary: $summary
      mainposter: $mainposter
      stillcut: $stillcut
      }
      }
    ){
    poster{
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
      }
      stillcut{
        id
      }
    }
  }
}
`

//영화 정보 수정
export const modifyPoster = gql`
mutation modifyPoster(
  $id:ID!,
  $name : String,
  $genre : String,
  $director : String,
  $appearance : String,
  $viewage : ENUM_POSTER_VIEWAGE,
  $showtime : Int,
  $starttime : Date,
  $endtime : Date,
  $summary : String,
  $mainposter :ID,
  $stillcut :[ID],
){
  updatePoster(
    input : {
      where:{id:$id}
      data:{
     	name: $name
      genre: $genre
      director: $director
      appearance: $appearance
      viewage: $viewage
      showtime: $showtime
      starttime: $starttime
      endtime: $endtime
      summary: $summary
      mainposter: $mainposter
      stillcut: $stillcut
      }
      }
    ){
    poster{
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
      }
      stillcut{
        id
      }
    }
  }
}
`
//영화 삭제
export const deletePoster = gql`
mutation deletePoster(
  $id:ID!
){
  deletePoster(
    input:{
      where:{
        id:$id
      }
    }
  ){
  poster{
    id
  }
}
}
`
//영화 수정
export const updateTheater = gql`
mutation updateTheater(
  $id:ID!,
  $name:String,
  $city:String,
  $title:String,
  $ratio:String,
  $bokdo:String,
  $blank:String,
  $total:String,
){
  updateTheater(
    input:{
      where:{id:$id}
      data:{
        name:$name,
        city:$city,
        title:$title,
        ratio:$ratio,
        bokdo:$bokdo,
        blank:$blank,
        total:$total,
    }}){
    theater{
      id
      name
      city
      title
      ratio
      bokdo
      blank
      total
    }
  }
}
`
//상영관 생성
export const createTheater = gql`
mutation createTheater(
  $name:String,
  $city:String,
  $title:String,
  $ratio:String,
  $bokdo:String,
  $blank:String,
  $total:String,
){
  createTheater(
    input:{
      data:{
        name:$name,
        city:$city,
        title:$title,
        ratio:$ratio,
        bokdo:$bokdo,
        blank:$blank,
        total:$total,
    }}){
    theater{
      id
      name
      city
      title
      ratio
      bokdo
      blank
      total
    }
  }
}
`
//상영관 삭제
export const deleteTheater = gql`
mutation deleteTheater(
  $id:ID!
){
  deleteTheater(
    input:{
      where:{
        id:$id
      }
    }){
    theater{
      id
    }
  }
}
`
// 스케이줄 생성
export const createSchedule = gql `
mutation createSchedule(
  $posterId:ID,
  $theaterId:ID,
  $time:Time,
  $date:Date,
  $booking:String,
  $place:Int,
){
  createSchedule(
    input:{
      data:{
        poster:$posterId,
 				theater:$theaterId,
        time:$time,
        date:$date,
        booking:$booking,
        place:$place,
      }}){
    schedule{
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
}
`

//스케이줄 삭제
export const deleteScheduls = gql`
mutation deleteScheduls(
  $id:ID!
){
  deleteSchedule(
    input:{
      where:{
        id: $id
      }}){
    schedule{
      id
    }
  }
}
`

//티켓 예매 진행
export const createTicketing = gql`
mutation createTicketing(
  $seat:String,
  $personnel:Int,
  $scheduleId:ID,
  $userId:ID
){
  createTicketing(
    input:{
      data:{
      seat:$seat,
      personnel:$personnel
      schedule:$scheduleId
      user:$userId
      }}){
    ticketing{
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
}
`

export const updateTicketing = gql`
mutation updateTicketing(
  $id:ID!,
  $personnel:Int,
  $seat:String,
  $total:String,
){
  updateTicketing(
    input:{
    where:{id:$id},
      data:{
        personnel:$personnel,
        seat:$seat,
        total:$total,
      }
  }){
    ticketing{
      id
      personnel
      seat
      total
    }
  }
}
`

//결제 내역 저장
export const createPayment = gql`
mutation createPayment(
  $hashcode:String,
	$userId : ID,
  $ticketId : ID,
  $amount:String,
  $buyer_poster_name: String,
  $buyer_poster_viewage: String,
  $buyer_poster_showtime: String,
  $buyer_theater_city: String,
  $buyer_theater_title: String,
  $buyer_theater_name: String,
  $buyer_choice_date: Date,
  $buyer_choice_time: Time,
  $buyer_seat: String,
){
  createPayment(
    input:{
      data:{
      hashcode:$hashcode,
      amount:$amount,
      user : $userId,
      ticketing : $ticketId,
      buyer_poster_name:$buyer_poster_name,
      buyer_poster_viewage:$buyer_poster_viewage,
      buyer_poster_showtime:$buyer_poster_showtime,
      buyer_theater_city:$buyer_theater_city,
      buyer_theater_title:$buyer_theater_title,
      buyer_theater_name:$buyer_theater_name,
      buyer_choice_date:$buyer_choice_date,
      buyer_choice_time:$buyer_choice_time,
      buyer_seat:$buyer_seat,
      }}){
    payment{
      id,
      amount,
      hashcode,
      buyer_poster_name,
      buyer_poster_viewage,
      buyer_poster_showtime,
      buyer_theater_city,
      buyer_theater_title,
      buyer_theater_name,
      buyer_choice_date,
      buyer_choice_time,
      buyer_seat,
      user{
        id
        name
      }
      ticketing{
        id
        schedule{
          id
          poster{
            id
            mainposter{
              id
              url
            }
          }
        }
      }
    }
  }
}
`
