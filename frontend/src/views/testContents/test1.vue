<template>
  <!-- 제품 등록 폼 -->
  <form
  @submit.prevent="submitForm"
  id="goods-img-form"
  enctype="multipart/form-data"
  >
    <!-- 제품 이미지 정보 제목 -->
    <div class="goods-img-info-title">
      <h4>제품 이미지 정보</h4>
    </div>
    <div class="goods-imgs-wrap">
      <!-- 메인 제품 이미지 -->
      <div class="goods-main-img-file">
        <input
        type="file"
        @change="handleMainImgChange"
        name="goodsMainImg"
        id="goods-main-img"
        accept="image/*"/>
      </div>
      <!-- 상세 제품 이미지 -->
      <div class="goods-detail-img-file">
        <input
        type="file"
        @change="handleDetailImgChange"
        name="goodsDetailImg"
        id="goods-detail-img"
        accept="image/*"
        multiple/>
      </div>
      <!-- 메인 및 상세 이미지 미리보기가 표시될 영역 -->
      <div class="image-lists">
        <ul class="image-lists-ul">
          <!-- 미리보기는 여기에 표시됩니다 -->
          <li class="goods-main-img-p">
            <img
            v-if="mainImgPreview"
            :src="mainImgPreview"
            alt="Main Image Preview"
            class="preview-image">
            <div class="img-title">
                <span>상품 메인 사진</span>
            </div>
        </li>
        <div v-for="(detailImgPreview, index) in detailImgPreviews" :key="index" class="goods-detail-img-p">
          <div v-if="detailImgPreview" >
            <img :src="detailImgPreview" :alt="'Detail Image Preview ' + (index + 1)" class="preview-image">
            <div class="img-title" >
              <span>상품 상세 사진-{{ index + 1 }}</span>
            </div>
          </div>
        </div>
        <li v-if="detailImgPreviews.length === 0" class="goods-detail-img-p">
          <div class="img-title">
            <span>상품 상세 사진</span>
          </div>
        </li>
          <!--  -->
        </ul>
      </div>
    </div>
    <div class="reg-btn">
      <button type="submit" class="reg-submit-btn">등록</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        goodsCategory: '',
        goodsDetailContent: '',
      },
      mainImgPreview: '',
      detailImgPreviews: []
    };
  },
  methods: {
    submitForm() {
    },
    // 메인 이미지 변경 처리
    handleMainImgChange(event) {
      const file = event.target.files[0];
      this.mainImgPreview = URL.createObjectURL(file); // 미리보기 갱신
    },
    // 상세 이미지 변경 처리
    handleDetailImgChange(event) {
      const files = event.target.files;
      const newFiles = Array.from(files).slice(0, 4); // 상세 이미지는 최대 4개까지만 허용
      this.detailImgPreviews = []; // 기존 미리보기 초기화
      console.log(files)
      console.log(newFiles)
      for (let i = 0; i < newFiles.length; i++) {
        this.detailImgPreviews.push(URL.createObjectURL(newFiles[i])); // 미리보기 추가
      }
      // 파일이 존재하지 않을 경우 기본 이미지 추가
      //     for (let i = newFiles.length; i < 4; i++) {
      //   this.detailImgPreviews.push(null);
      // }
    }
  },
  mounted() {
  }
};
</script>
