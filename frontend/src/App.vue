<template>
  <body>
    <HeadBanner/>
      <HeaderSection/>
      <div class="sub_section">
        <SubBox />
        <!-- 중앙 컨텐츠 -->
        <div class="contents">
          <!-- 영화 리스트 -->
          <MoviList />
          <!-- 스페셜관 -->
            <div class="main_cont_special_wrap">
              <v-col class="mb-10 sec_tit">스페셜관</v-col>
            </div>
        </div>
      </div>
  </body>
</template>

<script>
import { ref } from 'vue';
import HeadBanner from './components/main/HeadBanner.vue';
import HeaderSection from './components/main/HeaderSection.vue';
import SubBox from './components/sub/SubBox.vue';
import MoviList from './components/sub/MoviList.vue';

export default {
  components : {
    HeadBanner,
    HeaderSection,
    SubBox,
    MoviList,
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
a{
  cursor: pointer;
}
img{
  vertical-align: top;
}
div{
  display: block;
}
body{
  font-size: 12px;
  line-height: 1.1;
  letter-spacing: -0.03em;
}
.contents{
  width: 980px;
  margin: 0 auto;
  padding: 50px 0 0 0;
}
// 스페셜관
.main_cont_special_wrap{
  position: relative;
  margin-bottom: 33px;
}
.sec_tit{
  border-bottom: 1px dashed #D9D9D9;

  position: relative;
  font-size: 17px;
  // margin-bottom: 10px;
}
</style>