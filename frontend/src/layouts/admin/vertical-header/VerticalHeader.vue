<script setup>
// 아이콘
import 'primeicons/primeicons.css'
// 드롭다운 컴포넌트 import
import NotificationDD from './NotificationDD.vue';
//검색
// import Searchbar from './SearchBarPanel.vue';
import ProfileDD from './ProfileDD.vue';

import { useStore } from 'vuex';
  const store = useStore();

  const toggleRail = () => {
    store.commit('TOGGLE_RAIL');
  };
</script>

<template>
  <v-app-bar elevation="0" height="60" >
    <v-btn
      class="hidden-md-and-down text-secondary mr-3"
      icon="mdi-chevron-left"
      color="darkText"
      rounded="sm"
      variant="text"
      size="small"
      @click.stop="$store.state.rail = !$store.state.rail"
      :rail="toggleRail"
    >
    <i class="pi pi-align-justify header_pi_icon" ></i>
    </v-btn>
    <v-btn
      class="hidden-lg-and-up text-secondary ms-3"
      icon
      color="darkText"
      rounded="sm"
      variant="text"
      @click.stop="$store.state.drawer = !$store.state.drawer"
      size="small"
    >
    <i class="pi pi-align-justify header_pi_icon" ></i>
    </v-btn>

    <!-- ---------------------------------------------- -->

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---오른쪽 파트 -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- 깃허브 -->
    <!-- ---------------------------------------------- -->
    <v-btn
      icon
      class="text-secondary hidden-sm-and-down d-flex"
      color="darkText"
      rounded="sm"
      variant="text"
      href="https://github.com/NohEuijin/JPA-DW.git"
      target="_blank"
    >
    <i class="pi pi-github header_pi_icon" ></i>
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- 알림 -->
    <!-- ---------------------------------------------- -->
    <NotificationDD />

    <!-- ---------------------------------------------- -->
    <!-- 사용자 프로필 -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" offset="8, 0">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn" variant="text" rounded="sm" v-bind="props">
          <div class="d-flex align-center">
            <v-avatar class="mr-sm-2 mr-0 py-2">
              <img src="@/assets/images/users/avatar-1.png" alt="Julia" />
            </v-avatar>
            <h6 class="text-subtitle-1 mb-0 d-sm-block d-none">000 관리자 님</h6>
          </div>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="290">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>

