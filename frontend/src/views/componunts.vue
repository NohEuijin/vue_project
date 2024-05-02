<template>
  <body>
    <HeadBanner />
    <FixHeader />
    <router-view></router-view>
    <Advertisement />
    <FooterAll />
  </body>
</template>

<script>
  import FixHeader from '../layouts/common/FixHeader.vue';
  import HeadBanner from '@/layouts/index/header/HeadBanner.vue';
  import Advertisement from '../layouts/index/main/Advertisement.vue';
  import FooterAll from '../layouts/common/FooterAll.vue';
export default {
  components : {
    FixHeader,
    HeadBanner,
    Advertisement,
    FooterAll,
  },
  setup(){

  }
}
</script>

<style>

</style>
