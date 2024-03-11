<template>
  <div v-if="bannerShow" class="banner_top">
    <div class="inner">
      <a href="">
        <img src="https://cf2.lottecinema.co.kr/lotte_image/2024/BobMarley_OneLove/BobMarley_OneLove_98080.jpg" alt="">
      </a>
      <button @click="bannerClose" class="btn-close"></button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: ['bannerClose'],
  setup(props, {emit}){
    /*
    bannerShow 초기 true로 설정되어 있어 배너가 표시,
    bannerClose 함수 호출로 배너가 숨겨짐.
    */
    const bannerShow = ref(true);
    const bannerClose = () => {
      bannerShow.value = false;
      emit('bannerClose');
      /* 배너가 닫힘을 알리는 이벤트
       부모 컴포넌트에서 이를 수신하여 처리 */
    }
    return{
      bannerShow,
      bannerClose
    }
  }
}
</script>

<style>

/* 배너 */
.banner_top{
  background-color: rgb(38, 18, 53);
  width: 100%;
}
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