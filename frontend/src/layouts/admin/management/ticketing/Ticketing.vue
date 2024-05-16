<template>

<v-col class="pa-0 d-flex ms_main_table">
  <!-- <v-col cols="1" class="ml-7">키워드</v-col> -->
  <v-col cols="1" class="pa-0">
    <v-select
    label="지역"
    v-model="select_city_choice"
    class="pa-0 ml-3 mp_select"
    density="compact"
    hide-details="true"
    placeholder="Category"
    @update:modelValue="getTheaterList()"
    underline="none"
    :items="select_city"
    variant="plain"
    >
    </v-select>
  </v-col>
  <v-col cols="2" class="pa-0">
    <v-select
    label="지점"
    prepend-inner-icon="mdi-home-group"
    v-model="select_title_choice"
    class="pa-0 ml-3 mp_select"
    density="compact"
    hide-details="true"
    placeholder="Category"
    @update:modelValue="getTheaterList()"
    underline="none"
    :items="all_title_listup[select_city_choice]"
    variant="plain"
    >
    </v-select>
  </v-col>
  <v-col cols="1" class="pa-0">
    <v-select
    label="상영관"
    v-model="select_title_choice"
    class="pa-0 ml-3 mp_select"
    density="compact"
    hide-details="true"
    placeholder="Category"
    @update:modelValue="getTheaterList()"
    underline="none"
    :items="all_title_listup[select_city_choice]"
    variant="plain"
    >
    </v-select>
  </v-col>
  <v-col cols="3" class="pa-0">
    <v-select
    label="영화 제목"
    prepend-inner-icon="mdi-movie-roll"
    v-model="select_title_choice"
    class="pa-0 ml-3 mp_select"
    density="compact"
    hide-details="true"
    placeholder="Category"
    @update:modelValue="getTheaterList()"
    underline="none"
    :items="all_title_listup[select_city_choice]"
    variant="plain"
    >
    </v-select>
  </v-col>
  <v-col cols="3" class="pa-0 t_mt_vc2">
    <div class="d-flex btn-group mp_search">
      <v-col
        cols="12"
        lg="4"
        class="pa-0 ml-5 ms_cal"
        density="compact"
        hide-details="true"
      >
        <v-menu
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
          hide-details="true"
        >
          <template v-slot:activator="{}">
            <v-text-field
              class="date_input_value"
              v-model="computedDateFormatted"
              prepend-icon="mdi-calendar"
              hide-details="true"
              @click="openCalendar"
              variant="plain"
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            v-if="menu1"
            v-model="start_date"
            no-title
            @update:model-value="inputClose"
          ></v-date-picker>
        </v-menu>
      </v-col>

    </div>
  </v-col>
  <v-col cols="1" class="pa-0 t_select">
    <v-select
    label="시간"
    v-model="select_title_choice"
    class="pa-0 ml-3"
    density="compact"
    hide-details="true"
    placeholder="Category"
    @update:modelValue="getTheaterList()"
    underline="none"
    :items="all_title_listup[select_city_choice]"
    variant="plain"
    >
    </v-select>
  </v-col>
    <v-col cols="1" class="pa-0">
    <v-btn
    @click="deBounceSearch"
    class="pa-0 ms_vbtn"
    >검색</v-btn>
  </v-col>
</v-col>

<v-container class="pa-0 mt-10">

<v-card-title class="pa-0">
<strong>예약 현황</strong>
</v-card-title>


<v-col class="pa-0 mt-1">

<!-- 좌석 현황 -->
<v-container class="pa-0">
<v-col class="pa-0">
  <v-col class="pa-7 mt-5 msd_board_list">
    <v-col class="pa-0 mb-12 screen">S C R E E N</v-col>
    <v-col
    v-for="(row, vIndex) of sample_array" :key="vIndex" class="pa-0 ma-0">
      <v-row class="pa-0 ma-0">
        <v-col
        v-for="(seat, hIndex) of row" :key="hIndex"
        :class="[seat, (blankList.includes(seat)) ? 'seat_blank' : null]"
          class="pa-1 ma-1 seatbox">
        <span v-if="seat !== 'corridor'"  >
          {{ seat }}
        </span>
        </v-col>
      </v-row>
    </v-col>
  </v-col>
</v-col>
</v-container>
<!-- 좌석 현황 끝 -->



<v-col class="pa-0">
  <v-table
  class="pa-0 mp_list_table"
  density="compact"
  dense>
    <thead>
      <tr class="ms_list_table_tr">
        <th>Tracking no.</th>
        <th>User</th>
        <th>Booking</th>
        <th>Reservation date</th>
      </tr>
    </thead>
    <tbody>
      <tr
      class="ms_list_table_tb_tr"
      v-for="(theaters, index) of theaterList" :key="index"
      >
        <td>{{ theaters.city }}</td>
        <td>{{ theaters.title }}</td>
        <td>{{ theaters.name }}</td>
        <td>{{ theaterFormatDate(theaters.created_at) }}</td>
        <!-- <td class="pa-0 ms_read_td">
          <v-btn
          @click="$router.push({name:'ttDetail',params:{id:theaters.id}})"
          width="100%"
          color="gray100"
          class="pa-0 ms_read_movie"
          elevation="0"
          >
            <span>상세보기</span>
          </v-btn>
        </td> -->
      </tr>
    </tbody>
  </v-table>


    <div class="pagination">
    <ol>
      <li
      v-for="(page, pageIdx) of page_count" :key="`page-${pageIdx}`">
        <a class="strong_p"
        :class="[start_page === page ? ('text-red') : null]"
        @click="clickPagination(page)">
        {{ page }}
        </a>
      </li>
    </ol>
  </div>

</v-col>

</v-col>

</v-container>
</template>

<script>
import dayjs from 'dayjs';
import listup from '@/assets/data/theater.json'
export default {
  data() {
    const today = new Date();
    return {
      today:today,
      start_date:new Date(today.getFullYear(), today.getMonth(), 0),
      end_date:new Date(today.getFullYear(), today.getMonth() + 1, 2),
      menu1:false,
      menu2:false,
      theaterList:[],
      start_page:1,
      total_page:0,
      items_per_page:10,
      data_desc:'',
      lodingTime:200,
      lodingTimer:null,
      selectedTheaterId:[],
      select_city_choice:'all',
      select_title_choice:'all',
      select_city:[],
      select_title:[],
      all_title_listup :"",

      sample_array:[],
      total_seat:'',
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.start_date);
    },
    computedDateFormatted2() {
      return this.formatDate2(this.end_date);
    },
    page_count(){
      return this.total_page === 0 ? 0 : Math.floor((this.total_page / this.items_per_page))
      + (this.total_page % this.items_per_page > 0 ? 1 : 0)
    },
  },
  methods: {
//상영관 배치도 상세 불러오기
async gettheaterDetail(){
  try{
    let res = await this.$store.dispatch('theaterDetail',{id: this.$route.params.id});
    // console.log(res)
    //규모
    for(let i = 0; i< res.theaters.length; i++){
      res.theaters[i].ratio = res.theaters[i].ratio.split('x')
    }
    this.theater = res.theaters[0]
    // console.log(this.theater)
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
//좌석
totalSeat(){
  this.total_seat = Number(this.verticalSeat) * Number(this.horizontalSeat) - this.blankList.length
  // console.log(this.total_seat)
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
    openCalendar(){
      this.menu1 = true;
    },
    openCalendar2(){
      this.menu2 = true;
    },
    inputClose(newDate){
      this.start_date = newDate || new Date();
      this.menu1 = false;
    },
    inputClose2(newDate){
      this.end_date = newDate || new Date();
      this.menu2 = false;
    },
    formatDate(start_date) {
      if (!start_date) return null
      return dayjs(start_date).format('YYYY-MM-DD')
    },
    formatDate2(end_date) {
      if (!end_date) return null
      return dayjs(end_date).format('YYYY-MM-DD')
    },
    async getTheaterList(){
      let form = {
        start : (this.start_page - 1) * this.items_per_page,
        limit : this.start_page * this.items_per_page,
        startDate : this.start_date.toISOString(),
        endDate : this.end_date.toISOString(),
      }
      // 전체 검색에 대한 처리
      if(this.select_city_choice !== 'all'){
        form["cityContain"] = this.select_city_choice
      }

      if(this.select_title_choice !== 'all'){
        form["titleContain"] = this.select_title_choice
      }

      // console.log(form)

      await this.$store.dispatch('theaterList', form)
      .then((res) => {
        // console.log(res);
        this.total_page = res.theatersConnection.aggregate.count;
        this.theaterList = res.theaters;
        // console.log(this.theaterList)
      })
      .catch((err) => console.log(err))
    },
    theaterFormatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    clickPagination(value){
      this.start_page = value;
      this.getTheaterList();
    },
    togglechecks() {
      const checkAllCheckbox = document.querySelector('.ms_in_check_all');
      const isChecked = checkAllCheckbox.checked;
      const checkboxes = document.querySelectorAll('.ms_in_check');

    checkboxes.forEach(checkbox => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      this.theaterList.forEach(theater => {
        this.handleCheck(theater.id);
      });
    }else{
      this.selectedTheaterId = [];
    }
  },
  handleCheck(theaterId) {
    const members = [...this.selectedTheaterId];
    const index = members.indexOf(theaterId);
    if (index !== -1) {
        members.splice(index, 1);
    } else {
        members.push(theaterId);
    }
    // console.log(members);

    this.selectedTheaterId = members;
},
async deleteTheater() {
  if(!this.selectedTheaterId.length ){
    alert("체크 해주세요!")
  }else{
    const deleteconfirm = confirm("삭제 하시겠습니까?")
      if(deleteconfirm){
        for (const theaterId of this.selectedTheaterId) {
        await this.$store.dispatch('deleteTheater', { id: theaterId });
      }
      this.selectedTheaterId = [];
      this.getTheaterList();
      }
    }
  return;
},
/*
Array.isArray()
: 전달된 값이 배열인지 확인하는 데 사용되는 내장 JavaScript 메서드

.concat()
: 두 개 이상의 배열을 병합하여 관련된 모든 배열의 요소를 포함하는 새 배열을 만드는 데 사용됩니다. 원래 배열을 수정하지 않고 대신 결합된 요소가 포함된 새 배열을 반환합니다.

*/
setupList(){
  this.select_city = listup.location
  this.all_title_listup = listup.theater
  let new_list_up = []
  for(let i = 0 ; i < this.select_city.length; i++){
    if(Array.isArray(listup.theater[this.select_city[i].value]) && listup.theater[this.select_city[i].value].length > 0){
      new_list_up = new_list_up.concat(listup.theater[this.select_city[i].value])
      listup.theater[this.select_city[i].value].unshift({title:"전체", value:"all"})
    }
  }
  new_list_up.unshift({title:"전체", value:"all"})
  this.all_title_listup['all'] = new_list_up
  // console.log(this.all_title_listup)
},

  },
  // vue 2는 mouted = vue 3 onMount
  async mounted() {
    this.setupList()
    await this.getTheaterList();
    await this.gettheaterDetail();
  }
};
</script>

<style scoped>
.page-wrapper .v-container:first-child {
    min-height: 340px !important;
}
</style>
