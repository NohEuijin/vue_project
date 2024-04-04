<template>
  <div class="banner_wrap">
  <div class="banner_01">
    <a href="">
      <img :src="url + mvimages[currentIndex]" alt="">
    </a>
  </div>
  <div class="footerBanner" :style="{backgroundColor:backgroundColors[currentIndex]}">
    <a href="">
        <img :src="url + images[currentIndex]" alt="">
    </a>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      url: import.meta.env.VUE_APP_FRONT_URL + '/public/',
      mvimages: [
        "TheBraveBeluga_02.png",
        "LeeSeungyoonConcert_02.jpg",
        "BobMarley_OneLove_02.jpg",
      ],
      images: [
        "Hyundaicard.jpg",
        "Hyundai_Insurance.png",
        "Samsungfire.png",
      ],
      backgroundColors:[
      'rgb(0, 92, 185)',
      'rgb(255, 236, 223)',
      'rgb(0, 108, 255)',
      ],
      currentIndex: 0,
    };
  },
  mounted() {
    this.startMvImageRotation();
    this.startImageRotation();
    this.startBackgroundColorRotation();
  },
  methods: {
    startMvImageRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.mvimages.length;
      }, 4000); // 5초마다 영화 포스터 이미지를 변경
    },
    startImageRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 10000); // 5초마다 광고 이미지를 변경
    },
    startBackgroundColorRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.backgroundColors.length;
      }, 10000); // 5초마다 배경색을 변경
    },
  },
};
</script>

<style>
.banner_wrap{
  padding-top: 40px;
  text-align: center;
}
.banner_01{
  margin-bottom: 50px;
}
.footerBanner{
  background-image: url(@/assets/bg_01.jpg);
  background-repeat: repeat-x;
}
</style>
