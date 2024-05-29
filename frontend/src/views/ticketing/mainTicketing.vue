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
            <div id="reserveCateCinema" class=" mt_section_step_con active">
              <h2 class="d-none">상영시간</h2>
              <div class=" article article_cinema">
                <div class=" group_top">
                  <h4 class="tit">{{ selected_title }}</h4>
                </div>
                <div class="d-flex mt_inner">

                  <v-col cols="6" class="pa-0 cinema_select_wrap">
                    <ul
                    v-for="(city,index) in city_list" :key="index">
                      <!-- 지역 리스트 시작  -->
                      <li class="depth1">
                        <a
                        class=""
                        :class="[{'active' : city.value === this.selected_city}]"
                        @click="citySelect(city.value)"
                        >
                          {{ city.title }}
                          <em>({{getTheaterCount(city.value)}})</em>
                        </a>
                      </li>
                      <!-- 지역 리스트 끝  -->
                    </ul>
                  </v-col>

                  <v-col cols="6" class="pa-0 cinema_select_wrap2">
                    <ul
                    v-for="(theater,index) in filtered_title_list" :key="index"
                    >
                      <!-- 지점 리스트 시작  -->
                      <li class="depth2">
                        <a
                        :class="[{'active' : theater.value === this.selected_title }]"
                        @click="titleSelect(theater.value)"
                        >
                          {{ theater.title }}
                        </a>
                      </li>
                      <!-- 지점 리스트 끝  -->
                    </ul>
                  </v-col>

                </div>


              </div>


              <div class=" article article_time area__movingbar litype6_time">
                <div class="group_top">
                  <h4 class="tit">
                    {{pickDay}}({{dayOfWeekFormat(pickDay)}})
                  </h4>
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
  v-for="(date, index) in convertDates" :key="index">

  <li class="item">
    <strong class="month"
      v-if="shouldDisplayMonth(date)">
        {{monthFormat(date)}} 월
    </strong>
    <a href="#" class="date">
      <label
      :class="[{ 'date_blank' : isDateBlank[index]}, isDateBlank[index] ? '' : dayClass(date)]"
      :for="'radioDate' + index">
        <input
        type="radio"
        :id="'radioDate' + index"
        @click="pickDayMovie(date)"
        :v-model="pickDay"
        :checked="index === 0"
        name="radioDate"
        data-displayyn="Y"
        data-playdate="date"
        data-isplaydate="Y"
        data-playweek="오늘">
        <strong :class="[ { 'date_blank': isDateBlank[index] }, isDateBlank[index] ? '' : dayClass(date) ]">
        {{ dayFormat(date) }}
        </strong>
        <em :class="[ { 'date_blank': isDateBlank[index] }, isDateBlank[index] ? '' : dayClass(date) ]">
          {{dayOfWeekFormat(date)}}
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

    <ul class="tab_wrap outer sml actionmovingbar">
      <li v-for="(tab, index) in tabs" :key="index">
        <button type="button"
        class="tab_tit"
        :class="{ active: activeIndex === index }"
        @click="setActiveTab(index)">
          <span>{{ tab }}</span>
        </button>
      </li>
      <li class="wrap_nav_underline">
        <span class="nav_underline" :style="underlineStyle"></span>
      </li>
    </ul>

    <div>
      <v-card
    class="pb-12 overflow-y-auto mt_outer_card"
    max-height="600"
    v-scroll.self="onScroll">
    <v-card-text
    class="pb-0 pa-6 pt-0"
    v-for="(filteredPoster, i) in filteredPosterList" :key="i">

    <!-- 영화 리스트 시작 -->
    <div class="group_time_select"
     v-if="getSchedulesForPoster(filteredPoster.name).length > 0">
      <div class="time_select_tit">
        <span class="mr-1 ic_grade"
          v-if="filteredPoster.viewage === 'all'">
        <img src="@/assets/posters/age/all.png" alt="">
        </span>
        <span class="mr-1 ic_grade"
           v-if="filteredPoster.viewage === 'r12'">
        <img src="@/assets/posters/age/r12.png" alt="">
         </span>
        <span class="mr-1 ic_grade"
          v-if="filteredPoster.viewage === 'r15'">
         <img src="@/assets/posters/age/r15.png" alt="">
        </span>
        <span class="mr-1 ic_grade"
          v-if="filteredPoster.viewage === 'r19'">
        <img src="@/assets/posters/age/r19.png" alt="">

        </span>
          <strong>{{ filteredPoster.name }}</strong>
        </div>

        <div class="time_select_wrap timeSelect">
          <ul class="list_hall">
            <li>2D</li>
            <!-- <li>
              <span class="etc_span">Ι</span>
              4관 세스코안심존 / 씨네컴포트(리클라이너)
            </li> -->
            <li class="after"></li>
          </ul>

          <ul class="list_time">
            <!-- 상영시간 리스트 시작 -->
            <li v-for="(schedule, i) in getSchedulesForPoster(filteredPoster.name)" :key="i">
              <a
              role="button"
              class="tooltip-container"
              @click="clickDialog(schedule)">
                <dl>
                  <dt>상영시간</dt>
                  <dd class="time">
                    <strong>{{ convertToShortTime(schedule.time) }}</strong>
                    <div class="tooltip">
                      종료 {{endtimeMethod(schedule.time,schedule.poster.showtime)}}
                    </div>
                  </dd>
                  <dt>잔여석</dt>
                  <dd class="seat">
                    <strong>{{ schedule.theater.total }}</strong>
                    / {{ schedule.theater.total }}
                  </dd>
                  <dt>상영관</dt>
                  <dd class="hall">{{ schedule.theater.name }}</dd>
                </dl>
              </a>
            </li>
            <!-- 상영시간 리스트 끝 -->
    <v-dialog width="auto" scrollable v-model="dialogArr.dialog">
        <v-card>
          <v-col class=" pa-0">
            <v-col
            class="md_main_title">
              {{ convertToShortTime(dialogArr.contents.time)}}~{{ endtimeMethod(dialogArr.contents.time,dialogArr.contents.poster.showtime)}}({{ dialogArr.contents.theater.name }})
            </v-col>
            <v-btn
            class="md_btn_close"
            icon="mdi-window-close"
            color="white"
            rounded="sm"
            variant="text"
            size="large"
            density="compact"
            hide-details="true"
            @click="dialogArr.dialog = false"
            >
            </v-btn>
          </v-col>

          <!-- <v-divider class="mt-3"></v-divider> -->

          <v-card-text class="text-center px-4 modal_frame" >
            <v-col class=" remain_seat">
              잔여좌석<strong>{{ dialogArr.contents.theater.total }}</strong>/{{ dialogArr.contents.theater.total }}
            </v-col>
            <v-col class="md_screen">SCREEN</v-col>

<v-col class="tick_seat_content">
<!-- 좌석 -->
<v-col
v-for="(row, vIndex) of sample_array" :key="vIndex" class="pa-0 ma-0">
<v-row class="pa-0 ma-0">
  <v-col
  v-for="(seat, hIndex) of row" :key="hIndex"
  :class="[seat, (blankList.includes(seat)) ? 'tick_seatbox_blank' : null]"
    class="tick_seatbox">
    <span v-if="seat !== 'corridor'">
      {{ seat }}
    </span>
  </v-col>
</v-row>
</v-col>
<!-- 좌석 -->
</v-col>

            <v-col class="md_txt_notice">
              <p class="tit">
                <span class="mt_card_age">
    <span
      v-if="dialogArr.contents.poster.viewage === 'all'">
      <img
      src="@/assets/posters/age/all.png" alt="">
    </span>
    <span
      v-if="dialogArr.contents.poster.viewage === 'r12'">
      <img src="@/assets/posters/age/r12.png" alt="">
    </span>
    <span
      v-if="dialogArr.contents.poster.viewage === 'r15'">
      <img src="@/assets/posters/age/r15.png" alt="">
    </span>
    <span
      v-if="dialogArr.contents.poster.viewage === 'r19'">
      <img src="@/assets/posters/age/r19.png" alt="">
    </span>
                </span>
                본영화는
                <strong>만 15세 이상 관람가</strong>
                영화입니다.
              </p>
            <p class="txt">
              <span>만 15세 미만의 고객님(영, 유아 포함)은 반드시 부모님 또는 성인 보호자의 동반하에
              <br>
              관람이 가능합니다. 연령 확인 불가 시 입장이 제한될 수 있습니다.
              </span>
            </p>

            </v-col>

          </v-card-text>

          <!-- v-divider요소는 목록이나 레이아웃의 섹션을 구분하는 데 사용 -->
          <!-- <v-divider class="border-opacity-100" color="success"></v-divider> -->

          <v-card-actions class="md_btn_box">
            <v-btn
              class="md_cansle_btn"
              text="취소"
              variant="elevated"
              @click="dialogArr.dialog = false"
            ></v-btn>
            <v-btn
              class="md_select_btn"
              color="surface-variant"
              text="인원/좌석 선택"
              variant="elevated"
              @click="createTicketing()"
            ></v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
          </ul>

        </div>
        <div>

        </div>
      </div>

      <!-- 영화 리스트 끝 -->

    </v-card-text>
    <div
    class="bx_notice"
    v-if="this.ticketSchedules.length ==0">
    <div>조회 가능한 상영시간이 없습니다.</div>
    <div>조건을 변경해주세요.</div>
    </div>
  </v-card>

    </div>
                </div>
              </div>


            </div>
          </div>
        </li>

        <li class="">
          <button type="button" class="mt_tab_tit2">
            <span>영화별 상영시간표</span>
          </button>
        </li>

      </ul>
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs';
import listup from '@/assets/data/theater.json';
// 한글 로케일 파일 로드(요일 한글화 위함)
import 'dayjs/locale/ko';
export default {
  data(){
    return{
      dialogArr :{
        dialog: false,
        title:"",
        contents:""
      },
      today : dayjs(),
      convertDate:'',
      convertDates:[],
      translateValue:0,
      //오늘 날짜 기본 값
      pickDay:dayjs().format('YYYY-MM-DD'),
      activeIndex:0,
      tabs:['전체',' 추후 예정1','추후 예정2'],
      tabs_select:'',
      scrollInvoked: 0,
      city_list : listup.location2,
      theater : listup.theater,
      city_choice:'',
      title_choice:'',
      selected_city:'서울',
      selected_title:'가산디지털',
      theater_counts: [],
      ticketSchedules:[],
      posterList:[],
      filteredPosterList:[],
      matchedSchedules: [],
      isDateBlank: [],

      lodingTime:300,
      lodingTimer:null,

      dialog: '',

      sample_array:[],

      pickTheater:'',
      pickTheater_id:'',
      horizontalSeat:'',
      verticalSeat:'',
      blankList:[],


      user_id:this.$store.state.meData.id,

    };
  },
  methods:{
    async userData(){
    await store.dispatch('myData').then((res) =>{
      console.log(res)
    }).catch(() => {
      // console.error("로그인 정보가 없습니다.")
    })
  },
    async createTicketing(){
      let form = {
        // city:this.selected_city,
        // title:this.selected_title,
        // theater:this.pickTheater.theater.name,
        // date:this.pickDay,
        // time:this.pickTheater.time,
        // seat:"",
        // personnel:"",
        userId:this.user_id,
        scheduleId:this.pickTheater_id
      }
      console.log(form)
      // console.log(this.user_id)

      await this.$store.dispatch('createTicketing',form)
      .then((res) => {
        console.log(res)
        if(res){
          this.$router.push({name:'personSeat',params:{id:this.user_id}})
        }

      })
      .catch((err) => {
        console.log(err)
      })
    },
    endtimeMethod(t,st){
      /*
      시작시간(MM:mm),상영시간(분(number)) => ms 변환
      endtime = 종료 시간 반환
      */
      this.starttimeMs = this.convertToTimeMilliseconds(t)
      this.showtimeMs = this.convertMinutesToMilliseconds(st)
      this.endtimeMs = this.starttimeMs+this.showtimeMs
      this.endtime = this.convertMillisecondsToHHMM(this.endtimeMs)
      // console.log(this.endtime)
      return this.endtime
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

let vert = []
for(let xaxis = 0; xaxis < Number(this.horizontalSeat); xaxis++ ){

  if(this.bokdoList.includes(String(xaxis + 1))){
    vert.push('corridor')
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
    clickDialog(el){
      this.dialogArr.dialog = true
      this.dialogArr.contents = el
      this.dialogArr.title = "테스트입니다."


      this.pickTheater = this.dialogArr.contents
      // console.log(this.pickTheater.theater.name)
      // console.log(this.pickTheater.time)
      // console.log(this.pickTheater.id)
      this.pickTheater_id = this.pickTheater.id
      // console.log(this.pickTheater_id)

      //규모
      this.ratios = this.pickTheater.theater.ratio.split('x')
      this.horizontalSeat = Number(this.ratios[0])
      this.verticalSeat = Number(this.ratios[1])

      // 복도
      this.bokdoList = this.pickTheater.theater.bokdo.split(',')
      // console.log(this.bokdoList)
      //빈공간
      this.blankList = this.pickTheater.theater.blank.split(',')
      // console.log(this.blankList)

      this.changeSeatFormat();
    },

    calculateTheaterCounts() {
      for (let i = 0; i < this.city_list.length; i++) {
        const city = this.city_list[i];
        const cityValue = city.value;
        if (this.theater[cityValue]) {
          this.theater_counts[cityValue] = this.theater[cityValue].length;
        } else {
          this.theater_counts[cityValue] = 0;
        }
      }
    },
    getTheaterCount(cityValue){
      return this.theater_counts[cityValue] || 0;
    },
    citySelect(cityValue) {
      this.selected_city = cityValue;
      // console.log(this.selected_city)
    },
    titleSelect(titleValue) {
      clearTimeout(this.lodingTimer);
      this.lodingTimer = setTimeout(() => {
        this.selected_title = titleValue;
        //날짜 뿌리고 -> 해당 날짜 가져와서 영화 뿌리고,
        this.viewDay();
        this.pickDayMovie(this.todayFormat());
        this.lodingTimer = null;
      },this.lodingTime)
    },
    setupList(){
      // console.log(this.city_list)
      // console.log(this.theater)


    },
    //09:00:00.000 => 09:00로 변환
    convertToShortTime(longTime) {
      const [hours, minutes] = longTime.split(":");
      const shortTime = `${hours}:${minutes}`;
      return shortTime;
    },
    //스케이줄 가져오기
    async getTicketingSchedules(){
      let form = {
        city:this.selected_city,
        title:this.selected_title,
        date:this.pickDay,
        sortCondition:'time:asc'
      }
      // console.log(form)

      await this.$store.dispatch('ticketingSchedules',form)
      .then((res) => {
        // console.log(res)
        this.ticketSchedules = res.schedules
        // console.log(this.ticketSchedules)

        this.matchSchedules();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    //더블체크를 위한 영화 정보 가져오기
    async getposterNowShowtime(){
      await this.$store.dispatch('posterNowShowtime')
      .then((res) => {
        // console.log(res)
        this.posterList = res.posters

        // pickDay가 starttime과 endtime 사이에 있는 포스터만 필터링
        const filteredPosters = this.posterList.filter(
          poster => {
            const starttime = new Date(poster.starttime);
            const endtime = new Date(poster.endtime);
            const pickDay = new Date(this.pickDay);

          return pickDay >= starttime && pickDay <= endtime;
      });
      // console.log(filteredPosters);

      let new_array = [];
      for(let i =0; i < filteredPosters.length; i++){
        const filterList = {

          name : filteredPosters[i].name,
          viewage : filteredPosters[i].viewage,
        }
        new_array.push(filterList);
      }

      this.filteredPosterList = new_array;
      // console.log(this.filteredPosterList)


      this.matchSchedules();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    matchSchedules() {
      this.matchedSchedules = this.ticketSchedules.filter(schedule => {
        return this.filteredPosterList.some(poster => poster.name === schedule.poster.name);
      });
    },
    getSchedulesForPoster(posterName) {
      return this.matchedSchedules.filter(schedule => schedule.poster.name === posterName);
    },
    //스크롤
    onScroll () {
        this.scrollInvoked++
      },
     // 클릭된 탭의 인덱스를 설정.
    setActiveTab(index) {
      this.activeIndex = index;
      // console.log(this.tabs[index])
      this.tabs_select = this.tabs[index]
    },
    //선택 날짜 받기 -> 날짜 클릭 -> 데이터 퐝
    async pickDayMovie(date){
      // console.log(date)
      this.pickDay=date
      // console.log(this.pickDay)

      let form = {
        theatercity:this.selected_city,
        theatertitle:this.selected_title,
        date:this.pickDay,
        sortCondition:'time:asc'
      }

      // console.log(form)

      await this.$store.dispatch('ticketingSchedules',form)
      .then((res) => {
        // console.log(res)
        this.ticketSchedules = res.schedules
        // console.log(this.ticketSchedules.length)
        this.matchSchedules();

      })
      .catch((err) => {
        console.log(err)
      })

    },
    //오늘 ~ 1달간 날짜
    async viewDay(){
      let monthsDay = 30;
      const today = dayjs().format('YYYY-MM-DD');
      this.convertDates = []; // convertDates 초기화
      this.isDateBlank = []; // isDateBlank 초기화

      for(let i=0;i<monthsDay;i++){
        this.convertDate = dayjs(today).add(i,'day').format('YYYY-MM-DD')
        this.convertDates.push(this.convertDate);

        await this.$store.dispatch('scheduleCount',{tcity:this.selected_city, ttitle:this.selected_title, date:this.convertDate})
        .then((res) => {
        // console.log(res)
        if(res.schedulesConnection.aggregate.count === 0){
          this.isDateBlank.push(true);
        }else{
          this.isDateBlank.push(false);
        }
      })
      .catch((err) => {
        console.log(err)
        this.isDateBlank.push(false);
      })
      }
      // console.log(this.convertDates)

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
        return 'dayClass_saturday';
      } else if (dayOfWeek === '일') {
        return 'dayClass_sunday';
      } else {
        return '';
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
      deBounceSearch(){
        clearTimeout(this.lodingTimer);
        this.lodingTimer = setTimeout(() => {
          //여기에 적용시키고 싶은 함수 넣으면 됨
          this.lodingTimer = null;
        },this.lodingTime)
      },
  },
  computed: {
      numSlides() {
        return this.convertDates.length;
        //클래스의 길이 만큼 이동
      },
      underlineStyle() {
      // 활성화된 탭의 위치에 따라 underline의 left 값을 계산합니다.
      return {
        left: `${this.activeIndex * 325}px` // 각 탭의 너비가 100px일 경우
      };
    },
    filtered_title_list() {
      return this.theater[this.selected_city] || [];
    }
  },
  async mounted(){
    await this.viewDay();
    this.setupList();
    await this.getTicketingSchedules();
    await this.getposterNowShowtime();
    await this.pickDayMovie(this.todayFormat());
    this.calculateTheaterCounts();
    // this.testmethod();
  }
}
</script>

<style lang="scss">
.date_blank{
  color: #CCC ;
}
.dayClass_saturday{
  color: #233CA3;

}
.dayClass_sunday{
  color: #F24A6A;
}
.owl-prev:hover, .owl-next:hover {
  opacity: 1;
}
.depth1 .active{
  background: #FFF url("@/assets/posters/etc/check.png") no-repeat 150px 2px;
}
// .depth1{
//   background: #FFF url("@/assets/posters/etc/check.png") no-repeat 150px 2px;
// }
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
.mt_section_step_con {
    width: 100%;
    margin-left: 0;
}
.mt_tab_wrap.outer{
  padding-top: 50px;
}
.mt_section_step_con.active {
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
.mt_section_step_con .article {
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
    align-items: center;
    justify-content: center;

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
  display: block;
  height: 40px;
  // width: 200px;
  /* font-family: 'NEXON Lv1 Gothic OTF'; */
}
.depth1{
  height: 40px;
  width: auto;
  text-indent: 18px;
  line-height:3;
  // margin-top: 10px;

}
.depth2{
  height: 40px;
  width: auto;
  text-indent: 18px;
  line-height:3;
  /* font-family: 'NEXON Lv1 Gothic OTF'; */
}
.depth2 a{
  display: block;
}
.depth2 .active{
  background: url("@/assets/posters/etc/check.png") no-repeat 150px 10px;
  color: #FF243E;
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

    /* font-family: 'ChosunSg'; */
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
  /* font-family: 'Roboto'; */
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
.wrap_nav_underline{
  position: absolute;
  top: 50px;
  left: 50%;
  margin-left: -464.5px;
  width: 851px;
  height: 2px;
  margin-top: -2px;
  border: 0px solid #f00;
}
.nav_underline{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 33.3%;
  height: 2px;
  background: #111;
  transition: all .3s ease-in-out;

  z-index: 3;
}
/* 탭 활성화 */
.tab_wrap.outer{
  padding-top: 80px;
}
.tab_wrap {
    position: relative;
}
.tab_wrap > li > .tab_tit {
    position: absolute;
    top: 0;
}
.tab_wrap.outer > li.active > .tab_tit {
  border-bottom: 2px solid #111;
    color: #000;
}
.tab_wrap.outer.tab_tit{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #CCC;
  font-size: 15px;
  color: #7F7F7F;
}
.tab_tit span{
  font-size: 15px !important;
}
.tab_tit.active span{
  color: #000;
}
.tab_wrap li:nth-child(n) button{
  font-size: 13px;
}
.tab_wrap li:nth-child(1) button{
  width: 33.3%;
  left: 0%;
}
.tab_wrap li:nth-child(2) button{
  width: 33.3%;
  left: 33.3%;
}
.tab_wrap li:nth-child(3) button{
  width: 33.3%;
  left: 66.6%;
}
.ic_grade{
  width: 22px;
  height: 22px;
  border-radius: 3px;
}
.list_hall li{
  display: block;
  position: relative;
  float: left;
  margin-left: 3px;
  padding-left: 6px;
  font-size: 13px;
}
.list_hall .after{
  content: "";
  display: block;
  clear: both;
}
.list_hall li:nth-child(1){
  margin-left: 0;
  padding-left: 0;
}
.etc_span{
  color: #d5d5d5;
}
.list_time li:nth-child(7n+1) {
    margin-left: 0;
}
.list_time li:nth-child(1){
  margin-left: 0;
  padding-left: 0;
}

.list_time a{
  display: block;
  position: relative;
  height: 48px;
  padding: 8px 14px 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
  /* cursor: pointer; */

  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(248, 248, 248, 1) 100%);
}
.list_time li{
  float: left;
  width: 13%;
  margin: 0 0 11px 1%;
}
.list_time .hall{
  position: absolute;
  right: 15px;
  bottom: -1px;
  font-size: 11px;
}
 .time_select_wrap{
  margin-top: 20px;
}
.list_time dl dt{
  overflow: hidden;
  position: absolute !important;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
}
.list_time .time{
  /* margin-bottom: 5px; */
  font-family: 'Roboto';
  font-size: 11px;
}
.list_time .seat{
  font-family: 'Roboto';
  font-size: 11px;
  color: #666;
}
.seat strong{
  color: #427652;
}
.time strong{
  display: block;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}
.tooltip{
  display: none;
  position: absolute;
  left: 50%;
  top: -41px;
  height: 32px;
  line-height: 34px;
  margin-left: -38px;
  padding: 0 8px;
  border-radius: 4px;
  font-family: 'Roboto';
  font-size: 13px;
  color: #FFF;
  white-space: nowrap;
  background-color: #333;

  z-index: 1;
}
/* tooltip-container 스타일 설정 */
.tooltip-container {
  position: relative;
  display: inline-block;
}
/* tooltip-container에 마우스를 올리면 tooltip 보이게 하기 */
.tooltip-container:hover .tooltip {
  display: block;
}
.time_select_tit{
  /* display: flex; */
  align-items: center;
  /* margin-top: 30px; */
  font-size: 15px;
}
/* .list_time{
 min-height: 100px;
 max-height: auto;
} */

.group_time_select{
  display: grid;
  padding-bottom: 20px;
}
.mt_outer_card{
  /* border: none !important; */
  box-shadow: none !important;
}
.bx_notice{
  /* clear: both; */
  margin-top: 215px;
  padding-top: 52px;
  text-align: center;
  background: url("@/assets/posters/etc/film.png") no-repeat center 0;
}
// 모달
.modal_frame{
  height: 400px;
  width: 500px;
}
.md_btn_close{
  position: absolute !important;
  right: 15px;
  top: 13px;
  // width: 19px !important;
  // height: 19px;
}
.md_main_title{
  background-color: #666;
  color: white;
  font-size: 18px;
  font-weight: 600 !important;
  text-align: center;
  // min-height: 55px !important;
  line-height: 2;
  // min-height: 50px;
}

.remain_seat{
  font-size: 16px;
}
.remain_seat strong{
  font-family: 'Roboto';
  font-size: 22px;
}
.md_screen{
  position: relative;
  z-index: 1;
  color: #bdbdbd;
  letter-spacing: 5px;
  background: none;
}
.md_txt_notice{
  margin-top:70px;
  padding: 18px 0 26px;
  font-family: 'ChosunSg';
}
.md_txt_notice .tit{
  margin-bottom: 5px;
  font-size: 13px;
  color: #111;
  line-height: 1.3;
}
.md_txt_notice strong{
  border-bottom: 1px solid #dd7430;
  color: #dd7430;
  font-family: 'NEXON Lv1 Gothic OTF';
}
.md_txt_notice .txt{
  line-height: 1.4;
  font-size: 11px;
  color: #666;
  letter-spacing: -0.5px;
}
.md_btn_box{
  text-align: center;
  display:block !important;
  margin-bottom: 40px;
}
.md_cansle_btn{
  min-height: 40px;
  line-height: 38px;
  padding: 0 18px;

  margin: 0 3px;
  min-width: 160px !important;
  max-width: 160px;

  display: inline-block;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #414141 !important;
  font-size: 14px;
  color: #ffffff !important;
  text-align: center;
  vertical-align: middle;
  background-color: #414141 !important;
}
.md_select_btn{
  min-height: 40px;
  line-height: 38px;
  padding: 0 18px;

  margin: 0 3px;
  min-width: 160px !important;

  display: inline-block;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #FF243E !important;
  font-size: 14px;
  color: #ffffff !important;
  text-align: center;
  vertical-align: middle;
  background-color: #FF243E !important;
}
.mt_card_age img{
width: 19px;
height: 19px;
}
.tick_seatbox{
  padding: 2px !important;
  margin: 1.4px !important;

  min-width: 7px !important;
  max-width: 8px !important;
  width: 3px !important;
  height: 1px;
  max-height: 1px !important;
  max-height: 1px !important;

  border: 1px solid black;
  background-color: black;
  border-top-left-radius: 1.5px;
  border-top-right-radius: 1.5px;
  // text-align: center;
  opacity: 1;
  // background-color: black;

  font-size: 0;
  text-indent: -9999em;
  cursor: pointer;

  >span{
  // font-size: 10px;
  }
  &.tick_seatbox_blank {
  opacity: 0;
  }
  }
.corridor{
opacity: 0;
}
.tick_seat_content{
  margin-top: 70px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: grid;
  min-height: auto !important;
  max-height: auto !important;
}
</style>
<!-- opacity: 0; -->
