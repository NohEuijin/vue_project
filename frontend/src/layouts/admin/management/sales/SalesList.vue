<template>
  <v-col cols="12" class="pa-0 mb-5 mp_reg_box">
    <v-btn
  @click="$router.push({name : '/'})"
  class="pa-0 mp_del_btn">
    <span>삭제</span>
  </v-btn>
    <v-btn
  @click="$router.push({name : 'mpRegister'})"
  class="pa-0 ml-3 mp_reg_btn">
    <span>등록</span>
  </v-btn>
</v-col>
<v-col class="pa-0 d-flex mp_main_table">
  <!-- <v-col class="pa-0 mp_mt_vc1">주문일자</v-col> -->
  <v-col cols="5

  " class="pa-0 mp_mt_vc2">
    <div class="d-flex btn-group mp_search">
      <v-col
        cols="5"
        lg="4"
        class="pa-0 ml-5 mp_cal"
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
        class="pa-0 mp_cal"
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
    class="pa-0 mp_select"
    density="compact"
    hide-details="true"
    placeholder="Category"
    underline="none"
    :items="['주문번호','아이디','주문상품']"
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
    class="pa-0 ml-1 mp_vbtn"
    >검색</v-btn>
  </v-col>
</v-col>

  <v-table
  class="mt-10 pa-0 mp_list_table"
  density="compact"
  dense
  >
    <thead>
      <tr class="mp_list_table_tr">
        <th><input type="checkbox" class="mp_in_check"></th>
        <th>주문번호</th>
        <th>아이디</th>
        <th>주문 상품</th>
        <th>총 주문수량</th>
        <th>총 금액</th>
        <th>주문 날짜</th>
        <th>비 고</th>
      </tr>
    </thead>
    <tbody>
      <tr
      class="mp_list_table_tb_tr"
      v-for="order in orders" :key="order.orderNumber">
      <td><input type="checkbox" class="mp_in_check"></td>
        <td>{{ order.orderNumber }}</td>
        <td>{{ order.orderAccount }}</td>
        <td>{{ order.orderProducts }}</td>
        <td>{{ order.totalQuantity }}</td>
        <td>{{ order.totalAmount }}</td>
        <td>{{ order.orderDate }}</td>
        <td class="pa-0 mp_read_td">

          <v-btn
          @click="$router.push({name:'mpdetail'})"
          width="100%"
          color="gray100"
          class="pa-0 mp_read_movie"
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
      orders: [
        {
          orderNumber: '001',
          orderAccount: '김철수',
          orderProducts: '어벤져스: 엔드게임',
          totalQuantity: 2,
          totalAmount: 30000,
          orderDate: '2024-04-10',
          remarks: '3D 상영'
        },
        {
          orderNumber: '002',
          orderAccount: '이영희',
          orderProducts: '스파이더맨: 파 프롬 홈',
          totalQuantity: 3,
          totalAmount: 45000,
          orderDate: '2024-04-11',
          remarks: 'IMAX 상영'
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
.mp_read_td{
  border: 1px solid #f5f5f5 !important;
}
.mp_cal{
cursor: pointer;
}
.v-field__overlay{
 position: relative !important;
}
.mp_list_table_tr > th:nth-child(n){
  text-align: center !important;
  background-color: rgb(240, 240, 240) !important;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5 !important;
}
.mp_list_table_tb_tr > td:nth-child(n){
  text-align: center !important;
  border: 1px solid #f5f5f5 !important;
}
.mp_vbtn{
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

.mp_main_table{
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
// .mp_read_movi:hover:not(table-column){
//   background-color: rgba(6, 141, 141, 0.3);
// }
.mp_read_movie span{
  font-weight: 600;
  color: rgb(97, 97, 97) !important;
}
// .mp_mt_vc{
//   max-width : 10%;
// }

// 등록 버튼
.mp_reg_box{
  width: 100%;
  text-align: end;
}
.mp_reg_btn, .mp_del_btn{
  border: 1px solid rgb(226, 226, 226) !important;
  // background-color: rgb(240, 240, 240);
}
.mp_reg_btn span,.mp_del_btn span{
  font-weight: 600;
  font-size: 14px;
  color: rgb(97, 97, 97) !important;
}
// 체크
.mp_in_check{
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>
