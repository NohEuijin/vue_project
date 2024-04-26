<template>
  <v-form
  @submit.prevent="{submit, cancel}"
  id="goods-img-form"
  enctype="multipart/form-data"
  >
    <v-col cols="12" class="pa-0 mp_reg_submit_box">
     <v-btn
     @click="$router.push({name:'mainposter'})"
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
        <td>
          <input
          type="text"
          placeholder="상영일 입력"
          v-model="starttime"
          />
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
          variant="outlined none"
          placeholder="출연진 입력"
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
          class="items_select"
          placeholder="연령"
          :items="age_item"
          hide-details
          variant="outlined none"
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
          variant="outlined none"
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
export default {
  data() {
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
    };
  },
  methods: {
    handleMainImgChange(event) {
      const file = event.target.files[0];
      this.mainImgPreview = URL.createObjectURL(file);
      this.mainPoster = file;
      // console.log(this.mainPoster)
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
      this.stillcut = files
      // console.log(this.stillcut)
    },
    async potserRegistaion(){
      const form = {
        name : this.name,
        genre : this.genre,
        director : this.director,
        appearance : this.appearance,
        viewage : this.viewage,
        showtime : this.showtime,
        starttime : this.starttime,
        endtime : this.endtime,
        summary : this.summary,
        mainposter : this.mainposter,
        stillcut : this.stillcut,
      }
      console.log(form);
      await this.$store.dispatch('posterRegistation',form)
      .then((res)=>{
        console.log(res);

      })
    }
  },
};
</script>

<style lang="scss">
.mp_reg_table{
  border: 1px solid rgb(226, 226, 226) !important;
  text-align: start;
  font-weight: 600;
}
.mp_reg_table td{
  border: 1px solid rgb(226, 226, 226) !important;
}
.mp_reg_table input{
  width: 100%;
  height: 30px;
  padding: 10px;
  border-radius: 4px;
  font-weight: 500 !important;
}
.mp_reg_table textarea{
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  font-weight: 500 !important;
  resize: none;
  // font-size: 12px !important;
  // font: initial !important;
  // font:initial; 또는 font: unset;
}
// 등록 버튼
.mp_reg_submit_box{
  width: 100%;
  text-align: end;
}
.mp_reg_submit{
  // position: absolute;
  margin: 10px;
  border: 1px solid rgb(226, 226, 226) !important;
  // background-color: rgb(240, 240, 240);
}
.mp_reg_submit span{
  font-weight: 600;
  font-size: 14px;
  color: rgb(97, 97, 97) !important;
}
.items_select{
  font-weight: 600 !important;

}
</style>
