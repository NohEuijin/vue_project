<script setup>
import { ref } from 'vue';
import { shallowRef } from 'vue';
import sidebarItems from './sidebarItem';

import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import ExtraBox from './extrabox/ExtraBox.vue';

const sidebarMenu = shallowRef(sidebarItems);

// 상태 변수
const drawer = ref(true);
    const items = [
    { icon: 'mdi-home', text: 'Home' },
    { icon: 'mdi-account', text: 'Profile' },
    { icon: 'mdi-settings', text: 'Settings' },
    ]

</script>

<template>
  <!--
    v-model="customizer."
    :rail="customizer.mini_sidebar"
  -->
  <v-navigation-drawer
    left
    v-model="drawer"
    elevation="0"
    rail-width="60"
    mobile-breakpoint="lg"
    app
    class="leftSidebar"
    expand-on-hover
  >
    <div class="pa-5">
      <!-- <Logo /> -->
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list aria-busy="true" aria-label="menu list">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>
      <div class="pa-4">
        <ExtraBox />
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
