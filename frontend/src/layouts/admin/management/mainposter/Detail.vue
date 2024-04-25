<template>
      <v-col cols="12" class="pa-0 mb-5 mp_dt_submit_box">
    <v-btn
     @click="$router.push({name:'mpmodify'})"
     class="pa-0 mp_dt_submit">
      <span>수정</span>
    </v-btn>
    <v-btn
     @click="$router.push({name:'mainposter'})"
     class="pa-0 ml-3 mp_dt_submit">
      <span>삭제</span>
    </v-btn>
     <v-btn
     @click="$router.push({name:'mainposter'})"
     class="pa-0 ml-3 mp_dt_submit">
      <span>목록</span>
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
          {{ poster.name }}
        </td>
        <td class="bg-gray100">장르</td>
        <td>
          {{ poster.genre }}
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">상영일</td>
        <td>
          {{ poster.starttime }} ~ {{ poster.endtime }}
        </td>
        <td class="bg-gray100">감독</td>
        <td>
          {{ poster.director }}
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">상영시간</td>
        <td>
          {{ poster.showtime }}
        </td>
        <td class="bg-gray100" rowspan="2">출연</td>
        <td rowspan="2">
          {{ poster.appearance }}
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">관람연령</td>
        <td>
          {{ poster.viewage }}
        </td>
      </tr>
      <tr>
        <td class="bg-gray100">줄거리</td>
        <td class="poster_summary" colspan="4">
          {{ poster.summary }}
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
    <!-- <input
    type="file"
    @change="handleMainImgChange"
    name="goodsMainImg"
    id="goods-main-img"
    accept="image/*"/> -->
  </div>
  <!-- 서브 포스터 이미지 -->
  <div class="goods-detail-img-file">
    <!-- <input
    type="file"
    @change="handleSubImgChange"
    name="goodsDetailImg"
    id="goods-detail-img"
    accept="image/*"
    multiple/> -->
  </div>
  <!-- 메인 및 상세 이미지 미리보기가 표시될 영역 -->
  <div class="image-lists">
    <ul class="image-lists-ul">
      <!-- 미리보기는 여기에 표시됩니다 -->
      <div class="goods-main-img-p">
        <!-- {{ poster?.mainposter ? backUrl + poster.mainposter.url : "" }} -->
        <img :src="poster?.mainposter ? backUrl + poster.mainposter.url : ''" alt="">
        <div class="img-title">
            <span>스틸컷 사진</span>
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
</template>

<script>
export default {
  data() {
    return {
      backUrl: import.meta.env.VUE_APP_BACKEND_URL,
      mainImgPreview:'',
      subImgPreviews:[],
      poster:'',
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
    },
    async getposter(){
      try{
        let res = await this.$store.dispatch('posterDetail',{id:this.$route.params.id});
      console.log(res)
      this.poster=res.posters[0];
      }catch(err){
        console.log(err)
      }
    }
  },
  async mounted(){
    await this.getposter();
  },
};
</script>

<style lang="scss">
.poster_summary{
  width: 500px;
  height: auto;
  white-space:pre;
}
.goods-main-img-p img{
  width: 220px;
  height: 350px;
  border-radius: 4px;
}
</style>
