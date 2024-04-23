<template>
  <v-form
  @submit.prevent="{submit, cancel}"
  id="goods-img-form"
  enctype="multipart/form-data"
  >
    <v-col cols="12" class="pa-0 mp_dt_submit_box">
     <v-btn
     @click="$router.push({name:'mainposter'})"
     class="pa-0 mp_dt_submit">
      <span>목록</span>
    </v-btn>
    <v-btn
     @click="$router.push({name:'mpdetail'})"
     class="pa-0 mp_dt_submit">
      <span>수정완료</span>
    </v-btn>
    <v-btn
     @click="$router.push({name:'mainposter'})"
     class="pa-0 mp_dt_submit">
      <span>삭제</span>
    </v-btn>
   </v-col>
    <v-table
    class="pa-0 mp_dt_table"
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
          v-model="제목입력"
          />
        </td>
        <td class="bg-gray100">장르</td>
        <td>
          <input
          type="text"
          placeholder="장르입력"
          v-model="장르입력"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">상영일</td>
        <td>
          <input
          type="text"
          placeholder="상영일 입력"
          v-model="상영일입력"
          />
        </td>
        <td class="bg-gray100">감독</td>
        <td>
          <input
          type="text"
          placeholder="감독 입력"
          v-model="감독입력"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">상영시간</td>
        <td>
          <input
          type="text"
          placeholder="상영 시간 입력"
          v-model="상영시간입력"
          />
        </td>
        <td class="bg-gray100" rowspan="2">출연</td>
        <td rowspan="2">
          <textarea
          type="text"
          placeholder="출연진 입력"
          v-model="출연입력"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">관람연령</td>
        <td>
          <input
          type="text"
          placeholder="연령 입력"
          v-model="연령입력"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">줄거리</td>
        <td colspan="4">
          <textarea
          type="text"
          placeholder="줄거리 입력"
          v-model="줄거리입력"
          ></textarea>
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
</style>
