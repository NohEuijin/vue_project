<template>
  <v-col cols="12" class="pa-0 mb-5 ms_dt_submit_box">
<v-btn
 @click="$router.push({name:'ttModify',param:{id:theater.id}})"
 class="pa-0 ml-3 ms_dt_submit">
  <span>수정</span>
</v-btn>
<v-btn
@click="deleteTheater"
 class="pa-0 ml-3 ms_dt_submit">
  <span>삭제</span>
</v-btn>
<v-btn
 @click="$router.push({name:'theater'})"
 class="pa-0 ml-3 ms_dt_submit">
  <span>목록</span>
</v-btn>
</v-col>

<v-table
class="pa-0 ms_dt_table"
density="compact"
dense
>
<tbody class="tt_detail_body">
  <tr>
    <td class="bg-gray100">번호</td>
    <td class="ttd_table_width">
      <span >
         {{ theater.id }}
      </span>
    </td>
    <td class="bg-gray100">관</td>
    <td>
      <span>{{ theater.name }}</span>
    </td>
  </tr>
  <tr>
    <td class="bg-gray100">지역</td>
    <td>
      <span>{{ theater.city }}</span>
    </td>
    <td class="bg-gray100">지점</td>
    <td class="">
      <span>{{ theater.title }}</span>
    </td>
  </tr>
</tbody>
</v-table>

<v-container class="pa-0 mt-10">

<v-card-title class="pa-0">
<strong>상영 시간표</strong>
</v-card-title>

<v-col class="pa-0 d-flex">

<v-col cols="6" class="pa-0 mt-5 msd_board_list_left">

  <FullCalendar
  id="fullCalendar"
  ref="fullCalendar"
  :options="calendarOptions" >
<template v-slot:eventContent='arg'>
  <!-- <span
  @click="(e) => e.target.style.color='red'">
  </span> -->

  <div>
    {{ arg.event._def.title }}
  </div>

</template>
</FullCalendar>

</v-col>

<v-col cols="6" class="pa-0 mt-5 msd_board_right">
<v-col v-if="!schedulesList[0]">
  <v-col
  class="d-flex ttd_select_box">
    <v-select
    v-model="movie_choice"
    prepend-inner-icon="mdi-movie-roll"
    class="pa-0 tt_select"
    label="영화 선택"
    variant="plain"
    density="compact"
    hide-details="true"
    underline="none"
    :items="movieLists"
    >
    </v-select>
    <v-text-field
    class="v_input_box"
    v-model="movie_start_time"
    prepend-inner-icon="mdi-sun-clock-outline"
    hide-details="true"
    density="compact"
    label="시작 시간"
    variant="plain"
    @input="validateTime"
    >
  </v-text-field>
  <v-text-field
    class="v_input_box"
    v-model="movie_end_time"
    prepend-inner-icon="mdi-timer-stop-outline "
    hide-details="true"
    density="compact"
    label="종료 시간"
    variant="plain"
    @input="validateTime"
    >
  </v-text-field>
    <v-btn
    class="pa-0 ms_dt_submit"
    @click="getmovieInfo"
    v-if="this.found ===true"
    type="button">추가</v-btn>
  </v-col>
<!-- 생성 전 리스트  -->
<v-col class="caution_ment"
  v-if="this.found ===false"
  >
   ※ 스케이줄 조정 기간 외에는 추가 및 삭제가 불가능 합니다!
  </v-col>
  <v-col
v-if="showtimeSlots[0]"
  class="">
  <v-col class="caution_ment">
   ※ 생성시 고객이 예매할 수 있으니 신중하게 생성해주세요!
  </v-col>
    <v-card-title
    class=" tt_card_title">
    <span
      v-if="pickViewAge === 'all'">
      <img
      src="@/assets/posters/age/all.png" alt="">
    </span>
    <span
      v-if="pickViewAge === 'r12'">
      <img src="@/assets/posters/age/r12.png" alt="">
    </span>
    <span
      v-if="pickViewAge === 'r15'">
      <img src="@/assets/posters/age/r15.png" alt="">
    </span>
    <span
      v-if="pickViewAge === 'r19'">
      <img src="@/assets/posters/age/r19.png" alt="">
    </span>
      <span>{{ pickName }}</span>
      <span class="ml-2 spanShowtime">
        {{ pickShowtime }}
        <span v-if="pickShowtime">분</span>
      </span>
      <v-btn
      @click="createSchedule"
      class="pa-0 ttd_title_btn"
      hide-details="true"
      density="compact"
      >생성</v-btn>
      <v-btn
      @click="cancelSlote"
      class="pa-0 ttd_title_btn"
      hide-details="true"
      density="compact"
      >취소</v-btn>
    </v-card-title>

<!-- 전체 check -->
<v-col class="pb-0 pl-4 ttd_time_list">
  <v-col class="pa-0 d-flex">
    <v-col class="ttd_time_box">
      전체
    </v-col>
    <v-checkbox
      class="pa-0 ml-3"
      density="compact"
      hide-details="false"
      v-model="selectAll"
      @change="toggleAll"
      value="전체"
    />
  </v-col>
</v-col>

    <v-col
    v-for="(showtime, index) of showtimeSlots" :key="index"
    class="pb-0 pl-4 ttd_time_list">
      <v-col class="pa-0 d-flex">
        <v-col
        v-model="pickStartTime"
        class="ttd_time_box">
        {{ showtime.startTime }}
        </v-col>
        <v-checkbox
        class="pa-0 ml-3"
        density="compact"
        hide-details="true"
        v-model="checkboxValues"
        :value="showtime.startTime"
        />
      </v-col>
    </v-col>
    <!-- 영화 타임리스트 끝 -->
  </v-col>
  <!-- 리스트 끝 -->
</v-col>


<v-col
v-if="this.schedulesList[0]">
  <!-- 생성 후 스케이줄 리스트  -->
  <v-col>
  <v-col class="caution_ment"
  v-if="this.found ===true"
  >
   ※ 상영 영화 수정 및 변경은 삭제 후 이용해 주세요!
  </v-col>
  <v-col class="caution_ment"
  v-if="this.found ===false"
  >
   ※ 스케이줄 조정 기간 외에는 추가 및 삭제가 불가능 합니다!
  </v-col>
      <v-card-title
      class=" tt_card_title">
      <span
        v-if="dayMovieViewAge === 'all'">
        <img
        src="@/assets/posters/age/all.png" alt="">
      </span>
      <span
        v-if="dayMovieViewAge === 'r12'">
        <img src="@/assets/posters/age/r12.png" alt="">
      </span>
      <span
        v-if="dayMovieViewAge === 'r15'">
        <img src="@/assets/posters/age/r15.png" alt="">
      </span>
      <span
        v-if="dayMovieViewAge === 'r19'">
        <img src="@/assets/posters/age/r19.png" alt="">
      </span>
        <span>{{ dayMovieName }}</span>
        <span class="ml-2 spanShowtime">
          {{ dayMovieShowTime }}
          <span v-if="dayMovieShowTime">분</span>
        </span>
        <v-btn
        @click="deleteScheduls"
        class="pa-0 ttd_title_btn"
        hide-details="true"
        density="compact"
        v-if="this.found ===true"
        >삭제</v-btn>
      </v-card-title>
      <v-col
      v-for="(schedules, index) of schedulesList" :key="index"
      class="pb-0 pl-1 ttd_time_search_list">
        <v-col class="pa-0 d-flex">
          <v-col
          v-model="schedules_time"
          class="ttd_time_box">
          {{ convertToShortTime(schedules.time) }}
          </v-col>
        </v-col>
      </v-col>
      <!-- 영화 타임리스트 끝 -->
    </v-col>
    <!-- 리스트 끝 -->
  </v-col>

</v-col>
</v-col>
</v-container>

<v-container class="d-flex pa-0 mt-10">
<v-col class="pa-0">
<v-card-title class="pa-0">
<strong>좌석 배치도</strong>
</v-card-title>
<v-col class="pa-0 mb-5 ms_dt_submit_box">
</v-col>
<v-table
class="pa-0 ms_dt_table"
density="compact"
dense>
<tbody class="tt_detail_body">
  <tr>
  </tr>
  <tr>
    <td class="bg-gray100">규모</td>
    <td class="ttd_ratio_box">
      {{ horizontalSeat }} x {{ verticalSeat }}
    </td>
    <td class="bg-gray100">복도</td>
    <td class="ttd_bokdo_box">

    {{ bokdoTotal }} 개
    </td>
  </tr>
  <tr>

  </tr>
  <tr>
    <td class="bg-gray100">좌석</td>
    <td>
      {{ total_seat }} 개
    </td>
    <td class="bg-gray100" >빈공간</td>
    <td class="ttd_blank_box" colspan="2">

      <span v-for="(blankItem, bIndex) of blankList" :key="bIndex">
        {{ blankList[bIndex] }}
      </span>
    </td>
  </tr>
</tbody>
</v-table>
<v-col class="pa-7 mt-5 msd_board_list">
<v-col class="pa-0 mb-12 screen">S C R E E N</v-col>
  <v-col
  v-for="(row, vIndex) of sample_array" :key="vIndex" class="pa-0 ma-0">
    <v-row class="pa-0 ma-0">
      <v-col
      v-for="(seat, hIndex) of row" :key="hIndex"
      :class="[seat, (blankList.includes(seat)) ? 'seat_blank' : null]"
        class="pa-1 ma-1 seatbox"
      >
      <span v-if="seat !== 'corridor'"  >
        {{ seat }}
      </span>
      </v-col>
    </v-row>
  </v-col>
</v-col>

</v-col>
</v-container>

</template>

<script>
import dayjs from 'dayjs';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components:{
    FullCalendar
  },
data() {
return {
  theater:'',
  horizontalSeat:'',
  verticalSeat:'',
  newHorizontalSeat:'',
  newVerticalSeat:'',
  bokdoList:[],
  blankList:[],
  seatValue:[],
  bokdoTotal:'',
  showBokdo: true,
  showBlank: true,
  sample_array:[],
  total_seat:'',
  pickDate:'',
  movieLists:[],
  movie_choice:'영화 선택',
  selectList:'',
  movie_start_time:'09:00',
  movie_end_time:'24:00',
  showtimecount : '',
  readytime:'',
  start_end_showtime:'',
  selectAll:false,

  startTimeMs:'',
  endTimeMs :'',
  movieShowtime:'',
  readyTimeMs:'',
  totalShowtime:'',
  showtimeSlots:[],

  pickId:'',
  pickName:'',
  pickViewAge:'',
  pickShowtime:'',
  pickStartTime:'',

  schedulesList:[],
  schedules_time:'',
  schedules:'',
  dayMovieDate:'',

  dayMovieId:'',
  dayMovieName:'',
  dayMovieViewAge:'',
  dayMovieShowTime:'',
  currentDate:'',
  targetValue:'',
  convertDate:'',
  convertDates:[],
  found:true,
  checkboxValues:[],
  /*
  플러그인 설정, 초기 보기 설정
  titleFormat(폼변경) : 2022년 6월
  */
  calendarOptions: {
    plugins: [ dayGridPlugin, interactionPlugin ],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick,
    titleFormat(date) {
    const year = date.date.year;
    const month = date.date.month + 1;
    return year + "년 " + month + "월";
  },
  events: []
  },
  };
},
methods: {
  //전체 날짜 작업을 위해 비동기로 처리
  async generateEvents() {
      let new_events_array = []
      let twoweeks = 14
      const today = dayjs().format('YYYY-MM-DD');
      this.convertDates = [];
      // let convertDate;

    for(let i = 0; i < twoweeks; i++){
      //현재 날짜에 i일을 추가하여 각 반복의 날짜를 계산
      this.convertDate = dayjs(today).add(i, 'day').format('YYYY-MM-DD')
      // console.log(this.convertDate)
      this.convertDates.push(this.convertDate);
      await this.$store.dispatch('scheduleCount',{tid:this.theater.id, date:this.convertDate}).then((res) => {
        // console.log(res)
        if(res.schedulesConnection.aggregate.count === 0){
          new_events_array.push({title:"+", date:this.convertDate })
        }else{
          new_events_array.push({title:"완료", date:this.convertDate })
        }
      })
      // console.log(this.convertDate)
    }
    this.calendarOptions.events = new_events_array
    // console.log(this.convertDates)
    },
  //스케이줄 삭제
  async deleteScheduls(){
    // const deleteId = '';

    const deleteconfirm = confirm("삭제하시면 예매 정보가 삭제됨니다. 정말로 삭제하시겠습니까?")
    if(deleteconfirm){
      for(let i = 0;i<this.schedulesList.length;i++){
      // console.log(this.schedulesList[i].id)
      this.deleteId = this.schedulesList[i].id

      await this.$store.dispatch('deleteScheduls',{id:this.deleteId})
      .then((res) => {
        // console.log(res)
        // this.searchSchedules();
        // this.generateEvents();
      })
      .catch((err) => {
        console.log(err)
      })
      }
    }

    //스케이줄 생성 ->비우고 ->불러오기->날짜불러오기
this.cancelSlote();
this.searchSchedules();
this.generateEvents();
//체크값 초기화
this.selectAll=false;
this.checkboxValues = [];
  },
  //09:00:00.000 => 09:00로 변환
  convertToShortTime(longTime) {
      const [hours, minutes] = longTime.split(":");
      const shortTime = `${hours}:${minutes}`;
      return shortTime;
    },
  //값 초기화
  cancelSlote(){
    this.showtimeSlots=[]
  },
  //숫자(1) => 분으로 millisecond 변환
  convertMinutesToMilliseconds(minutes) {
    return minutes * 60 * 1000;
},
  //시간(00:00) => millisecond 변환
  convertToTimeMilliseconds(time) {
    const [hours, minutes] = time.split(':');
    return (parseInt(hours) * 60 * 60 * 1000) + (parseInt(minutes) * 60 * 1000);
  },
  //시간 값 체크
  validateTime() {
    const timeRegex = /^(?:[0-9]{0,2}):?[0-9]{0,2}$/;
    if (!timeRegex.test(this.movie_start_time)) {
      this.movie_start_time = '00:00';
    }
    if (!timeRegex.test(this.movie_end_time)) {
      this.movie_end_time = '24:00';
    }
  },
  //추가 클릭 => 시작~종료시간 영화 생성
  getmovieInfo(){
  // 시작시간,종료시간,대기시간 => milliseconds 변환
  this.startTimeMs = this.convertToTimeMilliseconds(this.movie_start_time);
  this.endTimeMs = this.convertToTimeMilliseconds(this.movie_end_time);
  this.readyTimeMs = this.convertMinutesToMilliseconds(this.theater.readytime);
  // 상영 저장 []
  this.showtimeSlots = [];
  //반복문을 돌려 해당 영화와 id값이 같은 것=정보가져옴
  for (let i = 0; i < this.movieLists.length; i++) {
    if(this.movieLists[i].value === this.movie_choice){
  this.pickId = this.movieLists[i].value
  this.pickName = this.movieLists[i].data.name,
  this.pickViewAge = this.movieLists[i].data.viewage,
  this.pickShowtime = this.movieLists[i].data.showtime

  //상영시간,상영시간+대기시간 milliseconds
  this.movieShowtime = this.convertMinutesToMilliseconds((this.movieLists[i].data.showtime))
  this.totalShowtime = this.movieShowtime + this.readyTimeMs;
  }
}

// 시작 시간~ 종료 시간까지 일정 간격으로 시간대 생성
for (let j = this.startTimeMs; j < this.endTimeMs; j += this.totalShowtime) {
  // 현재 시간대의 시작 시간을 milliseconds에서 HH:mm 형식으로 변환
  const newStartHours = Math.floor(j / (60 * 60 * 1000)); // 시간
  const newStartMinutes = Math.floor((j % (60 * 60 * 1000)) / (60 * 1000)); // 분
  const currentStartTime = `${String(newStartHours).padStart(2, '0')}:${String(newStartMinutes).padStart(2, '0')}`;

  // 현재 시간대의 종료 시간 계산
  const newEndTHours = Math.floor((j+this.movieShowtime) / (60 * 60 * 1000)); // 시간
  const newEndTMinutes = Math.floor(((j+this.movieShowtime) % (60 * 60 * 1000)) / (60 * 1000)); // 분
  const currentEndTime = `${String(newEndTHours).padStart(2, '0')}:${String(newEndTMinutes).padStart(2, '0')}`;

  //배열에 추가
  this.showtimeSlots.push({
      startTime: currentStartTime,
      endTime: currentEndTime
  });
}
},
toggleAll() {
      if (this.selectAll) {
        this.checkboxValues = this.showtimeSlots.map(slot => slot.startTime);
      } else {
        this.checkboxValues = [];
      }
    },
//날짜 클릭시
handleDateClick(arg) {
  this.pickDate = arg.dateStr
  const target = arg.jsEvent.target
  // console.log(target.classList.contains('activate_calendar'))

if (target.classList.contains('activate_calendar')) {
//모든 요소에서 "activate_calendar" 클래스 제거
const activateElements = document.querySelectorAll('.activate_calendar');
activateElements.forEach(element => {
  element.classList.remove('activate_calendar');
  element.closest('.fc-daygrid-day-frame').classList.remove('selected-calendar-date');
})
} else {
// 모든 요소에서 "activate_calendar" 클래스와 "selected-calendar-date" 클래스를 제거
const activateElements = document.querySelectorAll('.activate_calendar');
activateElements.forEach(element => {
  element.classList.remove('activate_calendar');
  element.closest('.fc-daygrid-day-frame').classList.remove('selected-calendar-date');
});
// 클릭한 요소에 "activate_calendar" 클래스와 "selected-calendar-date" 클래스를 추가
  target.classList.add('activate_calendar');
  target.closest('.fc-daygrid-day-frame').classList.add('selected-calendar-date');
}
  //해당 날짜 영화정보
  this.movieList();
  //선택한 영화 정보 비우기
  this.cancelSlote();
  //저장된 영화 정보 불러오기
  this.searchSchedules();

  //작동 플레그(초기화)
  let flug = false;

  //스케이줄 조정 기간 외에는 수정
for (let i = 0; i < this.convertDates.length; i++) {
    if (this.convertDates[i] === this.pickDate) {
      flug = true;
        break;
    }
}
if (flug) {
    console.log("스케이줄 조정 기간!")
    this.found = true;
} else {
    alert('스케이줄 조정 기간이 아닙니다!');
    this.found=false
}

},
//날짜 스케이줄 불러오기
async searchSchedules(){
  let form = {
    tid:this.theater.id,
    date:this.pickDate
  }

  await this.$store.dispatch('searchScheule',form)
  .then((res) => {
    // console.log(res)
    this.schedulesList = res.schedules
    // console.log(this.schedulesList)
  for(let i=0;i < res.schedules.length; i++){
    // console.log(res.schedules[i].poster)
    if(res.schedules[i].poster){
      this.dayMovieId = res.schedules[i].poster.id
      this.dayMovieName = res.schedules[i].poster.name
      this.dayMovieViewAge = res.schedules[i].poster.viewage
      this.dayMovieShowTime = res.schedules[i].poster.showtime
      this.dayMovieDate = res.schedules[i].Date
    }
  }
})
  .catch((err) => {
    console.log(err)
  })
},
  //스케이줄 만들기
  async createSchedule(){
  //영화상영 시간의 값의 수 만큼 스케이줄 생성
  for(let i =0; i<this.checkboxValues.length;i++){
    let form = {
    posterId:this.pickId,
    theaterId:this.theater.id,
    time:this.checkboxValues[i] + ':00',
    date:this.pickDate,
  }
  // console.log(this.checkboxValues)
  // console.log(form)

  await this.$store.dispatch('createSchedule',form)
  .then((res) => {
    // console.log(res)


  })
  .catch((err) => {
    console.log(err)
  })

}
//스케이줄 생성 ->비우고 ->불러오기->날짜불러오기
this.cancelSlote();
this.searchSchedules();
this.generateEvents();
//체크값 초기화
this.selectAll=false;
this.checkboxValues = [];
},
//상세페이지 불러오기
async gettheaterDetail(){
  try{
    let res = await this.$store.dispatch('theaterDetail',{id: this.$route.params.id});
    // console.log(res)
    //규모
    for(let i = 0; i< res.theaters.length; i++){
      res.theaters[i].ratio = res.theaters[i].ratio.split('x')
    }
    this.theater = res.theaters[0]
    console.log(this.theater)
    this.horizontalSeat = Number(this.theater.ratio[0])
    this.verticalSeat = Number(this.theater.ratio[1])
    // 복도
    for(let bd = 0; bd< res.theaters.length; bd++){
      res.theaters[bd].bokdo = res.theaters[bd].bokdo.split(',')
    }
    this.bokdoList = this.theater.bokdo
    this.bokdoTotal = this.bokdoList.length
    //빈공간
    for(let bk = 0; bk< res.theaters.length; bk++){
      res.theaters[bk].blank = res.theaters[bk].blank.split(',')
    }
    this.blankList= this.theater.blank

    this.changeSeatFormat();
    }catch(err){
      console.log(err)
  }
},
//영화 select 리스트 불러오기
async movieList(){
  console.log(this.pickDate)
  await this.$store.dispatch('selectMovie',{date:this.pickDate}).then((res) => {
    // console.log(res)
    let new_array =[]
    for(let i=0;i < res.posters.length; i++){
      const selectList = {
        title:res.posters[i].name,
        value : res.posters[i].id,
        data : res.posters[i],
      }
      //select에 값을 넣을땐 push
      new_array.push(selectList)
      // console.log(selectList)
    }
    this.movieLists = new_array;

  });

},
//삭제
async deleteTheater() {
  const deleteconfirm = confirm("삭제 하시겠습니까?")
    if(deleteconfirm){
      await this.$store.dispatch('deleteTheater', { id: this.theater.id })
      .then((res) => {
        // console.log(res)
        this.$router.push({name:'theater'})
      })
      .catch((err) => {
        console.log(err)
      })
    }
},
//좌석
totalSeat(){
  this.total_seat = Number(this.verticalSeat) * Number(this.horizontalSeat) - this.blankList.length
  // console.log(this.total_seat)
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

//텍스트 ... 소거
truncateText(text,maxLength){
if(text.length > maxLength){
  return text.substring(0, maxLength) + '...';
}
return text;
},
//초기화 버튼
async resetBtn(){
await this.gettheaterDetail();
// console.log('hello')
},
//좌석 값()
generatedSeatValue(vIndex, hIndex) {
  return String.fromCharCode(65 + vIndex) + (hIndex + 1);
},
  getEventColor (event) {
    return event.color
  },
  rnd (a, b) {
    return Math.floor((b - a + 1) * Math.random()) + a
  },
},
  //페이지 로딩 시점, 상세페이지 불러오기
  async mounted(){
    await this.gettheaterDetail();
    await this.generateEvents()
    // await this.movieList();
  }
  };
</script>

<style lang="scss">
.tt_card_title img{
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
.spanShowtime{
  font-size: 13px;
  color: rgb(109, 109, 235);
}
.tooltip{
  display: none;
  position: absolute;
  left: 8%;
  top: -12%;
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
}
.fc-event{
  font-family: 'NEXON Lv1 Gothic OTF';
  width: auto !important;
  height: auto !important;
  font-weight: 500;
  padding:8px;
  border: 1px solid rgb(123, 200, 205);

}
.fc-h-event{
  background-color: rgb(139, 197, 255);
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 15px;
  height: 24px !important;
  padding: 5px;
  cursor: default;
}
// .fc-event:hover{
//   background-color: rgb(42, 149, 255);
// }
.caution_ment{
  color: red;
  font-weight: 600;
  font-size: 14px;
}
</style>
