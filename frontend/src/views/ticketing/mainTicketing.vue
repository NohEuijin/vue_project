<template>
  <div class=" mt_contents_full">
    <div class=" wrap_reserve ty2">
      <h2 class="d-none">예매하기</h2>
      <ul class="mt_tab_wrap outer ty2">
        <li class="">
          <button type="button" class="mt_tab_tit">
            <span>영화관별 상영시간표</span>
          </button>
          <div class=" mt_tab_con">
            <h2 class="d-none">영화관별 상영시간표</h2>
            <div id="reserveCateCinema" class=" section_step_con active">
              <h2 class="d-none">상영시간</h2>
              <div class=" article article_cinema">
                <div class=" group_top">
                  <h4 class="tit">가산디지털</h4>
                </div>
                <div class="d-flex mt_inner">

                  <v-col cols="6" class="cinema_select_wrap">
                    <ul>
                      <!-- 지역 리스트 시작  -->
                      <li class="depth1">
                        <a href="#">
                          서울
                          <em>(0)</em>
                        </a>
                      </li>
                      <!-- 지역 리스트 끝  -->
                    </ul>
                  </v-col>

                  <v-col cols="6" class="cinema_select_wrap2">
                    <ul>
                      <!-- 지점 리스트 시작  -->
                      <li class="depth2">
                        <a href="#">
                          가산디지털
                        </a>
                      </li>
                      <li class="depth2">
                        <a href="#">
                          가산디지털
                        </a>
                      </li>
                      <li class="depth2">
                        <a href="#">
                          가산디지털
                        </a>
                      </li>
                      <li class="depth2">
                        <a href="#">
                          가산디지털
                        </a>
                      </li>
                      <li class="depth2">
                        <a href="#">
                          가산디지털
                        </a>
                      </li>

                      <!-- 지점 리스트 끝  -->
                    </ul>
                  </v-col>

                </div>


              </div>


              <div class=" article article_time area__movingbar litype6_time">
                <div class="group_top">
                  <h4 class="tit"> {{pickDay}}(오늘)</h4>
                </div>
                <div class="mt_inner">
                  <div class="date_select_wrap bdr dateReserveWrap">
                    <div class="slide_wrap slide_reserve_date_wide">
                      <ul class="mt_owl-carousel owl-loaded owl-drag">
                        <div class="owl-stage-outer">
                        <div class="mt_owl-stage"
                        :style="{ transform: `translate3d(${translateValue}px, 0, 0)`, transition: 'transform 0.25s ease' }">
                          <div
                          class="mt_owl-item"
                          v-for="(date, index) in convertDates" :key="index"
                          >
                            <li class="item">
                              <strong class="month"
                              v-if="shouldDisplayMonth(date)"
                              >
                                {{monthFormat(date)}} 월
                              </strong>
                              <a href="#" class="date">
                                <label :for="'radioDate' + index">
                                  <input
                                  type="radio"
                                  :id="'radioDate' + index"
                                  name="radioDate"
                                  data-displayyn="Y"
                                  data-playdate="date"
                                  data-isplaydate="Y"
                                  data-playweek="오늘"
                                  :v-model="pickDay"
                                  @click="pickDayMovie(date)"
                                  :checked="index === 0">
                                  <strong :class="dayClass(date)">
                                  {{ dayFormat(date) }}
                                  </strong>
                                  <em :class="dayClass(date)">{{dayOfWeekFormat(date)}}
                                  </em>
                                </label>
                              </a>
                            </li>

                          </div>

                        </div>
                      </div>

            <div class="owl-nav">
              <button type="button" role="presentation" class="owl-prev" @click="moveSlide('prev')">
                <span aria-label="Previous">‹</span>
              </button>
              <button type="button" role="presentation" class="owl-next" @click="moveSlide('next')">
                <span aria-label="Next">›</span>
              </button>
            </div>
                      </ul>


                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </li>





        <li class="">
          <button type="button" class="mt_tab_tit2">
            <span>영화관별 상영시간표</span>
          </button>
        </li>

      </ul>
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
      convertDate:'',
      convertDates:[],
      translateValue:0,
      //오늘 날짜 기본 값
      pickDay:dayjs().format('YYYY-MM-DD'),
    };
  },
  methods:{
    pickDayMovie(date){
      // console.log(date)
      this.pickDay=date
      console.log(this.pickDay)
    },
    //오늘 ~ 1달간 날짜
    viewDay(){
      let monthsDay = 30;
      const today = dayjs().format('YYYY-MM-DD');

      for(let i=0;i<monthsDay;i++){
        this.convertDate = dayjs(today).add(i,'day').format('YYYY-MM-DD')
        this.convertDates.push(this.convertDate);
      }
      console.log(this.convertDates)

    },
    //날짜 폼
    todayFormat(){
      return this.today.format("YYYY-MM-DD");
    },
    dayFormat(date){
      return dayjs(date).format("DD");
    },
    //요일 한글 폼(오늘 날짜 = 받아온 오늘 날짜 = 오늘)
    dayOfWeekFormat(date) {
      if(dayjs().format('YYYY-MM-DD') === date){
        return '오늘'
      }
      return dayjs(date).locale('ko').format("ddd");
    },
    //주말 칼라
    dayClass(date) {
      const dayOfWeek = this.dayOfWeekFormat(date);
      if (dayOfWeek === '토') {
        return 'blue'; // 토요일은 파란색 클래스 적용
      } else if (dayOfWeek === '일') {
        return 'red'; // 일요일은 빨간색 클래스 적용
      } else {
        return ''; // 나머지 요일은 클래스 없음
      }
    },
    monthFormat(date){
      //형식화된 월 문자열을 숫자로 변환.
      //이 과정에서 앞의 0이 제거 (5, 6 등).
      return String(Number(dayjs(date).format("MM")));
    },
    //오늘날짜, 매월 1일 체크
    shouldDisplayMonth(date) {
    const isFirstDayOfMonth = dayjs(date).date() === 1;
    const isToday = dayjs(date).isSame(this.today, 'day');
    return isFirstDayOfMonth || isToday;
  },
  //좌우 이동
    moveSlide(direction) {
      const slideWidth = 855; //이동될 넓이 길이
        if (direction === 'prev') {
          this.translateValue += slideWidth;
          if (this.translateValue > 0){
            this.translateValue = 0;
          }
        } else {
          this.translateValue -= slideWidth;
          const minValue = -(slideWidth);
          // 이전 또는 다음 클릭시, 슬라이드가 몇 개씩 이동하는지를 조정
          if (this.translateValue < minValue){
            this.translateValue = minValue;
          }
        }
      },
  },
  computed: {
      numSlides() {
        return this.convertDates.length;
        //클래스의 길이 만큼 이동
      }
  },
  mounted(){
    this.viewDay();
  }
}
</script>

<style>
.blue {
  color: blue;
}
.red {
  color: red;
}
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
.mt_tab_tit{
  width: 50%;
  left: 0%;

  border-bottom: none;
  background-color: #FF243E;

  height: 50px;
  line-height: 50px;
  font-size: 15px;
  color: #7F7F7F;

  border: none;

  position: absolute;
  top: 0;
}
.mt_tab_tit2{
  width: 50%;
  left: 50%;

  border-bottom: none;
  background-color: black;

  height: 50px;
  line-height: 50px;
  font-size: 15px;
  color: #7F7F7F;

  border: none;

  position: absolute;
  top: 0;
}
.mt_tab_tit span, .mt_tab_tit2 span{
  color: #FFF;
}
.section_step_con {
    width: 100%;
    margin-left: 0;
}
.mt_tab_wrap.outer{
  padding-top: 50px;
}
.section_step_con.active {
    display: block;
    overflow: inherit;
    /* position: relative; */
    width: 1300px;
    height: 100%;
    /* margin-left: 78px; */
}
.article.article_cinema {
    width: 351px;
    border-bottom: 1px solid #DDD;
}
.section_step_con .article {
    /* position: relative; */
    float: left;
    height: 100%;
    box-sizing: border-box;
    background-color: #FFF;
}
.group_top {
    border-right-color: #CCC;
    background-color: #E2E2E2;

    /* overflow: hidden; */
    line-height: 55px;
    border-right: 1px solid #c7c7c7;
    text-align: center;

}
.group_top .tit{
  font-size: 18px;
}
.cinema_select_wrap {
    background-color: #F5F5F5;
    width: 172px;
}
.cinema_select_wrap {
    /* position: relative; */
    height: 100%;
    /* background-color: #FFF; */
}
.cinema_select_wrap2 {
    width: 100px;
    /* position: relative; */
    height: 100%;
    background-color: #FFF;
}

.depth1 a{
  /* margin-top:5px; */
  font-family: 'NEXON Lv1 Gothic OTF';
}
.depth1{
  width: 175px;
  height: 35px;
  justify-content: center;
  align-items: center;
  /* margin-left: 10px; */
  padding: 15px 18px;
  /* text-align: center; */
}
.depth2{
  font-family: 'NEXON Lv1 Gothic OTF';
  width: 175px;
  height: 35px;
  justify-content: center;
  align-items: center;
  /* margin-left: 10px; */
  padding: 15px 18px;
  /* text-align: center; */
}
.depth1.active a {
    background: #FFF url(../../Content/images/icon/check.png) no-repeat 150px 2px;
}
.depth1 em {
    font-size: 10px;
    color: #666;
}
.article_cinema .inner {
    /* overflow: hidden; */
    height: 815px;
    border-right: 1px solid #DDD;
}
.mt_inner{
  height: 815px;
  border-right: 1px solid #DDD;

  font-size: 14px;

}
/* 오른쪽 */
.article.article_time {
    width: 930px;
}
.date_select_wrap {
    margin-bottom: 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #EEE;

    /* position: relative; */
    /* float: left; */
    /* overflow: hidden; */
    /* height: 75px; */
    margin: 22px 20px 10px;
}

.slide_wrap {
    position: relative;
}
.mt_owl-stage{
  /* transform: translate3d(0px, 0px, 0px);
  transition: all 0s ease 0s; */
  width: 1750px;
}
.owl-stage-outer {
  /* position: relative; */
  overflow: hidden;
}
.owl-stage-outer .mt_owl-stage {
  /* position: relative; */
  /* touch-action: manipulation; */
}
.owl-stage-outer .mt_owl-item{
  float: left;
  position: relative;
  touch-action: manipulation;
  /* width: 184px;
  margin-right: 15px; */

  /* flex: 0 0 auto; */
}
.mt_owl-item{
  width: 58px;

  touch-action: pan-y;
  user-select: none;

  float: left;
  display: block;
  min-height: 1px;
}
.item .month {
  position: absolute;
  top: -5px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 10px;

  /* font-family: 'ChosunSg'; */
}
.mt_owl-item .a {
  display: block;
  position: relative;
  padding-top: 20px;
}
.mt_owl-item label {
    display: block;
    cursor: pointer;

    font-family: 'ChosunSg';
}
.mt_owl-item input[type="radio"] {
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
}
.mt_owl-item input[type="radio"]:checked + strong {
  font-weight: bold;
  color: #fff;
  background: #000;
}
.mt_owl-item strong {
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  border-radius: 50%;
  font-family: 'Roboto';
  font-size: 15px;
  text-align: center;
}
.mt_owl-item .date {
    display: block;
    position: relative;
    padding-top: 20px;
}
.mt_owl-item em {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
}
.mt_owl-carousel {
    position: relative;
    display: block;
    width: auto;
    margin: 0 auto;
    padding: 0;
    list-style: none;
    z-index: 1;
}
 /* 포스트 네비 바 */
 .mt_owl-carousel .owl-nav{
  position: static;
  height: 19px;
  margin-top: -10px;
}

.mt_owl-carousel .owl-prev{
  background: url(@/assets/posters/arrow/ticket_prev.png) no-repeat 50% 50%;
  top: 60%;
  left: -15px;
  width: 19px;
  height: 35px;
  opacity: .5;

  position: absolute;
  margin-top: -20px;
}

.mt_owl-carousel .owl-nav span {
    font-size: 0;
    text-indent: -9999em;
}

.mt_owl-carousel .owl-next{
  top: 60%;
  right: -15px;
  background: url(@/assets/posters/arrow/ticket_next.png) no-repeat 50% 50%;
  width: 19px;
  height: 35px;
  opacity: .5;

  position: absolute;
  margin-top: -20px;
}

</style>
