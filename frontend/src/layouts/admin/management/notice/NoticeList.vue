<template>
  <v-col cols="12" class="pa-0 mb-5 nl_reg_box">
    <v-btn
  @click="$router.push({name : '/'})"
  class="pa-0 nl_del_btn">
    <span>삭제</span>
  </v-btn>
    <v-btn
  @click="$router.push({name : 'nregister'})"
  class="pa-0 ml-3 nl_reg_btn">
    <span>등록</span>
  </v-btn>
</v-col>
<v-col class="pa-0 d-flex nl_main_table">
  <!-- <v-col class="pa-0 nl_mt_vc1">주문일자</v-col> -->
  <v-col cols="5

  " class="pa-0 nl_mt_vc2">
    <div class="d-flex btn-group nl_search">
      <v-col
        cols="5"
        lg="4"
        class="pa-0 ml-5 nl_cal"
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
              readonly
            ></v-text-field>
          </template>
          <v-date-picker
            v-if="menu1"
            v-model="date"
            no-title
            @update:model-value="inputClose"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="1" class="pa-0 mr-8 mt-3">~</v-col>
      <v-col
        cols="5"
        lg="4"
        class="pa-0 nl_cal"
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

            ></v-text-field>
          </template>
          <v-date-picker
            v-if="menu2"
            v-model="date2"
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
    class="pa-0 nl_select"
    density="compact"
    hide-details="true"
    placeholder="Category"
    underline="none"
    :items="['번호','제목','내용']"
    >
    </v-select>
  </v-col>
  <v-col cols="4" class="pa-0">
    <v-text-field
    class="v_input_box"
    prepend-inner-icon="mdi-magnify"
    hide-details="true"
    density="compact"
    placeholder="내용 입력"
    >
  </v-text-field>
  </v-col>
    <v-col cols="1" class="pa-0">
    <v-btn
    class="pa-0 ml-1 nl_vbtn"
    >검색</v-btn>
  </v-col>
</v-col>

  <v-table
  class="mt-10 pa-0 nl_list_table"
  density="compact"
  dense
  >
    <thead>
      <tr class="nl_list_table_tr">
        <th><input type="checkbox" class="nl_in_check"></th>
        <th>번호</th>
        <th>제목</th>
        <th>내용</th>
        <th>날짜</th>
        <th>비고</th>
      </tr>
    </thead>
    <tbody>
      <tr
      class="nl_list_table_tb_tr"
      v-for="notice in notices" :key="notice.noticeNumber">
      <td><input type="checkbox" class="nl_in_check"></td>
        <td>{{ notice.noticeNumber }}</td>
        <td>{{ notice.noticeTitle }}</td>
        <td>{{ notice.noticeContent }}</td>
        <td>{{ notice.noticeDate }}</td>
        <td class="pa-0 nl_read_td">

          <v-btn
          @click="$router.push({name:'ndetail'})"
          width="100%"
          color="gray100"
          class="pa-0 nl_read_nd"
          elevation="0"
          >
            <span>상세보기</span>
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      notices: [
        {
          noticeNumber: '001',
          noticeTitle: '김철수',
          noticeContent: '어벤져스: 엔드게임',
          noticeDate: 2,

        },
      ],
      date: new Date(),
      date2: new Date(),
      menu1: false,
      menu2: false,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    computedDateFormatted2() {
      return this.formatDate2(this.date2);
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
      this.date = newDate || new Date();
      this.menu1 = false;
    },
    inputClose2(newDate){
      this.date2 = newDate || new Date();
      this.menu2 = false;
    },
    formatDate(date) {
      if (!date) return null
      return dayjs(date).format('YYYY-MM-DD')
    },
    formatDate2(date2) {
      if (!date2) return null
      return dayjs(date2).format('YYYY-MM-DD')
    },
  },
};
</script>

<style lang="scss">
.nl_read_td{
  border: 1px solid #f5f5f5 !important;
}
.nl_cal{
cursor: pointer;
}
.v-field__overlay{
 position: relative !important;
}
.nl_list_table_tr > th:nth-child(n){
  text-align: center !important;
  background-color: rgb(240, 240, 240) !important;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5 !important;
}
.nl_list_table_tb_tr > td:nth-child(n){
  text-align: center !important;
  border: 1px solid #f5f5f5 !important;
}
.nl_vbtn{
  // max-width: 31px !important;
  // min-width: 80px !important;
  height:40px !important;
  font-size:14px !important;
  font-weight:600 !important;
  background-color: #efefef !important;
  // border: 1px solid rgb(200, 200, 200) !important;
  border-radius: 4px;
  color: rgb(116, 116, 116) !important;
}
.v-table{
  line-height: 0 !important;
}
.nl_main_table{
  text-align: end;
  background-color: rgb(240, 240, 240);
  font-size: 13px;
  font-weight: 500 !important;
  /* text-align: center; */
  align-items: center;
  // max-width: 100%;
  // min-width: 100%;
  height: 43px;
  // min-height: unset !important;
  /* border-bottom: 3px solid rgb(204, 204, 204) !important; */
}

.v_input_box{
  color: #8f8f8f;
}
.v-text-field input{
  color: black !important;
}
// .nl_read_movi:hover:not(table-column){
//   background-color: rgba(6, 141, 141, 0.3);
// }
.nl_read_nd span{
  font-weight: 600;
  color: rgb(97, 97, 97) !important;
}
// .nl_mt_vc{
//   max-width : 10%;
// }

// 등록 버튼
.nl_reg_box{
  width: 100%;
  text-align: end;
}
.nl_reg_btn, .nl_del_btn{
  border: 1px solid rgb(226, 226, 226) !important;
  // background-color: rgb(240, 240, 240);
}
.nl_reg_btn span,.nl_del_btn span{
  font-weight: 600;
  font-size: 14px;
  color: rgb(97, 97, 97) !important;
}
// 체크
.nl_in_check{
  width: 15px;
  height: 15px;
  cursor: pointer;
}

</style>
