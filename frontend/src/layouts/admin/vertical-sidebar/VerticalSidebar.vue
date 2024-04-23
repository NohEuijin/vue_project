<script setup>
import { ref } from 'vue';
import { shallowRef } from 'vue';
import sidebarItems from './sidebarItem';

import LogoDark from '../logo/LogoDark.vue'
import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import ExtraBox from './extrabox/ExtraBox.vue';

const sidebarMenu = shallowRef(sidebarItems);
const drawer = ref(true);
    const items = [
    // { icon: 'mdi-home', text: 'Home' },
    // { icon: 'mdi-account', text: 'Profile' },
    // { icon: 'mdi-settings', text: 'Settings' },
    ]
</script>

<template>
  <v-navigation-drawer
    left
    v-model="$store.state.drawer"
    :rail="$store.state.rail"
    elevation="0"
    rail-width="71"
    mobile-breakpoint="lg"
    app
    class="leftSidebar test"
    expand-on-hover
  >
    <div class="pa-4 mt-4 mb-4">
      <LogoDark />
    </div>

    <!---Navigation -->
    <perfect-scrollbar class="scrollnavbar">
      
      <v-list aria-busy="true" aria-label="menu list">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header"  />
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
