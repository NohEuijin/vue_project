<template>
  <v-col cols="12" class="pa-0 mb-5 mp_reg_box">
    <v-btn
  @click="deletePoster"
  class="pa-0 mp_del_btn">
    <span>삭제</span>
  </v-btn>
    <v-btn
  @click="$router.push({name : 'mpRegister'})"
  class="pa-0 ml-3 mp_reg_btn">
    <span>등록</span>
  </v-btn>
</v-col>
<v-col class="pa-0 d-flex ms_main_table">
  <!-- <v-col class="pa-0 mp_mt_vc1">주문일자</v-col> -->
  <v-col cols="5

  " class="pa-0 mp_mt_vc2">
    <div class="d-flex btn-group mp_search">
      <v-col
        cols="5"
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
              v-model="computedDateFormatted"
              label=""
              hint=""
              persistent-hint
              prepend-icon="mdi-calendar"
              :size="10"
              hide-details="true"
              opacity="-0.06"
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
      <v-col cols="1" class="pa-0 mr-8 mt-3">~</v-col>
      <v-col
        cols="5"
        lg="4"
        class="pa-0 ms_cal"
        density="compact"
        hide-details="true"
      >
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
          hide-details="true"
        >
          <template v-slot:activator="{}">
            <v-text-field
              v-model="computedDateFormatted2"
              label=""
              hint=""
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              hide-details="true"
              @click="openCalendar2"
              variant="plain"
            ></v-text-field>
          </template>
          <v-date-picker
            v-if="menu2"
            v-model="end_date"
            no-title
            @update:model-value="inputClose2"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </div>
  </v-col>
  <!-- <v-col cols="1" class="ml-7">키워드</v-col> -->
  <v-col cols="3" class="pa-0">
    <v-select
    v-model="select_city_choice"
    class="pa-0 mp_select"
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
  <v-col cols="4" class="pa-0">
    <v-select
    v-model="select_title_choice"
    class="pa-0 mp_select"
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
    <!-- <v-col cols="1" class="pa-0">
    <v-btn
    @click="deBounceSearch"
    class="pa-0 ml-1 ms_vbtn"
    >검색</v-btn>
  </v-col> -->
</v-col>

  <v-table
  class="mt-10 pa-0 mp_list_table"
  density="compact"
  dense
  >
    <thead>
      <tr class="ms_list_table_tr">
        <th>
          <input
          @click="togglechecks"
          type="checkbox"
          class="ms_in_check_all">
        </th>
        <th>번호</th>
        <th>지역</th>
        <th>상영관 이름</th>
        <th>등록날짜</th>
        <th>비 고</th>
      </tr>
    </thead>
    <tbody>
      <tr
      class="ms_list_table_tb_tr"
      v-for="(theaters, index) of theaterList" :key="index"
      >
        <td>
          <input
          @click="handleCheck(theaters.id)"
          type="checkbox"
          class="ms_in_check"
          >
        </td>
        <td>{{ theaters.id }}</td>
        <td>{{ theaters.city }}</td>
        <td>{{ theaters.title }}</td>
        <td>{{ theaterFormatDate(theaters.created_at) }}</td>
        <td class="pa-0 ms_read_td">
          <v-btn
          @click="$router.push({name:'ttDetail',params:{id:theaters.id}})"
          width="100%"
          color="gray100"
          class="pa-0 ms_read_movie"
          elevation="0"
          >
            <span>상세보기</span>
          </v-btn>
        </td>
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
      all_title_listup :""
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
      if(this.select_city_choice !== 'all'){
        form["cityContain"] = this.select_city_choice
      }

      if(this.select_title_choice !== 'all'){
        form["titleContain"] = this.select_title_choice
      }

      console.log(form)

      await this.$store.dispatch('theaterList', form)
      .then((res) => {
        console.log(res);
        this.total_page = res.theatersConnection.aggregate.count;
        this.theaterList = res.theaters;
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
async deletePoster() {
  if(!this.selectedTheaterId.length ){
    alert("체크 해주세요!")
  }else{
    const deleteconfirm = confirm("삭제 하시겠습니까?")
      if(deleteconfirm){
        for (const theaterId of this.selectedTheaterId) {
        await this.$store.dispatch('deletePoster', { id: theaterId });
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
  console.log(this.all_title_listup)
},

  },
  // vue 2는 mouted = vue 3 onMount
  async mounted() {
    this.setupList()
    await this.getTheaterList()

  }
};
</script>
