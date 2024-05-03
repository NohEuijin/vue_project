<template>
      <v-col cols="12" class="pa-0 mb-5 ms_dt_submit_box">
    <v-btn
     @click="resetBtn"
     class="pa-0 ml-3 ms_dt_submit">
      <span>초기화</span>
    </v-btn>
    <v-btn
     @click="$router.push({name:'mpmodify'})"
     class="pa-0 ml-3 ms_dt_submit">
      <span>적용</span>
    </v-btn>
    <v-btn
     @click="$router.push({name:'mainposter'})"
     class="pa-0 ml-3 ms_dt_submit">
      <span>수정</span>
    </v-btn>
    <v-btn
     @click="$router.push({name:'mainposter'})"
     class="pa-0 ml-3 ms_dt_submit">
      <span>삭제</span>
    </v-btn>
    <v-btn
     @click="$router.push({name:'theater'})"
     class="pa-0 ml-3 ms_dt_submit">
      <span>목록</span>
    </v-btn>
   </v-col>
  <v-form
  @submit.prevent="{submit, cancel}"
  id="goods-img-form"
  enctype="multipart/form-data"
  >
    <v-table
    class="pa-0 ms_dt_table"
    density="compact"
    dense
    >
    <tbody>
      <tr>
        <td class="bg-gray100">번호</td>
        <td>
          <span>
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
        <td class="bg-gray100">규모</td>
        <td class="d-flex ttd_ratio_box">
          <input
          v-model="horizontalSeat"

          type="text" name="" id="">
          <span class="mt-1">x</span>
          <input
          v-model="verticalSeat"
          type="text" name="" id="">
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">지점</td>
        <td>
          <span>{{ theater.title }}</span>
        </td>
        <td class="bg-gray100">복도</td>
        <td class="d-flex ttd_bokdo_box">
          <span v-for="(bokdoItem, bIndex) of bokdoList" :key="bIndex">
          <input v-model="bokdoList[bIndex]" type="text">
        </span>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100"></td>
        <td>
          <span>{{  }}</span>
        </td>
        <td class="bg-gray100">빈공간</td>
        <td  class="d-flex ttd_blank_box">
          <span v-for="(blankItem, bIndex) of blankList" :key="bIndex">
            <input v-model="blankList[bIndex]" type="text" name="" id="">
          </span>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-container class="d-flex pa-0 mt-10">
  <v-col cols="12">
    <v-card-title class="pa-0">
    <strong>좌석 배치도</strong>
  </v-card-title>
    <v-col class="pa-7 mt-5 msd_board_list">
      <v-col class="pa-0 mb-12 screen">S C R E E N</v-col>
      <v-col
        v-for="(vertical, vIndex) of verticalSeat"
        :key="vIndex"
        class="pa-0 ma-0 verticalSeat"
      >
  <v-row class="pa-0 ma-0">
    <v-col
      v-for="(horizontal, hIndex) of horizontalSeat"
      :key="hIndex"
      class="pa-1 ma-1 seatbox"
    >
      {{ String.fromCharCode(65 + vIndex) }}{{ hIndex + 1 }}
    </v-col>
  </v-row>
</v-col>

    </v-col>
  </v-col>
  </v-container>

</v-form>
</template>

<script>
export default {
  data() {
    return {
      theater:'',
      start_page:1,
      total_page:0,
      items_per_page:9,
      freeboardList:[],
      horizontalSeat:'',
      verticalSeat:'',
      bokdoList:[],
      blankList:[],
    };
  },
  methods: {
    //상세페이지 불러오기
    async gettheaterDetail(){
      try{
        let res = await this.$store.dispatch('theaterDetail',{id: this.$route.params.id});
        // console.log(res)
        for(let i = 0; i< res.theaters.length; i++){
          res.theaters[i].ratio = res.theaters[i].ratio.split('x')
        }
        this.theater = res.theaters[0]
        this.horizontalSeat = Number(this.theater.ratio[0])
        this.verticalSeat = Number(this.theater.ratio[1])
      
        for(let bd = 0; bd< res.theaters.length; bd++){
          res.theaters[bd].bokdo = res.theaters[bd].bokdo.split(',')
        }
        this.bokdoList = this.theater.bokdo

        for(let bk = 0; bk< res.theaters.length; bk++){
          res.theaters[bk].blank = res.theaters[bk].blank.split(',')
        }
        this.blankList= this.theater.blank

        }catch(err){
          console.log(err)
      }
    },
    // 날짜폼
    formatDate(dateString){
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year} - ${month} - ${day}`;
  },
  //클릭시 페이징
  clickPagination(value){
    console.log(this.value)
    console.log(value)
    this.start_page = value
    this.gettheaterDetail()
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
  }
  },
  computed:{
    //페이지 카운터
    page_count() {
    return this.total_page === 0 ? 0 : Math.floor((this.total_page / this.items_per_page)) +
      (this.total_page % this.items_per_page > 0 ? 1 : 0);
  },
  },
  //페이지 로딩 시점, 상세페이지 불러오기
  async mounted(){
    await this.gettheaterDetail();
  },
};
</script>

<style lang="scss">
.ms_dt_table{
  border: 1px solid rgb(226, 226, 226) !important;
  text-align: start;
  font-weight: 600;
}
.ms_dt_table td{
  border: 1px solid rgb(226, 226, 226) !important;
}
.ms_dt_table input{
  width: 100%;
  height: 30px;
  padding: 10px;
  border-radius: 4px;
  font-weight: 500 !important;
}
.ms_dt_table textarea{
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  font-weight: 500 !important;
  resize: none;
}
// 등록 버튼
.ms_dt_submit_box{
  width: 100%;
  text-align: end;
}
.ms_dt_submit{
  // position: absolute;
  border: 1px solid rgb(226, 226, 226) !important;
  // background-color: rgb(240, 240, 240);
}
.ms_dt_submit span{
  font-weight: 600;
  font-size: 14px;
  color: rgb(97, 97, 97) !important;
}
.msd_board_list{
  border: 1px solid #b9b9b9 !important;
  // max-width: 100%;
  // min-width: 100%;
  height: auto;
  border-radius: 4px;
  text-align: center;
  justify-content: center !important;
  align-items: center !important;
  display: grid;
}
table{
  // width: 100%;
}
// 게시글 테이블
.msd_th_list > th:nth-child(n){
  text-align: center !important;
  background-color: rgb(240, 240, 240) !important;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5 !important;
  height: 30px;
  font-size: 13px;
}
.msd_th_list > th:nth-child(1){
  width: 300px;
}
.msd_th_list > th:nth-child(2){
  width: 100px;
}
.msd_th_list > th:nth-child(3){
  width: 70px;
}
.msd_th_list > th:nth-child(4){
  width: 70px;
}
.msd_td_list > td:nth-child(n){
  text-align: center !important;
  border: 1px solid #f5f5f5 !important;
  height: 30px;
  // font-size: 13px;
}
.msd_th_list2 > th:nth-child(n){
  text-align: center !important;
  background-color: rgb(240, 240, 240) !important;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5 !important;
  height: 30px;
  font-size: 13px;
}
.msd_th_list2 > th:nth-child(1){
  width: 250px;
}
.msd_th_list2 > th:nth-child(2){
  width: 100px;
}
.msd_th_list2 > th:nth-child(3){
  width: 70px;
}
.msd_th_list2 > th:nth-child(4){
  width: 100px;
}
.msd_td_list2 > td:nth-child(n){
  text-align: center !important;
  border: 1px solid #f5f5f5 !important;
  height: 30px;
  // font-size: 13px;
}
.screen{
  width: 100%;
  height: 10%;
  // background-color:#e4e4e4 ;
  text-align: center;
  justify-content: center;
  font-size: 30px;
}
.seatbox{
  // margin-top: 30px !important;
  // max-width: 77px !important;
  min-width: 1% !important;
  // height: 15px;
  border: 1px solid black;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  // text-align: center;
  // background-color: black;
}
.ttd_ratio_box input{
  margin-top: 2px;
  width: 45px;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5;
  text-align: center
}
.ttd_blank_box{
  min-width: 100px;
}
.ttd_blank_box input{
  margin-top: 2px;
  width: 45px;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5;
  text-align: center
}
.ttd_bokdo_box input{
  margin-top: 2px;
  width: 45px;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5;
  text-align: center
}
.verticalSeat{
  // max-width: 100%;
  // text-align: center !important;
  // justify-content: center !important;
  // align-items: center !important;
}
</style>
