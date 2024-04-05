<script setup>
let isLoading = false;

// Pinia 사용 시 주석 처리된 부분
// import { storeToRefs } from 'pinia';
// import { useUIStore } from '@/stores/ui';
// const uiStore = useUIStore();
// const { isLoading } = storeToRefs(uiStore);

// Pinia를 사용하지 않는 경우 isLoading 값을 직접 설정
// isLoading = true; // 로딩 상태 설정 예시

// 임시로 로딩 상태를 true로 설정하여 테스트
setTimeout(() => {
  isLoading = true;
}, 1000); // 1초 후 로딩 상태 설정
</script>

<template>
  <div
    :class="{
      'page-loader': true,
      loading: isLoading,
      hidden: !isLoading
    }"
  >
    <div class="bar"></div>
  </div>
</template>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000000;
  pointer-events: none;
  opacity: 0;
  transition:
    width 1350ms ease-in-out,
    opacity 350ms linear,
    left 50ms ease-in-out;
}

.bar {
  background-color: rgb(var(--v-theme-primary));
  height: 5px;
  width: 100%;
}

.hidden {
  opacity: 0;
}

.loading {
  opacity: 1;
  animation: loading 2000ms ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes loading {
  0% {
    width: 0;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 100%;
    left: 100%;
  }
}
</style>
