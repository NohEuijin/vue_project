<template>
  <v-col cols="12" class="pa-0 mb-5 ms_dt_submit_box">
  <v-btn
  @click="$router.push({name:'ttDetail',params:{id:theater.id}})"
 class="pa-0 ml-3 ms_dt_submit">
  <span>이전</span>
</v-btn>
<v-btn
 @click="updateTheater"
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
      <span>
      <input
      v-model="theater.name"
      @input="nameCheck"
      placeholder="몇 관인지 입력해주세요"
      type="text">
      </span>
    </td>
  </tr>
  <tr>
    <td class="bg-gray100">지역</td>
    <td>
      <span>
      <input
      v-model="theater.city"
      placeholder="지역을 입력해주세요"
      type="text">
      </span>
    </td>
    <td class="bg-gray100">지점</td>
    <td>
      <input
        v-model="theater.title"
        placeholder="지점명을 입력해주세요"
        type="text">
      </td>
  </tr>
</tbody>
</v-table>



<v-container class="d-flex pa-0 mt-10">
<v-col cols="12" class="pa-0">
<v-card-title class="pa-0">
<strong>좌석 배치도</strong>
</v-card-title>
<v-col cols="12" class="pa-0 mb-5 ms_dt_submit_box">
<v-btn
 @click="resetBtn"
 class="pa-0 ml-3 ms_dt_submit">
  <span>초기화</span>
</v-btn>
<v-btn
 @click="middleUpdate"
 class="pa-0 ml-3 ms_dt_submit">
  <span>적용</span>
</v-btn>
<!-- <v-btn
 @click="$router.push({name:'ttModify',param:{id:theater.id}})"
 class="pa-0 ml-3 ms_dt_submit">
  <span>수정</span>
</v-btn> -->
</v-col>
<v-table
class="pa-0 ms_dt_table"
density="compact"
dense
>
<tbody class="tt_detail_body">
  <tr>
    <td class="bg-gray100">규모</td>
    <td class="ttd_ratio_box">
      <input
      v-model="horizontalSeat"
      @input="changeSeatFormat()"
      type="text" name="" id="">
      <span class="mt-1">x</span>
      <input
      v-model="verticalSeat"
      @input="changeSeatFormat()"
      type="text" name="" id="">
    </td>
    <td class="bg-gray100">복도</td>
    <td class="ttd_bokdo_box">
      <span class="mt-0 mr-2 ttd_bokdo_total">
        갯수(
          <input
          v-model="bokdoTotal"
          @input="changeSeatFormat()"
          type="text">)
          <span v-if="bokdoTotal !== 0 ">  = </span>
      </span>
      <span v-for="(bokdoItem, bIndex) of bokdoList" :key="bIndex">

      <input
      v-model="bokdoList[bIndex]"
      @input="changeSeatFormat()"
      type="text">
    </span>
    </td>
  </tr>
  <tr>
    <td class="bg-gray100">좌석</td>
    <td>
      {{ total_seat }}
      <!-- <input
      v-model="total_seat"
      @input="changeSeatFormat()" type="text" readonly> -->
    </td>
    <td class="bg-gray100" >빈공간</td>
    <td class="ttd_blank_box" colspan="2">
      <span v-for="(blankItem, bIndex) of blankList" :key="bIndex">
        <input
        v-model="blankList[bIndex]"
        @input="changeSeatFormat()"
        @blur="blankBlur(bIndex)"
        type="text" name="" id="">
      </span>
      <button
      @click="blankAllDel"
      class="ttd_blank_all">All</button>
    </td>
  </tr>
</tbody>
</v-table>
<v-col class="pb-0">
<span>
  * 적용(중간저장) : 초기화 불가능
</span>
</v-col>
<v-col class="pt-1 pb-0">
<span>
  * 초기화(기본값)
</span>
</v-col>
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
    <span v-if="seat !== 'corridor'"  @click="getSelectedSeatValue(seat)">{{ seat }}</span>
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
  horizontalSeat:'',
  verticalSeat:'',
  newHorizontalSeat:'',
  newVerticalSeat:'',
  bokdoList:[],
  blankList:[],
  seatValue:[],
  bokdoTotal:'',
  blankListValue:'',
  showBokdo: true,
  showBlank: true,
  sample_array:[],
  total_seat:'',
  name:'',
  city:'',
  title:'',
};
},
methods: {
  //등록
async registeTheater(){
  const ratio = `${this.horizontalSeat}x${this.verticalSeat}`
  const bokdoString = this.bokdoList.join(',');
  const blankString = this.blankList.join(',');
  const form = {
    name:this.name,
    city:this.city,
    title:this.title,
    ratio : ratio,
    bokdo : bokdoString,
    blank : blankString,
    total : String(this.total_seat)
  }
  console.log(form)
  if(!this.name || this.name.trim() === '' ){
        alert("관을 입력 해주세요!!")
        return;
      }
  if(!this.city || this.city.trim() === ''){
    alert("지역을 입력 해주세요!!")
    return;
  }
  if(!this.title || this.title.trim() === ''){
    alert("지점을 입력 해주세요!!")
    return;
  }

  let confirmRegister = confirm("등록하시겠니까?")
  if(confirmRegister){
  await this.$store.dispatch('createTheater',form)
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
  this.$router.push({name:'theater'})
  }else{
    return
  }
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
//삭제
async deleteTheater() {
  const deleteconfirm = confirm("삭제 하시겠습니까?")
    if(deleteconfirm){
      await this.$store.dispatch('deleteTheater', { id: this.theater.id });
      this.$router.push({name:'theater'})
    }
},
//좌석
totalSeat(){
  this.total_seat = Number(this.verticalSeat) * Number(this.horizontalSeat) - this.blankList.length
  // console.log(this.total_seat)

  if(this.total_seat <0){
    this.total_seat = "빈공간을 정리해주세요!"
  }
},
// 좌석 배치도 업데이트
async updateTheater(){
  const ratio = `${this.horizontalSeat}x${this.verticalSeat}`
  const bokdoString = this.bokdoList.join(',');
  const blankString = this.blankList.join(',');
  const form = {
    id : this.theater.id,
    name:this.theater.name,
    city:this.theater.city,
    title:this.theater.title,
    ratio : ratio,
    bokdo : bokdoString,
    blank : blankString,
    total : String(this.total_seat),
  }
  if(!this.theater.name || this.theater.name.trim() === '' ){
        alert("관을 입력 해주세요!!")
        return;
      }
  if(!this.theater.city || this.theater.city.trim() === ''){
    alert("지역을 입력 해주세요!!")
    return;
  }
  if(!this.theater.title || this.theater.title.trim() === ''){
    alert("지점을 입력 해주세요!!")
    return;
  }

  const updateConfirm = confirm("수정 하시겠습니까?")
  if(updateConfirm){
    await this.$store.dispatch('updateTheater',form)
    .then((res)=>{
      // console.log(res)
      this.$router.push({name:'ttDetail',params:{id:this.theater.id}})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
},
// 좌석 배치도 업데이트
async middleUpdate(){
  const ratio = `${this.horizontalSeat}x${this.verticalSeat}`
  const bokdoString = this.bokdoList.join(',');
  const blankString = this.blankList.join(',');
  const form = {
    id : this.theater.id,
    ratio : ratio,
    bokdo : bokdoString,
    blank : blankString,
    total : String(this.total_seat),
  }
    await this.$store.dispatch('updateTheater',form)
    .then((res)=>{
      // console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  // const updateConfirm = confirm("적용하시면 초기화 하실 수 없습니다! 적용 하시겠습니까?")
  // if(updateConfirm){
  //   await this.$store.dispatch('updateTheater',form)
  //   .then((res)=>{
  //     // console.log(res)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }
},

changeSeatFormat(){
  this.ratioCheck();
  this.bokdoCheck();
  this.blankCheck();
  this.bokdoListCheck();
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
//빈공간(빈값체크)
blankBlur(index) {
  setTimeout(() => {
    if (this.blankList[index] === '') {
      this.blankList.splice(index, 1);
    }
  },100);
},
//복도(빈값체크)
// bokdoBlur(index) {
//   setTimeout(() => {
//     if (this.bokdoList[index] === '') {
//       this.bokdoList.splice(index, 1);
//     }
//   },100);
// },
//빈공간 모두 비우기
blankAllDel(){
  this.blankList = [];
  this.changeSeatFormat();
},
// 날짜폼
formatDate(dateString){
const date = new Date(dateString);
const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
return `${year} - ${month} - ${day}`;
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
},
//좌석 값()
generatedSeatValue(vIndex, hIndex) {
  return String.fromCharCode(65 + vIndex) + (hIndex + 1);
},
//좌석 값() 가지고 오기 -> 빈 공간에 추가
getSelectedSeatValue(seat) {

  const seatIndex = this.blankList.indexOf(seat);
  // console.log(seatIndex)
  //좌석 추가 제거
  if(seatIndex !== -1) {
  this.blankList.splice(seatIndex, 1);
} else {
  this.blankList.push(seat);
  this.totalSeat();
}
},
nameCheck(){
    if (!this.name.includes("관")) {
    this.name += "관";
  }
  if (this.name.length > 3) {
    this.name = this.name.substring(0, 3);
  }
},
// 규모 값 체크
ratioCheck(){
const numberCheck = /^[0-9]*$/;
  if (!numberCheck.test(this.horizontalSeat)) {
  this.horizontalSeat = '0';
}else {
  this.horizontalSeat = parseInt(this.horizontalSeat);
  if (this.horizontalSeat > 30) {
    this.horizontalSeat = 30;
  }else if(isNaN(this.horizontalSeat)){
    this.horizontalSeat = 1
  }
}
if (!numberCheck.test(this.verticalSeat)) {
  this.verticalSeat = '0';
}else {
  this.verticalSeat = parseInt(this.verticalSeat);
  if (this.verticalSeat > 26) {
    this.verticalSeat = 26;
  }else if(isNaN(this.verticalSeat)){
    this.verticalSeat = 1
  }
}
},
//빈공간 체크
blankCheck() {
for (let i = 0; i < this.blankList.length; i++) {
const value = this.blankList[i];
if (!/^(?:[A-Z]|[A-Z][1-9][0-9]?)$/.test(value)) {
    this.blankList[i] = '';
} else {
    const letter = value.charAt(0);
    let numbers = value.substring(1);
    if (!numbers) {
        numbers = '';
    } else {
        numbers = Math.min(parseInt(numbers), 30).toString();
    }
    this.blankList[i] = letter + numbers;
}
}
},
//복도 리스트 값 체크
bokdoListCheck(){
  const numberCheck = /^[0-9]*$/;
  for (let i = 0; i < this.bokdoList.length; i++) {
  if ( !numberCheck.test(this.bokdoList[i])) {
    this.bokdoList[i] = '0';
  } else {
    let value = parseInt(this.bokdoList[i]);
    if (isNaN(value) || value > 29) {
      value = 29;
    }
    this.bokdoList[i] = value.toString();
  }
}
},
// 복도 값 체크
bokdoCheck(){
  const numberCheck = /^[0-9]*$/;
  for (let i = 0; i < this.bokdoTotal.length; i++) {
if (!numberCheck.test(this.bokdoTotal)) {
  this.bokdoTotal = '0';
}else {
  this.bokdoTotal = parseInt(this.bokdoTotal);
  if (this.bokdoTotal > 5) {
    this.bokdoTotal = 5;
  }
}
}
this.bokdoList.length = this.bokdoTotal
  // console.log(this.bokdoList.length)
  // console.log(this.bokdoTotal)
},

},
  // 페이지 로딩 시점, 상세페이지 불러오기
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
height: auto;
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
.screen{
width: 100%;
height: 10%;
// background-color:#e4e4e4 ;
text-align: center;
justify-content: center;
font-size: 30px;
}
.seatbox{
min-width: 1px !important;
max-width: 24px !important;
width: 24px ;
height: 20px;
border: 1px solid black;
border-top-left-radius: 4px;
border-top-right-radius: 4px;
// text-align: center;
opacity: 1;
// background-color: black;

  > span{
  cursor: pointer;
  font-size: 10px;
  }

  &.seat_blank {
  opacity: 0;
  }
}

.corridor{
opacity: 0;
}
.ttd_ratio_box input{
margin-top: 2px;
width: 45px;
font-weight: 500 !important;
border: 1px solid #f5f5f5;
text-align: center
}
.ttd_blank_box{
min-width: 100px;
height: auto;
}
.ttd_blank_box input{
margin-top: 2px;
width: 48px;
font-weight: 500 !important;
border: 1px solid #f5f5f5;
text-align: center
}
.ttd_bokdo_box input{
margin-top: 2px;
width: 45px;
font-weight: 500 !important;
border: 1px solid #f5f5f5;
text-align: center
}
.ttd_blank_all{
  margin-top: 2px;
  width: 48px;
  height: 30px;
  font-weight: 600 !important;
  border: 1px solid #f5f5f5;
  text-align: center;
  border-radius: 4px;
  background-color: #f5f5f5;
}
.verticalSeat{
// max-width: 100%;
// text-align: center !important;
// justify-content: center !important;
// align-items: center !important;
}
.ttd_table_width{
min-width: 200px;
}
// .ttd_bokdo_total{
//   font-size: 13px;
//   font-weight: 500;
// }

.tt_detail_body>tr> td:nth-child(1){
  min-width: 30px !important;
  max-width: 25px !important;
}
.tt_detail_body >tr> td:nth-child(2){
  min-width: 100px !important;
  max-width: 25px !important;

}
.tt_detail_body >tr> td:nth-child(3){
  min-width: 30px !important;
  max-width: 25px !important;

}
.tt_detail_body>tr > td:nth-child(4){
  min-width: 200px !important;
  max-width: 25px !important;

}
</style>
