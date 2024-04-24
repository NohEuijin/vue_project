<template>
  <v-col v-if="bannerShow" cols="12" class="pa-0 banner_top "
  :class="[`bg-${banners[bannerIndex].bg}`]">
    <div class="inner">
      <a href="">
        <img :src="banners[bannerIndex].img" alt="">
      </a>
      <button @click="bannerClose" class="btn-close"></button>
    </div>
  </v-col>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(){
    /*
    bannerShow 초기 true로 설정되어 있어 배너가 표시,
    bannerClose 함수 호출로 배너가 숨겨짐.
    */
    const bannerShow = ref(true);
    const bannerClose = () => {
      bannerShow.value = false;
    }
    const banners = [
      {
      img: "https://cf2.lottecinema.co.kr/lotte_image/2024/BobMarley_OneLove/0313/BobMarley_OneLove_98080.jpg",
      bg : 'purple2'
    },
    {
      img: "https://cf2.lottecinema.co.kr/lotte_image/2024/TheBraveBeluga/TheBraveBeluga_98080.jpg",
      bg : 'blue2'
    },
    {
      img: "https://cf2.lottecinema.co.kr/lotte_image/2024/BreadBarbershop/BreadBarbershop_980807.jpg",
      bg : 'black'
    },
  ];
  const bannerIndex = ref(Math.floor(Math.random() * banners.length));
    setInterval(() => {
    bannerIndex.value = Math.floor(Math.random() * banners.length);
    // console.log(bannerIndex)
  },20000); //20 seconds
    return{
      banners,
      bannerIndex,
      bannerShow,
      bannerClose
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/global.scss';
/* 배너 */
.inner{
  position: relative;
  width: 980px;
  height: 80px;
  margin: 0 auto;
  overflow: hidden;
}
.btn-close{
  position:absolute;
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/close_19_wht.png) no-repeat 50% 50%;
  width: 20px;
  height: 20px;
  top: 40%;
  right: 0;
}
</style>
