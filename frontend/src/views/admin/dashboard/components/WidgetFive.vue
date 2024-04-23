<script setup>
import { shallowRef } from 'vue';

const fivecards = shallowRef([
  {
    name: '총 방문자 수',
    earn: '4,42,236',
    percent: '+59.3%',
    color: 'primary',
    text: '35,000'+'명',
    icon:'mdi-trending-up',
  },
  {
    name: '총 회원가입 수',
    earn: '78,250',
    percent: '+70.5%',
    color: 'success',
    text: '8,900'+'명',
    icon:'mdi-trending-up',
  },
  {
    name: '총 게시글 수',
    earn: '18,800',
    percent: '-27.4%',
    color: 'warning',
    text: '1,943'+'개',
    icon:'mdi-trending-down ',
  },
  {
    name: '총 판매 금액 ',
    earn: '120,320,395원',
    percent: '-27.4%',
    color: 'error',
    text: '1,320,395'+'원',
    icon:'mdi-trending-down ',
  }
]);
</script>
<template>
  <v-row class="my-0">
    <v-col cols="12" sm="6" md="3" v-for="(card5, i) in fivecards" :key="i" >
      <v-card elevation="0">
        <v-card>
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1">{{ card5.name }}</h6>
                <h4 class="text-h4 d-flex align-center mb-0">
                  {{ card5.earn }}
                  <v-chip :color="card5.color" class="combined ml-2" size="small" label>
                    <template v-slot:prepend>
                    <v-icon  :icon="card5.icon" size="12">
                    </v-icon>
                    </template>
                    {{ card5.percent }}
                  </v-chip>
                </h4>
                <span class="text-lightText text-caption pt-5 d-block"
                  >금일 평균 :  <span :class="'text-' + card5.color">{{ card5.text }}</span> 입니다!</span
                >
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<style lang="scss">
// Outline Card
.text-h6 {
  font-weight: 400;
  line-height: 1.57;
  font-size: 1rem !important;
}
.text-h4{
  font-weight: 500;
  line-height: 1.57;
  font-size: 1.2rem !important;
}

.v-card-text {
  // background-color: rgb(var(--v-theme-background));
  // border: 1px solid rgba(var(--v-theme-borderLight), 1);
  border-radius: 4px;
}
</style>
