<template>
  <body>
    <MainHeadBanner/>
      <MainHeaderSection/>
      <div class="sub_section">
        <MainHeadSilde />
        <!-- 중앙 컨텐츠 -->
        <div class="contents_main">
          <!-- 영화 리스트 -->
          <MainMoviList />
          <!-- 스페셜관 -->
          <MainSpecialCinama />
          <!-- 이벤트 리스트 -->
          <MainEventList />
          <!-- 시사회/무대인사 -->
          <MainPremier />
          <!-- 중간 메뉴 -->
          <MainMidMenu />
          <!-- 공지사항 -->

        </div>
      </div>
  </body>
</template>

<script>
import { ref } from 'vue';
import MainHeadBanner from './components/header/MainHeadBanner.vue';
import MainHeaderSection from './components/header/MainHeaderSection.vue';
import MainHeadSilde from './components/header/MainHeadSilde.vue';
import MainMoviList from './components/main/MainMoviList.vue';
import MainSpecialCinama from './components/main/MainSpecialCinama.vue';
import MainEventList from './components/main/MainEventList.vue';
import MainPremier from './components/main/MainPremier.vue';
import MainMidMenu from './components/main/MainMidMenu.vue';
import MainNotice from './components/main/MainNotice.vue';

export default {
  components : {
    MainHeadBanner,
    MainHeaderSection,
    MainHeadSilde,
    MainMoviList,
    MainSpecialCinama,
    MainEventList,
    MainPremier,
    MainMidMenu,
    MainNotice
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
html, body{
  min-width: 1024px;
}
body{
  font-size: 12px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-family: "Noto Sans KR", "Roboto", "dotum", "sans-serif";
}
.contents_main{
  width: 980px;
  margin: 0 auto;
  padding: 50px 0 0 0;
}
.contents_main .main_cont_wrap{
  position: relative;
  margin-bottom: 33px;
}
.tit_name{
  position: relative;
  font-size: 17px;
  margin-bottom: 10px;
}

</style>