<template>
      <v-col cols="12" class="pa-0 mb-5 ms_dt_submit_box">
     <v-btn
     @click="$router.push({name:'membership'})"
     class="pa-0 ms_dt_submit">
      <span>목록</span>
    </v-btn>
    <!-- <v-btn
     @click="$router.push({name:'mpmodify'})"
     class="pa-0 ml-3 ms_dt_submit">
      <span>수정</span>
    </v-btn> -->
    <v-btn
     @click="$router.push({name:'mainposter'})"
     class="pa-0 ml-3 ms_dt_submit">
      <span>탈퇴</span>
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
          <span>1</span>
        </td>
        <td class="bg-gray100">휴대폰번호</td>
        <td>
          <span>01023588910</span>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">아이디</td>
        <td>
          <span>shdmlwls2</span>
        </td>
        <td class="bg-gray100" rowspan="3">주소</td>
        <td>
          <span>701756</span>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">이름</td>
        <td>
          <span>조용팔</span>
        </td>
        <td>
          <span>서울시 독산동 독산주공아파트</span>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">이메일</td>
        <td>
          <span>shdmlwls2@naver.com</span>
        </td>
        <td>
          <span> 104동 110</span>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-container class="d-flex pa-0 mt-10">
  <v-col cols="6">
    <v-card-title class="pa-0">
    <strong>게시글</strong>
  </v-card-title>
  <v-col class="pa-0 mt-5 msd_board_list">
    <table>
      <thead>
        <tr class="msd_th_list">
          <th>제목</th>
          <th>작성일</th>
          <th>댓글</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr class="msd_td_list">
          <td>제목이다</td>
          <td>작성일이다</td>
          <td>댓글이다</td>
          <td>조회이다</td>
        </tr>
      </tbody>
    </table>
  </v-col>
  </v-col>
  <v-col cols="6">
    <v-card-title class="pa-0">
    <strong>구매내역</strong>
  </v-card-title>
  <v-col class="pa-0 mt-5 msd_board_list">
    <table>
      <thead>
        <tr class="msd_th_list2">
          <th>주문상품</th>
          <th>총수량</th>
          <th>총금액</th>
          <th>주문날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr class="msd_td_list2">
          <td>주문상품이다</td>
          <td>총수량이다</td>
          <td>총금액이다</td>
          <td>주문날짜이다</td>
        </tr>
      </tbody>
    </table>
  </v-col>
  </v-col>
  </v-container>

</v-form>
</template>

<script>
export default {
  data() {
    return {
      mainImgPreview:'',
      subImgPreviews:[],
    };
  },
  methods: {
    handleMainImgChange(event) {
      const file = event.target.files[0];
      this.mainImgPreview = URL.createObjectURL(file);
    },
    handleSubImgChange(event) {
      const files = event.target.files;
      const newFiles = Array.from(files).slice(0, 4);
      this.subImgPreviews = [];
      console.log(files)
      console.log(newFiles)
      for (let i = 0; i < newFiles.length; i++) {
        this.subImgPreviews.push(URL.createObjectURL(newFiles[i]));
      }
    }
  },
  created() {

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
  width: 100%;
  height: 400px;
  border-radius: 4px;
}
table{
  width: 100%;
}
// 게시글 테이블
.msd_th_list > th:nth-child(n){
  text-align: center !important;
  background-color: rgb(240, 240, 240) !important;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5 !important;
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
  width: 50px;
}
.msd_td_list > td:nth-child(n){
  text-align: center !important;
  border: 1px solid #f5f5f5 !important;
}
.msd_th_list2 > th:nth-child(n){
  text-align: center !important;
  background-color: rgb(240, 240, 240) !important;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5 !important;
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
}

</style>
