<template>
  <body>
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
        </div>
  </body>
</template>

<script>
import HeadSilde from '../layouts/index/header/HeadSilde.vue';
import MoviList from '../layouts/index/main/MoviList.vue';
import SpecialCinama from '../layouts/index/main/SpecialCinama.vue';
import EventList from '../layouts/index/main/EventList.vue';
import Premier from '../layouts/index/main/Premier.vue';
import MidMenu from '../layouts/index/main/MidMenu.vue';
import Notice from '../layouts/index/main/Notice.vue';
export default {
  components : {
    HeadSilde,
    MoviList,
    SpecialCinama,
    EventList,
    Premier,
    MidMenu,
    Notice,
  },
  setup(){
  }
}
</script>

<style lang="scss">
</style>
