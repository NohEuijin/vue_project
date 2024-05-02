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
          <span>
             {{ user.id }}
          </span>
        </td>
        <td class="bg-gray100">휴대폰번호</td>
        <td>
          <span>{{ user.phone }}</span>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">아이디</td>
        <td>
          <span>{{ user.username }}</span>
        </td>
        <td class="bg-gray100" rowspan="3">주소</td>
        <td>
          <span>{{ user.addressZipCode }}</span>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">이름</td>
        <td>
          <span>{{ user.name }}</span>
        </td>
        <td>
          <span>{{ user.address }}</span>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">이메일</td>
        <td>
          <span>{{ user.email }}</span>
        </td>
        <td>
          <span>{{ user.addressDetail }}</span>
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
        <tr
        v-for="(freeboards, index) of freeboardList" :key="index"
        class="msd_td_list">
          <td>
            {{ truncateText(freeboards.title || "Null" , 30) }}
          </td>
          <td>
            {{ formatDate(freeboards.created_at || "Null")  }}
          </td>
          <td>
            {{ freeboards.replycount }}
          </td>
          <td>
            {{ freeboards.viewcount || "0" }}
          </td>
        </tr>
      </tbody>
    </table>
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
<!-- <div class="pagination">
<ol>
<li v-for="pageNumber in page_count" :key="`page-${pageNumber}`">
  <a class="strong_p"
      :class="[start_page === pageNumber ? 'text-red' : null]"
      @click="clickPagination(pageNumber)">
    {{ pageNumber }}
  </a>
</li>
</ol>
</div> -->
    <!-- <div class="pagination">
      <ol>
        <li>
          <a class="strong_p">
          1
          </a>
          <a class="strong_p">
          2
          </a>
          <a class="strong_p">
          3
          </a>
          <a class="strong_p">
          4
          </a>
          <a class="strong_p">
          5
          </a>
        </li>
      </ol>
    </div> -->
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
      user:'',
      replycount:'',
      start_page:1,
      total_page:0,
      items_per_page:9,
      freeboardList:[],
    };
  },
  methods: {
    async getuserDetail(){
      try{
        let form = {
          id: this.$route.params.id,
          start: (this.start_page - 1) * this.items_per_page,
          limit: this.items_per_page
        }
        let res = await this.$store.dispatch('userDetail',form);
        // console.log(form)
        // console.log(res)
        this.user = res.users[0]
        let new_board_list = []
        if(Array.isArray(res.freeBoards) && res.freeBoards.length > 0){
          for(let i = 0; i < res.freeBoards.length; i++){
            let el = res.freeBoards[i]
            el["replycount"] = el.replies.length
            new_board_list.push(el)
          }
        }
        this.freeboardList = new_board_list
        this.total_page = res.freeBoardsConnection.aggregate.count
        console.log(this.page_count)
        }catch(err){
          console.log(err)
      }
    },
    formatDate(dateString){
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year} - ${month} - ${day}`;
  },
  clickPagination(value){
    console.log(this.value)
    console.log(value)
    this.start_page = value
    this.getuserDetail()
  },
  truncateText(text,maxLength){
    if(text.length > maxLength){
      return text.substring(0, maxLength) + '...';
    }
    return text;
  },
  },
  computed:{
    page_count() {
    return this.total_page === 0 ? 0 : Math.floor((this.total_page / this.items_per_page)) +
      (this.total_page % this.items_per_page > 0 ? 1 : 0);
  },
  },
  async mounted(){
    await this.getuserDetail();
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

</style>
