<template>
      <HeadBanner/>
      <HeaderSection/>
      <div class="sub_section">
        <HeadSilde />
        <!-- 중앙 컨텐츠 -->
        <div class="contents_main">

          테스트페이지입니다.
        </div>
      </div>
</template>

<script>
import HeadBanner from '../layouts/index/header/HeadBanner.vue';
import HeaderSection from '../layouts/index/header/HeaderSection.vue';
export default {
  name:'test11',
  components:{
    HeadBanner,
    HeaderSection
  }
}
</script>

<style>

</style>
