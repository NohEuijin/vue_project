<template>
      <v-col cols="12" class="pa-0 mb-5 nr_dt_submit_box">
    <v-btn
     @click="$router.push({name:'notice'})"
     class="pa-0 nr_dt_submit">
      <span>등록</span>
    </v-btn>
     <v-btn
     @click="$router.push({name:'notice'})"
     class="pa-0 ml-3 nr_dt_submit">
      <span>목록</span>
    </v-btn>
   </v-col>
  <v-form
  @submit.prevent="{submit, cancel}"
  id="goods-img-form"
  enctype="multipart/form-data"
  >
    <v-table
    class="pa-0 nr_dt_table"
    density="compact"
    dense
    >
    <tbody>
      <tr>
        <td class="bg-gray100">제목</td>
        <td>
          <input
          type="text"
          placeholder="제목 입력"
          v-model="제목입력"
          />
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">내용</td>
        <td colspan="4">
          <textarea
          type="text"
          placeholder="내용 입력"
          v-model="내용입력"
          ></textarea>
        </td>
      </tr>
    </tbody>
  </v-table>

  <v-container class="pa-3 mt-10">
    <v-card-title class="pa-0">
      <strong>사진</strong>
    </v-card-title>
    <div class="goods-imgs-wrap">
  <!-- 메인 사진 이미지 -->
  <div class="goods-main-img-file">
    <input
    type="file"
    @change="handleMainImgChange"
    name="goodsMainImg"
    id="goods-main-img"
    accept="image/*"/>
  </div>
  <!-- 서브 사진 이미지 -->
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
            <span>메인 사진 사진</span>
        </div>
    </div>

    <div v-for="(subImgPreview, index) in subImgPreviews" :key="index" class="goods-detail-img-p">
      <div v-if="subImgPreview" >
        <img :src="subImgPreview" :alt="'Detail Image Preview ' + (index + 1)" class="preview-image">
        <div class="img-title" >
          <span>서브 사진 사진-{{ index + 1 }}</span>
        </div>
      </div>
    </div>
    <li v-if="subImgPreviews.length === 0" class="goods-detail-img-p">
      <div class="img-title">
        <span>서브 사진 사진</span>
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
.nr_dt_table{
  border: 1px solid rgb(226, 226, 226) !important;
  text-align: start;
  font-weight: 600;
}
.nr_dt_table td{
  border: 1px solid rgb(226, 226, 226) !important;
}
.nr_dt_table input{
  width: 100%;
  height: 30px;
  padding: 10px;
  border-radius: 4px;
  font-weight: 500 !important;
}
.nr_dt_table textarea{
  width: 100%;
  height: 60px;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  font-weight: 500 !important;
  resize: none;
}
// 등록 버튼
.nr_dt_submit_box{
  width: 100%;
  text-align: end;
}
.nr_dt_submit{
  // position: absolute;
  border: 1px solid rgb(226, 226, 226) !important;
  // background-color: rgb(240, 240, 240);
}
.nr_dt_submit span{
  font-weight: 600;
  font-size: 14px;
  color: rgb(97, 97, 97) !important;
}
</style>
