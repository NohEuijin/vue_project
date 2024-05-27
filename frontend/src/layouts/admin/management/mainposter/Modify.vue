<template>
  <v-form
  id="goods-img-form"
  >
    <v-col cols="12" class="pa-0 mp_dt_submit_box">
    <v-btn
     @click="posterModifyFrom"
     class="pa-0 mp_dt_submit">
      <span>수정</span>
    </v-btn>
    <v-btn
     @click=deletePoster
     class="pa-0 mp_dt_submit">
      <span>삭제</span>
    </v-btn>
    <v-btn
     @click="$router.push({name:'mainposter'})"
     class="pa-0 mp_dt_submit">
      <span>목록</span>
    </v-btn>
   </v-col>
    <v-table
    class="pa-0 mp_dt_table"
    dense
    >
    <tbody>
      <tr>
        <td class="bg-gray100">제목</td>
        <td>
          <input
          type="text"
          placeholder="제목입력"
          v-model="poster.name"
          />
        </td>
        <td class="bg-gray100">장르</td>
        <td>
          <input
          type="text"
          placeholder="장르입력"
          v-model="poster.genre"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">상영일</td>
        <td class="mm_search2">
    <div class="d-flex btn-group mr_search">
      <v-col
        cols="4"
        lg="4"
        class="pa-0 ml-2 ms_cal"
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
              class="calendar_text"
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
      <v-col cols="1" class="pa-0 mt-5">~</v-col>
      <v-col
        cols="4"
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
              class="calendar_text"
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
        </td>
        <td class="bg-gray100">감독</td>
        <td>
          <input
          type="text"
          placeholder="감독 입력"
          v-model="poster.director"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">상영시간</td>
        <td>
          <input
          type="text"
          placeholder="상영 시간 입력"
          v-model="poster.showtime"
          />
        </td>
        <td class="bg-gray100" rowspan="2">출연</td>
        <td rowspan="2">
          <v-textarea
          type="text"
          hide-details
          variant="plain"
          placeholder="출연진 입력"
          density="compact"
          v-model="poster.appearance"
          ></v-textarea>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">관람연령</td>
        <td>
          <!-- <input
          type="text"
          placeholder="연령 입력"
          v-model="viewage"
          /> -->
          <v-select
          class="pa-1 ml-2 items_select"
          :items="age_item"
          hide-details
          variant="plain"
          density="compact"
          v-model="poster.viewage"
          >
          </v-select>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">줄거리</td>
        <td colspan="4">
          <v-textarea
          type="text"
          placeholder="줄거리 입력"
          hide-details
          variant="plain"
          density="compact"
          v-model="poster.summary"
          ></v-textarea>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-container class="pa-3 mt-10">
    <v-card-title class="pa-0">
      <strong>포스터</strong>
    </v-card-title>
    <div class="goods-imgs-wrap">
  <!-- 메인 포스터 이미지 -->
  <div class="goods-main-img-file">
    <input
    type="file"
    @change="handleMainImgChange"
    name="goodsMainImg"
    id="goods-main-img"
    accept="image/*"/>
  </div>
  <!-- 서브 포스터 이미지 -->
  <div class="goods-detail-img-file">
    <input
    type="file"
    @change="handleSubImgChange"
    name="goodsDetailImg"
    id="goods-detail-img"
    accept="image/*"
    multiple/>
  </div>
  <!-- 메인 및 상세 이미지 미리보기가 표시될 영역 -->
  <div class="image-lists">
    <ul class="image-lists-ul">
      <!-- 미리보기는 여기에 표시됩니다 -->
      <div class="goods-main-img-p">
        <img
        v-if="mainImgPreview"
        :src="mainImgPreview"
        alt="Main Image Preview"
        class="preview-image">
        <div class="img-title">
            <span>메인 포스터 사진</span>
        </div>
    </div>

    <div v-for="(subImgPreview, index) in subImgPreviews" :key="index" class="goods-detail-img-p">
      <div v-if="subImgPreview" >
        <img :src="subImgPreview" :alt="'Detail Image Preview ' + (index + 1)" class="preview-image">
        <div class="img-title" >
          <span>서브 포스터 사진-{{ index + 1 }}</span>
        </div>
      </div>
    </div>
    <li v-if="subImgPreviews.length === 0" class="goods-detail-img-p">
      <div class="img-title">
        <span>서브 포스터 사진</span>
      </div>
    </li>
      <!--  -->
    </ul>
  </div>
</div>
  </v-container>

</v-form>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    const today = new Date();
    return {
      mainImgPreview:'',
      subImgPreviews:[],
      poster:{
        name:'',
        genre:'',
        director:'',
        appearance:'',
        viewage:'',
        showtime:'',
        starttime:'',
        endtime:'',
        summary:'',
        mainposter:'',
      },

      stillcut:[],
      age_item : ['all','r12','r15','r19'],
      menu1:false,
      menu2:false,
      today:today,
      start_date:new Date(today.getFullYear(), today.getMonth(), 1),
      end_date:new Date(today.getFullYear(), today.getMonth() + 1, 0),
    };
  },
  methods: {
    async uploadImgs(){
console.log(this.poster.mainposter)
      if(!this.poster.mainposter?.id){
        await this.$store.dispatch('upload',{files:this.poster.mainposter}).then((res) => {
          console.log(res,'메인이미지');
          this.poster.mainposter['id'] = res.data[0].id
        })
      }
      for(let i = 0 ; i < this.stillcut.length; i++){
        if(!this.stillcut[i].id){
          await this.$store.dispatch('upload',{files:this.stillcut[i]}).then((res) => {
            console.log(res, '스틸컷');
            this.stillcut[i]['id'] = res.data[0].id
          })
        }
      }
    },
    handleMainImgChange(event) {
      const file = event.target.files[0];
      this.mainImgPreview = URL.createObjectURL(file);
      this.poster.mainposter = file;

    },
    handleSubImgChange(event) {
      const files = event.target.files;
      const newFiles = Array.from(files).slice(0, 4);
      this.subImgPreviews = [];

      for (let i = 0; i < newFiles.length; i++) {
        this.subImgPreviews.push(URL.createObjectURL(newFiles[i]));
      }
      this.stillcut = files
      // console.log(this.stillcut)
    },
    async posterModifyFrom(){
      await this.uploadImgs();
      let still_id = []
      for(let i = 0; i < this.stillcut.length;i++){
        still_id.push(this.stillcut[i].id)
      }
      const form = {
        id : this.poster.id,
        name : this.poster.name,
        genre : this.poster.genre,
        director : this.poster.director,
        appearance : this.poster.appearance,
        viewage : this.poster.viewage,
        showtime : parseInt(this.poster.showtime),
        starttime : this.poster.starttime,
        endtime : this.poster.endtime,
        summary : this.poster.summary,
        mainposter : this.poster.mainposter.id,
        stillcut : still_id,
      }
      // console.log(form);

      const modifyConfirm = confirm("수정하시겠니까?")
      if(modifyConfirm){
        await this.$store.dispatch('modifyPoster',form).then((res)=>
      // console.log(res)
      this.$router.push({name:'mpdetail',params:{id:this.poster.id}})


    ).catch((err) =>{
      console.log(err)
    })
      }

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
      this.starttime = dayjs(start_date).format('YYYY-MM-DD');
      // console.log(this.starttime)
      return dayjs(start_date).format('YYYY-MM-DD')

    },
    formatDate2(end_date) {
      if (!end_date) return null
      this.endtime= dayjs(end_date).format('YYYY-MM-DD')
      // console.log(this.endtime)
      return dayjs(end_date).format('YYYY-MM-DD')
    },
    async getposter(){
      try{
        let res = await this.$store.dispatch('posterDetail',{id:this.$route.params.id});
      console.log(res)
      // res.mainposter='';
      // this.res.stillcut=[];
      // console.log(res)
      this.poster=res.posters[0];
      }catch(err){
        console.log(err)
      }
    },
    async deletePoster() {
    const deleteconfirm = confirm("삭제 하시겠습니까?")
    // console.log(this.$route.params.id)
    if(deleteconfirm){
      await this.$store.dispatch('deletePoster', { id:this.$route.params.id });
      this.$router.push({name:'mainposter'})
      }
    },
  },
  async mounted(){
    await this.getposter();
  },
  computed:{
    computedDateFormatted() {
      return this.formatDate(this.start_date);
    },
    computedDateFormatted2() {
      return this.formatDate2(this.end_date);
    },
  },
};
</script>

<style lang="scss">
.mp_dt_table{
  border: 1px solid rgb(226, 226, 226) !important;
  text-align: start;
  font-weight: 600;
}
.mp_dt_table td{
  border: 1px solid rgb(226, 226, 226) !important;
}
.mp_dt_table input{
  width: 100%;
  height: 30px;
  padding: 10px;
  border-radius: 4px;
  font-weight: 500 !important;
}
.mp_dt_table textarea{
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  font-weight: 500 !important;
  resize: none;
}
// 등록 버튼
.mp_dt_submit_box{
  width: 100%;
  text-align: end;
}
.mp_dt_submit{
  // position: absolute;
  margin: 10px;
  border: 1px solid rgb(226, 226, 226) !important;
  // background-color: rgb(240, 240, 240);
}
.mp_dt_submit span{
  font-weight: 600;
  font-size: 14px;
  color: rgb(97, 97, 97) !important;
}
.mm_search2{
  width: 440px !important;
}
.calendar_text .v-input__prepend{
  margin-top: 4px;
}
</style>
