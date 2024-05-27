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
  <v-col cols="2" class="pa-0">
    <v-select
    label="필터"
    v-model="selete_choice"
    class="pa-0 mp_select"
    density="compact"
    hide-details="true"
    placeholder="Category"
    underline="none"
    :items="select_list"
    variant="plain"
    >
    </v-select>
  </v-col>
  <v-col cols="4" class="pa-0">
    <v-text-field
    label="내용 입력"
    class="v_input_box"
    prepend-inner-icon="mdi-magnify"
    hide-details="true"
    density="compact"
    v-model="search_text"
    variant="plain"
    >
  </v-text-field>
  </v-col>
    <v-col cols="1" class="pa-0">
    <v-btn
    @click="deBounceSearch"
    class="pa-0 ml-1 ms_vbtn"
    >검색</v-btn>
  </v-col>
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
        <th>영화이름</th>
        <th>감독</th>
        <th>상영시작일</th>
        <th>상영종료일</th>
        <th>등록날짜</th>
        <th>비 고</th>
      </tr>
    </thead>
    <tbody>
      <tr
      class="ms_list_table_tb_tr"
      v-for="(posters, index) of posterList" :key="index"
      >
        <td>
          <input
          @click="handleCheck(posters.id)"
          type="checkbox"
          class="ms_in_check"
          >
        </td>
        <td>{{ posters.id }}</td>
        <td>{{ posters.name }}</td>
        <td>{{ posters.director }}</td>
        <td>{{ posters.starttime }}</td>
        <td>{{ posters.endtime }}</td>
        <td>{{ posterFormatDate(posters.created_at) }}</td>
        <td class="pa-0 ms_read_td">
          <v-btn
          @click="$router.push({name:'mpdetail',params:{id:posters.id}})"
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
export default {
  data() {
    const today = new Date();
    return {
      today:today,
      // 현재일 기준 6개월 전
      start_date:new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()),
      // 현재일 기준 6개월 후
      end_date:new Date(today.getFullYear(), today.getMonth() + 6, today.getDate()),
      menu1:false,
      menu2:false,
      posterList:[],
      start_page:1,
      total_page:0,
      items_per_page:10,
      search_text:'',
      data_desc:'',
      selete_choice:'allSearch',
      lodingTime:200,
      lodingTimer:null,
      selectedPosterIds:[],
      select_list:[
        {title:"전체",value:"allSearch"},
        {title:"이름",value:"nameContains"},
        {title:"장르",value:"genreContains"},
        {title:"감독",value:"directorContains"},
      ],
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
    }
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
    async getPosterList(){
      let form = {
        start : (this.start_page - 1) * this.items_per_page,
        limit : this.start_page * this.items_per_page,
        startDate : this.start_date.toISOString(),
        endDate : this.end_date.toISOString(),
      }
      if(this.selete_choice === "allSearch"){
        form["allSearch"] =[{genre_contains : this.search_text}, {name_contains:this.search_text},{director_contains : this.search_text}]

      }else{
        form[this.selete_choice]=this.search_text;
        form["allSearch"] =[{genre_contains : this.search_text}, {name_contains:this.search_text},{director_contains : this.search_text}]
      }

      // console.log(form)

      await this.$store.dispatch('posterList', form)
      .then((res) => {
        // console.log(res);
        this.total_page = res.postersConnection.aggregate.count;
        this.posterList = res.posters;
      })
      .catch((err) => console.log(err))
    },
    posterFormatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    search(){
      this.getPosterList();
    },
    deBounceSearch(){
      clearTimeout(this.lodingTimer);
      this.lodingTimer=setTimeout(()=>{
        this.search();
        this.lodingTimer =null;
      },this.lodingTime)
    },
    clickPagination(value){
      this.start_page = value;
      this.getPosterList();
    },
    togglechecks() {
      const checkAllCheckbox = document.querySelector('.ms_in_check_all');
      const isChecked = checkAllCheckbox.checked;
      const checkboxes = document.querySelectorAll('.ms_in_check');

    checkboxes.forEach(checkbox => {
      checkbox.checked = isChecked;
    });

    if (isChecked) {
      this.posterList.forEach(potser => {
        this.handleCheck(potser.id);
      });
    }else{
      this.selectedPosterIds = [];
    }
  },
  handleCheck(potserId) {
    const members = [...this.selectedPosterIds];
    const index = members.indexOf(potserId);
    if (index !== -1) {
        members.splice(index, 1);
    } else {
        members.push(potserId);
    }
    console.log(members);

    this.selectedPosterIds = members;
},
async deletePoster() {
  if(!this.selectedPosterIds.length ){
    alert("체크 해주세요!")
  }else{
    const deleteconfirm = confirm("삭제 하시겠습니까?")
      if(deleteconfirm){
        for (const potserId of this.selectedPosterIds) {
        await this.$store.dispatch('deletePoster', { id: potserId });
      }
      this.selectedPosterIds = [];
      this.getPosterList();
      }
    }
  return;
},

  },
  // vue 2는 mouted = vue 3 onMount
  async mounted() {
    await this.getPosterList()
  }
};
</script>
