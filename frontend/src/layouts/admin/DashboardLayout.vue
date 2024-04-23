<script setup>
// import { RouterView } from 'vue-router';
// import LoaderWrapper from './LoaderWrapper.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import FooterPanel from './footer/FooterPanel.vue';
</script>

<!--
<v-locale-provider>
- locales
: 지원하는 각 언어에 대한 로케일과 해당 언어의 번역 메시지를 정의하는 객체입니다.
- defaultLocale
: 기본으로 선택되는 언어의 로케일을 나타냅니다.

 -->
<template>
  <v-locale-provider>
    <v-app
    :class="[]">
      <VerticalSidebarVue />
      <VerticalHeaderVue />

      <v-main class="page-wrapper">
        <v-container>
          <div>
            <!-- Loader start -->
            <!-- <LoaderWrapper /> -->
            <!-- Loader end -->
            <router-view></router-view>

          </div>
        </v-container>
        <v-container class="pt-0">
          <div>
            <FooterPanel />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
