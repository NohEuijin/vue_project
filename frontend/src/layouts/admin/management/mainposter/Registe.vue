<template>
  <v-form
  id="goods-img-form"
  >
    <v-col cols="12" class="pa-0 mp_reg_submit_box">
     <v-btn
     @click="posterRegistrationFrom"
     class="pa-0 mp_reg_submit">
      <span>등록</span>
    </v-btn>
   </v-col>
    <v-table
    class="pa-0 mp_reg_table"
    density="compact"
    dense
    >
    <tbody>
      <tr>
        <td class="bg-gray100">제목</td>
        <td>
          <input
          type="text"
          placeholder="제목입력"
          v-model="name"
          />
        </td>
        <td class="bg-gray100">장르</td>
        <td>
          <input
          type="text"
          placeholder="장르입력"
          v-model="genre"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">상영일</td>
        <td class="mr_search2">
          <!-- <input
          type="text"
          placeholder="상영일 입력"
          v-model="starttime"
          /> -->
    <div class="d-flex btn-group mr_search">
      <v-col
        cols="4"
        lg="4"
        class="pa-0 ml-2 ms_cal"
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
          v-model="director"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">상영시간</td>
        <td>
          <input
          type="text"
          placeholder="상영 시간 입력"
          v-model="showtime"
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
          v-model="appearance"
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
          v-model="viewage"
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
          v-model="summary"
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
      stillcut:[],
      age_item : ['all','r12','r15','r19'],
      menu1:false,
      menu2:false,
      today:today,
      start_date:new Date(today.getFullYear(), today.getMonth(), 1),
      end_date:new Date(today.getFullYear(), today.getMonth() + 1, 0),
      uploaded_id : {
        main:"",
        sub:[],
      }

    };
  },
  methods: {
    async uploadImages(){
      if(!this.mainposter?.id){
        await this.$store.dispatch('upload', {files: this.mainposter}).then((res) => {console.log(res,'메인이미지')
        this.mainposter["id"] = res.data[0].id
      })
      }
      for( let i = 0 ; i < this.stillcut.length; i++){
        if(!this.stillcut[i].id){
          await this.$store.dispatch('upload', {files:this.stillcut[i]}).then((res) => {console.log(res,'스틸컷')
          this.stillcut[i]["id"] = res.data[0].id
        })
        }
      }
    },

    handleMainImgChange(event) {
      const file = event.target.files[0];
      this.mainImgPreview = URL.createObjectURL(file);
      this.mainposter = event.target.files[0];
      // console.log(this.mainposter)
    },
    handleSubImgChange(event) {
      const files = event.target.files;
      const newFiles = Array.from(files).slice(0, 4);
      this.subImgPreviews = [];
      const importantInfo = [];
      for (let i = 0; i < newFiles.length; i++) {
        this.subImgPreviews.push(URL.createObjectURL(newFiles[i]));
      }
      this.stillcut = event.target.files;
      // console.log(this.stillcut)
    },
    async posterRegistrationFrom(){
      await this.uploadImages()
      let still_id = []
      for(let i = 0; i < this.stillcut.length; i++){
        still_id.push(this.stillcut[i].id)
      }
      // console.log(still_id)


      const form = {
        name : this.name,
        genre : this.genre,
        director : this.director,
        appearance : this.appearance,
        viewage : this.viewage,
        showtime : parseInt(this.showtime),
        starttime : this.starttime,
        endtime : this.endtime,
        summary : this.summary,
        mainposter : this.mainposter.id,
        stillcut : still_id,
      }
      console.log(form);

  let confirmRegister = confirm("등록 하시겠습니까?")
    if(confirmRegister){
    await this.$store.dispatch('posterRegistration',form).then((res)=> {
    console.log(res);
    // this.$router.push({name : 'mainposter'})
    }).catch((err) =>{
    console.log(err)
    })
    this.$router.push({name : 'mainposter'})
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
