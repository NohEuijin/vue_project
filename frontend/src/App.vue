<template>
  <body>
    <!-- 배너 -->
    <Banner/>
    
  </body>
</template>

<script>
import { ref } from 'vue';
import Banner from './components/Banner.vue';

export default {
  components : {
    Banner
  },
  setup(){
    
  }
}
</script>

<style lang="scss">
@import '@/assets/css/global.scss';
//공통 css
*{
  margin: 0;
  padding : 0;
  list-style: none;
  text-decoration: none;
}
body{
  font-size: 12px;
  color: #000;
  min-width: 1024px;
  font-family: "Noto Sans KR", "Roboto", "dotum", "sans-serif";
}

</style>
