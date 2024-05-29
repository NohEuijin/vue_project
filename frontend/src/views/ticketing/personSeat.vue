<template>
  <div class=" mt_contents_full">
    <div class="wrap_reserve ty2">
      <h2 class="d-none">인원/좌석</h2>

      <div class="section_step_tit">
    <ul>
      <li class="step01 prev">
        <a href="#">
          <string class="tit">
            <span>
              01
              <br>
              상영시간
            </span>
          </string>
          <div class="bx_con">
            <dl>
              <dt>선택한 영화 제목 </dt>
              <dd>영화 제목</dd>
              <dt>상영관</dt>
              <dd>00지점</dd>
              <dt>선택한 상영 날짜</dt>
              <dd>2024-05-24(금)</dd>
              <dt>선택한 시간</dt>
              <dt>13:30~16:18</dt>
            </dl>
          </div>
        </a>
      </li>
      <li class="step02 active">
        <a href="#">
          <string class="tit">
            <span>
              02
              <br>
              인원/좌석
            </span>
          </string>
          <div class="bx_con">
            <dl>
              <dt>선택한 인원</dt>
              <dd>뿅</dd>
              <dt>선택한 좌석</dt>
              <dt>뿅</dt>
            </dl>
          </div>
        </a>
      </li>
      <li class="step03">
        <a href="#">
          <string class="tit">
            <span>
              03
              <br>
              결제
            </span>
          </string>
          <div class="bx_con">
            <dl>
              <dt>티켓금액</dt>
              <dd>뿅</dd>
              <dt>할인금액</dt>
              <dt>뿅</dt>
              <dt>총합계</dt>
              <dt>뿅</dt>
            </dl>
          </div>
        </a>
      </li>
      <li class="step04">
        <a href="#">
          <string class="tit">
            <span>
              04
              <br>
              결제완료
            </span>
          </string>
          <div class="bx_con">
            <dl>
              <dt>선택한 영화 제목 </dt>
              <dd>영화 제목</dd>
              <dt>상영관</dt>
              <dd>00지점</dd>
              <dt>선택한 상영 날짜</dt>
              <dd>2024-05-24(금)</dd>
              <dt>선택한 시간</dt>
              <dt>13:30~16:18</dt>
            </dl>
          </div>
        </a>
      </li>
    </ul>
  </div>

  <div class="ps_section_step_con step02 active">
    <h3 class="hidden">인원/좌석</h3>
    <div class="article article_seat">
        <div class="group_top">
          <h4 class="tit">인원/좌석 선택</h4>
          <p class="txt">
            인원은 최대 8명까지 선택 가능합니다.
          </p>
      </div>
      <div class="ps_inner">
        <div id="PersonSeatCount">
          <div class="select_num_people_wrap">
            <!-- <h5 class="hidden">인원선택</h5> -->
            <div class="movie_infor">
              <h5 class="hidden">예매정보</h5>
              <span class="thm">
                <img src="https://cf.lottecinema.co.kr//Media/MovieFile/MovieImg/202405/21106_101_1.jpg" alt="">
              </span>
              <div class="group_infor">
                <div class="bx_tit">
    <span
      v-if="poster_viewage === 'all'">
      <img
      src="@/assets/posters/age/all.png" alt="">
    </span>
    <span
      v-if="poster_viewage === 'r12'">
      <img src="@/assets/posters/age/r12.png" alt="">
    </span>
    <span
      v-if="poster_viewage === 'r15'">
      <img src="@/assets/posters/age/r15.png" alt="">
    </span>
    <span
      v-if="poster_viewage === 'r19'">
      <img src="@/assets/posters/age/r19.png" alt="">
    </span>
                  <strong class="ml-2">{{ poster_name }}</strong>
                </div>
                <dl></dl>
                <dd class="sub_info1">
                  {{choice_date}}
                  <em>({{dayFormat(choice_date)}})</em>
                  <span class="time">
                    <span class="time_before"></span>
                    {{convertToShortTime(choice_time)}}
                    ~
                    {{endtime}}
                  </span>
                </dd>
                <dd class="sub_info1">
                  {{theater_city}}
                  {{theater_title}}
                  지점
                  ({{theater_name}})
                </dd>
              </div>
            </div>
            <div class="count_people">
              <h5 class="hidden">인원선택</h5>
              <ul>
                <li id="person_10" data-code="10"
              data-peple="성인"
              data-count="0">
                <strong class="tit">성인</strong>
                <span class="bx_num">
                <button class="btn_mins" @click="decrement">감소</button>
                <div class="txt_num">{{ counter }}</div>
                <button class="btn_plus" @click="increment">증가</button>
                </span>
              </li>

              <li id="person_20" data-code="20"
              data-peple="청소년"
              data-count="0">
                <strong class="tit">청소년</strong>
                <span class="bx_num">
                  <button class="btn_mins" @click="decrement2">감소</button>
                  <div class="txt_num">{{ counter2 }}</div>
                  <button class="btn_plus" @click="increment2">증가</button>
                </span>
              </li>
              </ul>

            </div>
          </div>

        </div>
        <div class="select_seat_wrap">
          <h5 class="hidden">좌석선택</h5>
          <div class="top_txt_info">
            <p id="ticketMessageInfo">
              - 인원을 선택하세요.
            </p>
          </div>
          <div id="PersonSeatSelect"></div>
          <div id="container" class="seat_wrap">
            <article class="mseat_wrap">
              <div class="mseat_inner">
<!-- 좌석 -->
<v-col class="pa-0 mb-12 ps_screen">S C R E E N</v-col>
<v-col class="pa-0 ps_tick_seat_content">
  <v-col
  v-for="(row, vIndex) of sample_array" :key="vIndex" class="pa-0 ma-0">
  <v-row class="pa-0 ma-0">
    <v-col
    v-for="(seat, hIndex) of row" :key="hIndex"
    :class="[
      (hIndex === 0 ? 'first-seat' : ''),
      seat,
      (blankList.includes(seat)) ? 'seat_blank' : null,
      (selectedSeats.includes(seat)) ? 'selected-seat' : '',
      (counter > 0 && selectedSeats.length >= counter && !selectedSeats.includes(seat) && hIndex !== 0 && seat !== 'ps_corridor') ? 'seat_area' : ''
    ]"
    class="pa-1 ma-1 ps_seatbox"
    >
      <span v-if="seat !== 'ps_corridor'"  @click="getSelectedSeatValue(seat)">{{ seat }}</span>
    </v-col>
  </v-row>
  </v-col>
</v-col>
<!-- 좌석 -->
              </div>
              <div class="seat_btm_box">
                <div class="seat_type_box">
                  <div class="top_info">
                    <span class="seat_type1">선택좌석</span>
                    <span class="seat_type2">선택가능 </span>
                    <span class="seat_type3">예매완료 </span>
                    <span class="seat_type4">선택불가</span>
                  </div>
                  <div class="btm_info">
                    <span class="seat_type5">스위트스팟 </span>
                    <span class="seat_type6">씨네커플 </span>
                    <span class="seat_type7">씨네패밀리 </span>
                    <span class="seat_type8">리클라이너석 </span>
                    <span class="seat_type9">장애인석 </span>
                    <span class="seat_type10">발받침 </span>
                    <span class="seat_type11">출입문</span>

                  </div>
                </div>
              </div>
            </article>
          </div>


        </div>
        <!-- 여기 결제  -->
        <div id="PersonSeatSummery">
          <div class="select_seat_result">
            <div class="group_lft">
              <dl class="total_price">
                <dt>총합계</dt>
                <dd>
                  <strong>{{calculatedPrice}}</strong>
                  원
                </dd>
              </dl>
            </div>
            <div class="group_rgt">
              <a
              @click="updateTicketing()"
              class="btn_col1" id="link_rpay">결제하기</a>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>


    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs';
// 한글 로케일 파일 로드(요일 한글화 위함)
import 'dayjs/locale/ko';
export default {
  data(){
    return{
      today : dayjs(),
      //오늘 날짜 기본 값
      pickDay:dayjs().format('YYYY-MM-DD'),

      ticketData:[],
      horizontalSeat:'',
      verticalSeat:'',
      blankList:[],

      user_id:this.$store.state.meData.id,

      poster_name:'',
      poster_viewage:'',
      poster_showtime:'',

      theater_city:'',
      theater_title:'',
      theater_name:'',

      choice_date:'',
      choice_time:'',
      endtime:'',

      sample_array:[],
      selectedSeats:[],

      counter:0,
      counter2:0,

      place:'',
      ticket_id:'',
      total_place:'',
    };
  },
  methods:{
    // 최대값 8까지 증가
    increment() {
      if (this.counter < 8) {
        this.counter++;
        this.selectedSeats = []
      }
    },
    // 최소값 0까지 감소
    decrement() {
      if (this.counter > 0) {
        this.counter--;
        this.selectedSeats = []
      }
    },
    increment2() {
      if (this.counter2 < 8) {
        this.counter2++;
      }
    },
    decrement2() {
      if (this.counter2 > 0) {
        this.counter2--;
      }
    },
    async updateTicketing(){
      let seat_array=[];
      for(let i = 0; i < this.selectedSeats.length;i++){
        seat_array.push(this.selectedSeats[i])
      }
      console.log(seat_array)
      let form = {
        id:this.ticket_id,
        personnel:Number(this.counter),
        seat:JSON.stringify(seat_array),
        total:this.calculatedPrice
      }
      console.log(form)

      await this.$store.dispatch('updateTicketing',form)
      .then((res) => {
        console.log(res)
        if(res){
          this.$router.push({name:'order',params:{id:this.ticket_id}})
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 유저 정보
    async userData(){
    await this.$store.dispatch('myData').then((res) =>{
      console.log(res)
    }).catch(() => {
      // console.error("로그인 정보가 없습니다.")
    })
  },
  //선택 영화 정보
    async getTicketing(){
      await this.$store.dispatch('getTicketing',{uid:this.user_id})
      .then((res) => {
        // console.log(res)
        this.ticketData = res.ticketings[0]
        // console.log(this.ticketData)
        console.log(this.ticketData)
        this.poster_name = this.ticketData.schedule.poster.name,
        this.poster_viewage = this.ticketData.schedule.poster.viewage,
        this.poster_showtime = this.ticketData.schedule.poster.showtime,
        this.theater_city = this.ticketData.schedule.theater.city,
        this.theater_title = this.ticketData.schedule.theater.title,
        this.theater_name = this.ticketData.schedule.theater.name
        this.choice_date = this.ticketData.schedule.date,
        this.choice_time = this.ticketData.schedule.time,
        this.place = this.ticketData.schedule.place,
        this.ticket_id = this.ticketData.id,

        //규모
        this.ratios = this.ticketData.schedule.theater.ratio.split('x')
        // console.log(this.ratios)
        this.horizontalSeat = Number(this.ratios[0])
        this.verticalSeat = Number(this.ratios[1])

        // 복도
        this.bokdoList = this.ticketData.schedule.theater.bokdo.split(',')
        // console.log(this.bokdoList)
        //빈공간
        this.blankList = this.ticketData.schedule.theater.blank.split(',')
        // console.log(this.blankList)

        this.changeSeatFormat();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    //종료시간
    endtimeMethod(){
      this.starttimeMs = this.convertToTimeMilliseconds(this.choice_time)
      this.showtimeMs = this.convertMinutesToMilliseconds(this.poster_showtime)
      this.endtimeMs = this.starttimeMs+this.showtimeMs
      this.endtime = this.convertMillisecondsToHHMM(this.endtimeMs)
    },
    //시간(00:00) => millisecond 변환
    convertToTimeMilliseconds(time) {
    const [hours, minutes] = time.split(':');
    return (parseInt(hours) * 60 * 60 * 1000) + (parseInt(minutes) * 60 * 1000);
  },
    //숫자(1) => 분으로 millisecond 변환
    convertMinutesToMilliseconds(minutes) {
    return minutes * 60 * 1000;
},
    dayFormat(date) {
      return dayjs(date).locale('ko').format("ddd");
    },
// 밀리초(ms)를 HH:mm 형식으로 변환
  convertMillisecondsToHHMM(milliseconds) {
  const totalMinutes = Math.floor(milliseconds / (60 * 1000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // 두 자릿수로 포맷팅
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
  },
  getSelectedSeatValue(seat) {
      if (this.selectedSeats.includes(seat)) {
        // 동일 좌석 클릭 시 선택 해제
        this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
      } else {
        // 새로운 좌석 클릭 시 선택, 선택된 좌석 수 제한
        if (this.selectedSeats.length < this.counter) {
          this.selectedSeats.push(seat);
        }
      }
    },
  //좌석
  totalSeat(){
    this.total_seat = Number(this.verticalSeat) * Number(this.horizontalSeat) - this.blankList.length
    // console.log(this.total_seat)
  },
  //좌석 값()
  generatedSeatValue(vIndex, hIndex) {
    return String.fromCharCode(65 + vIndex) + (hIndex + 1);
  },
  changeSeatFormat(){

  this.totalSeat();

  // 좌석 배치도 리스트
  let new_array =[]
  for(let yaxis = 0; yaxis < Number(this.verticalSeat) ; yaxis++){
    let vert = [String.fromCharCode(65 + yaxis)]; // 행 이름을 배열 맨 앞에 추가
  // let vert = []
  for(let xaxis = 0; xaxis < Number(this.horizontalSeat); xaxis++ ){

    if(this.bokdoList.includes(String(xaxis + 1))){
      vert.push('ps_corridor')
      vert.push(this.generatedSeatValue(yaxis, xaxis))
    }else{
      vert.push(this.generatedSeatValue(yaxis, xaxis))
    }
  }
  new_array.push(vert)
  }
  this.sample_array = new_array
  // console.log(this.sample_array)
  },
    //09:00:00.000 => 09:00로 변환
    convertToShortTime(longTime) {
      const [hours, minutes] = longTime.split(":");
      const shortTime = `${hours}:${minutes}`;
      return shortTime;
    },
    // 숫자를 1,000 단위로 콤마를 붙여서 문자열로 변환
    formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },

    //날짜 폼
    todayFormat(){
      return this.today.format("YYYY-MM-DD");
    },

  computed: {
    // 선택된 좌석 수에 따른 가격 계산 (1좌석당 1000원 예시)
    calculatedPrice() {
      this.total_place = this.selectedSeats.length * this.place;
      return this.formatNumberWithCommas(this.total_place);
    }
  },
  async mounted(){
    await this.getTicketing()
    this.endtimeMethod()
  }
}
</script>

<style lang="scss">
.mt_contents_full{
  min-width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  padding: 50px 0 0 0 !important;
  padding-bottom: 70px !important;

  background-color: #444;
  background-repeat: repeat-x !important;

}

.wrap_reserve{
  overflow: hidden;
  position: relative;
  width: 1280px;
  height: 870px;
  margin: 0 auto;
  background-color: #FFF;
}
.wrap_reserve .section_step_tit {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 78px;
}
.wrap_reserve .section_step_tit ul {
  height: 100%;
}
.wrap_reserve .section_step_tit ul li.prev {
  border-color: #333;
  border-bottom-color: #666;
  background-color: #333;
}
.wrap_reserve .section_step_tit ul li {
  position: relative;
  height: 25%;
  box-sizing: border-box;
  border: 1px solid #666;
  border-top: none;
  background-color: #FFF;
  z-index: 10;

  justify-content: center;
  display: grid;
  align-items: center;
  text-align: center;

  font-size: 14px;
  font-weight: 600;
  line-height: 2;
}
.wrap_reserve .section_step_tit ul li.prev > a {
  color: #FFF;
}
.wrap_reserve .section_step_tit ul li.active > a {
  color: #FFF ;

}
.wrap_reserve .section_step_tit ul li.active{
  border-color: #FF243E;
  border-bottom-color: #666;
  background-color: #FF243E;
}
.wrap_reserve .section_step_tit ul li > a {
  // display: block;
  // height: 100%;
  color: #666;
  // pointer-events: none; /* 클릭 불가 */
}
.wrap_reserve .section_step_tit ul li > a .bx_con{
display: none;
position: absolute;
z-index: 1;
left: 77px;
top: -1px;
bottom: 0;
width: 172px;
padding-left: 20px;
border-top: 1px solid #666;
background-color: #333;
}
.wrap_reserve .ps_section_step_con.active {
  display: block;
  overflow: inherit;
  position: relative;
  width: 1202px;
  height: 100%;
  margin-left: 78px;
}
.wrap_reserve .ps_section_step_con .article.article_seat {
  width: 1202px;
}
.wrap_reserve .ps_section_step_con .article {
  position: relative;
  float: left;
  height: 100%;
  box-sizing: border-box;
  background-color: #FFF;
}
.wrap_reserve .ps_section_step_con .article .group_top {
  overflow: hidden;
  position: relative;
  height: 55px;
  line-height: 55px;
  border-right: 1px solid #222;
  text-align: center;
  background-color: #000;
}
.wrap_reserve .ps_section_step_con .article .group_top .tit {
  font-size: 18px;
  color: #FFF;
}
.wrap_reserve .ps_section_step_con .article .group_top .txt {
  position: absolute;
  top: 5px;
  right: 30px;
  font-size: 13px;
  color: #fff;
}
.article.article_seat > .ps_inner {
  overflow: hidden;
  height: 815px;
}
.select_num_people_wrap {
  overflow: hidden;
  height: 117px;
  padding: 0 20px;
  background-color: #FFF;
}
.select_num_people_wrap .movie_infor {
  position: relative;
  float: left;
  // width: 270px;
  padding: 30px 0 0 54px;
}
.select_num_people_wrap .movie_infor .thm {
  display: block;
  overflow: hidden;
  position: absolute;
  top: 26px;
  left: 0;
  overflow: hidden;
  width: 46px;
  height: 65px;
  border-radius: 4px;
}
.select_num_people_wrap .movie_infor .thm img {
  width: 100%;
}
.select_num_people_wrap .movie_infor .group_infor .bx_tit {
  display: block;
  margin-bottom: 10px;
}
.select_num_people_wrap .movie_infor .group_infor dl dd.sub_info1 {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  font-size: 11px;
}
.select_num_people_wrap .movie_infor .group_infor dl dd.sub_info1 .time {
  position: relative;
  padding-left: 9px;
  margin-left: 10px;
}
.select_num_people_wrap .count_people {
  float: right;
  width: 350px;
  margin-top: 36px;
}
.select_num_people_wrap .count_people > ul > li:first-child {
  margin-left: 0;
}
.select_num_people_wrap .count_people > ul > li {
  float: left;
  margin-left: 20px;
}
.select_num_people_wrap .count_people > ul > li .tit {
  margin-right: 8px;
  font-size: 13px;
}
.select_num_people_wrap .count_people > ul > li .bx_num {
  display: inline-block;
  width: 100px;
}
.bx_num{
position: relative;
width: 105px;
border: 1px solid #DDD;
border-radius: 4px;
background-color: #fff;
box-sizing: border-box;
}
.bx_num .btn_mins {
  left: 0;
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/minus_12.png);
}
.bx_num .btn_plus {
  right: 0;
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/plus_12.png)
}
.btn_plus, .btn_mins {
  position: absolute;
  top: 0;
  bottom: 0;
  background: no-repeat 50% 50%;
  border: 0 none;
  padding: 0 15px;
  text-indent: -9999em;
  font: 0 auto;
}
.bx_num .txt_num {
  padding: 11px 0;
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: bold;
  color: #000;
  text-align: center;
  vertical-align: middle;
}
.select_num_people_wrap .movie_infor .group_infor .bx_tit strong {
  font-size: 17px;
}
.sub_info1{
display: block;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
margin-bottom: 5px;
font-size: 11px;
}
.time_before{
content: "";
display: block;
position: absolute;
top: 3px;
left: 0;
width: 1px;
height: 10px;
background: #ddd;
}
// 좌석선택
.select_seat_wrap{
overflow: hidden;
height: 638px;
color: #FFF;
background-color: #000;
}
.select_seat_wrap .top_txt_info {
  margin: 15px 0 25px;
  text-align: center;
}
.select_seat_wrap .top_txt_info p {
  position: relative;
  display: inline-block;
  padding-left: 9px;
  color: #fff;
  font-size: 11px;
}
.seat_wrap {
padding-top: 0 !important;
}
.mseat_wrap {
  position: relative;
  background: #000;
  /* padding-top: 150px; */
}
.mseat_inner {
  overflow: hidden;
  width: 1200px;
  height: 470px !important;
  max-height: 470px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 15px;
}
.seat_btm_box {
  // overflow: hidden;
  margin: 35px 0 0 40px;
}
.seat_btm_box .seat_type_box {
  width: 690px;
}
.seat_btm_box .seat_type_box {
  float: left;
  width: 615px;
}
.seat_btm_box .seat_type_box .top_info {
  margin-bottom: 15px;
}
span.seat_type1 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type1.png) no-repeat 0 4px;
}
span.seat_type2 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type2.png) no-repeat 0 4px;
}
span.seat_type3 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type3.png) no-repeat 0 4px;
}
span.seat_type4 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type4.png) no-repeat 0 4px;
}
span.seat_type5 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type5.png) no-repeat 0 4px;
}
span.seat_type6 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type6.png) no-repeat 0 4px;
}
span.seat_type7 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type7.png) no-repeat 0 4px;
}
span.seat_type8 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type8.png) no-repeat 0 4px;
}
span.seat_type9 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type9.png) no-repeat 0 4px;
}
span.seat_type10 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type10.png) no-repeat 0 4px;
}
span.seat_type11 {
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_seat_type11.png) no-repeat 0 4px;
}
.seat_btm_box .seat_type_box span {
  padding-left: 17px;
  margin-left: 6px;
}
// 결제
.select_seat_result {
  overflow: hidden;
  height: 60px;
  color: #FFF;
  background-color: #888;
}
.select_seat_result .group_lft {
  float: left;
}
.select_seat_result dl {
  padding: 16px 0 0 30px;
}
dl.total_price dt {
  float: left;
  padding: 6px 12px 0 0;
  font-size: 15px;
}
dl.total_price dd {
  float: left;
  font-size: 15px;
}
dl.total_price dd strong {
  font-family: 'Roboto';
  font-size: 25px;
  font-weight: bold;
}
.select_seat_result .group_rgt {
  float: right;
}
.select_seat_result a {
float: left;
width: 180px;
height: 60px;
line-height: 60px;
border-radius: 0;
border: none;
font-size: 15px;
}
.btn_col1 {
display: inline-block;
box-sizing: border-box;
border-radius: 4px;
border: 1px solid #FF243E;
font-size: 14px;
color: #ffffff !important;
text-align: center;
vertical-align: middle;
background-color: #FF243E;
}
.ps_tick_seat_content{
  margin-top: 70px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: grid;
  min-height: auto !important;
  max-height: auto !important;
}
.ps_screen{
  // position: relative;
  // z-index: 1;
  // color: #bdbdbd;
  // letter-spacing: 5px;
  // background: none;

  display: block;
  padding: 5px 0 5px;
  color: #fff;
  font-size: 16px;
  font-family: 'Roboto', "Noto Sans KR";
  text-align: center;
  letter-spacing: 15px;
  margin: 0 0 30px;
  background: #6E6E6E;
  line-height: 2;
}
.ps_seatbox{
min-width: 1px !important;
max-width: 26px !important;
width: 19px ;
height: 17px;
border: 1px solid black;
border-top-left-radius: 8px;
border-top-right-radius: 8px;
// text-align: center;
opacity: 1;
background: #E8E8E8;
color: black;

  > span{
  cursor: pointer;
  font-size: 10px;
  display: flex;
    /* text-indent: -3px; */
    /* text-align: center; */
    justify-content: center;
    align-items: center;
  }

  &.seat_blank {
  opacity: 0;
  }
}

.ps_corridor{
opacity: 0;
}
.first-seat {
  /* 원하는 스타일을 여기에 추가하세요 */
  font-weight: bold; /* 예: 글자 굵게 */
  background-color: black; /* 예: 배경색 변경 */
  color: white;

  left: 330px;
  position: absolute;
}
.seat_area {
  overflow: hidden;
  text-indent: -7000000em;
  font-size: 0;
  line-height: 0;
  cursor: inherit;
  background: #e8e8e8 url(https://www.lottecinema.co.kr/NLCHS/Content/images/common/seat_no_select.png) no-repeat center center;
  background-size: 28px 21px;
  opacity: 0.5;/* 선택되지 않은 좌석 반투명 처리 */
  pointer-events: none; /* 클릭 불가 */
}
.selected-seat{
  background-color: #FF243E;
  color: white;
}

.bx_num {
  display: flex;
  align-items: center;
}

.btn_mins,
.btn_plus {
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.btn_mins:disabled,
.btn_plus:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.txt_num {
  margin: 0 10px;
  // width: 20px;
  text-align: center;
}
</style>

