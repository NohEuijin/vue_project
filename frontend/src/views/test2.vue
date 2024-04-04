<template>
  <HeadBanner/>
  <HeaderSection/>
  <div class="sub_section">
    <HeadSilde />
    <!-- 중앙 컨텐츠 -->
    <div class="contents_main">
      <router-view></router-view>
    </div>
    <FooterAll />
  </div>
</template>

<script>
import HeadBanner from '../layouts/index/header/HeadBanner.vue';
import HeaderSection from '../layouts/index/header/HeaderSection.vue';
import FooterAll from '../layouts/common/FooterAll.vue';
export default {
name:'test121',
components:{
HeadBanner,
HeaderSection,
FooterAll
}
}
</script>

<style>

</style>
