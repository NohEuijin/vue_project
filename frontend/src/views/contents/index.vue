<template>
  <body>
    <HeadBanner/>
      <HeaderSection/>
      <div class="sub_section">
        <HeadSilde />
        <!-- 중앙 컨텐츠 -->
        <div class="contents_main">
          <!-- 영화 리스트 -->
          <MoviList />
          <!-- 스페셜관 -->
          <SpecialCinama />
          <!-- 이벤트 리스트 -->
          <EventList />
          <!-- 시사회/무대인사 -->
          <Premier />
          <!-- 중간 메뉴 -->
          <MidMenu />
          <!-- 공지사항 -->
          <Notice />
        </div>
          <!-- 광고 -->
        <Advertisement />
        <FooterAll />
        </div>
  </body>
</template>

<script>
import HeadBanner from '../layouts/index/header/HeadBanner.vue';
import HeaderSection from '../layouts/index/header/HeaderSection.vue';
import HeadSilde from '../layouts/index/header/HeadSilde.vue';
import MoviList from '../layouts/index/main/MoviList.vue';
import SpecialCinama from '../layouts/index/main/SpecialCinama.vue';
import EventList from '../layouts/index/main/EventList.vue';
import Premier from '../layouts/index/main/Premier.vue';
import MidMenu from '../layouts/index/main/MidMenu.vue';
import Notice from '../layouts/index/main/Notice.vue';
import Advertisement from '../layouts/index/main/Advertisement.vue';
import FooterAll from '../layouts/common/FooterAll.vue';

export default {
  components : {
    HeadBanner,
    HeaderSection,
    HeadSilde,
    MoviList,
    SpecialCinama,
    EventList,
    Premier,
    MidMenu,
    Notice,
    Advertisement,
    FooterAll
  },
  setup(){
  }
}
</script>

<style lang="scss">
@import '@/assets/css/global.scss';
</style>
