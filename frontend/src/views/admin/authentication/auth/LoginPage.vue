<script setup>
import Logo from '@/layouts/admin/logo/LogoDark.vue';
import AuthLogin from '../authForms/AuthLogin.vue';
import AuthFooter from './AuthFooter.vue';
</script>

<!--
no-gutters
: 클래스가 적용된 로우 요소는 컬럼들 사이의 간격이 없어져서 컬럼들이 붙어있는 것을 확인 할 수 있다.
 -->
<template>
  <v-row class="bg-containerBg position-relative" no-gutters>

    <!-- layout Customize  -->
    <!-- <div class="blur-logo">
      <svg width="100%" height="calc(100vh - 175px)" viewBox="0 0 405 809" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#69b1ff"
        ></path>
        <path
          fill="#95de64"
          opacity="0.6"
        ></path>
        <path
          fill="#fff1f0"
          opacity="1"
        ></path>
      </svg>
    </div> -->
    <!-- layout Customize  -->

    <v-col cols="12">
      <div class="pt-6 pl-6">
        <Logo />
      </div>
    </v-col>
    <!---Login Part-->
    <v-col cols="12" lg="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" md="12">
              <v-card elevation="0" class="loginBox">
                <v-card elevation="24">
                  <v-card-text class="pa-sm-10 pa-6">
                    <!---Login Form-->
                    <AuthLogin />
                    <!---Login Form-->
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Login Part-->
    <v-col cols="12">
      <v-container class="pt-0 pb-6">
        <AuthFooter />
      </v-container>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
.blur-logo {
  position: absolute;
  filter: blur(18px);
  bottom: 0;
  transform: inherit;
}
</style>
