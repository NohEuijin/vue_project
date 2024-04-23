<script setup>
import { shallowRef } from 'vue';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

// icons

const transaction = shallowRef([
  {
    icon: 'mdi-cached',
    subtitle: 'Today, 2:00 AM',
    title: '주문 대기 #002434',
    color: 'success',
    price: '= 68,000',
    pricepercent: '0.3 %'
  },
  {
    icon: 'mdi-check',
    subtitle: '5 August, 1:45 PM',
    title: '주문 완료 #984947',
    color: 'primary',
    price: '+ 138,000',
    pricepercent: '5 %'
  },
  {
    icon: 'mdi-alert',
    subtitle: '7 hours ago',
    title: '주문 취소 #988784',
    color: 'error',
    price: '- 36,000',
    pricepercent: '-0.1 %'
  },
]);
</script>
<template>
  <UiTitleCard title="Transaction History" class-name="px-0 py-5 pb-0 rounded-md overflow-hidden">
    <v-list lines="two" class="py-0" aria-busy="true" aria-label="Order list">
      <v-list-item v-for="history in transaction" :key="history.title" :value="history.title">
        <template v-slot:prepend>
          <hr>
          <v-avatar size="36" :color="history.color" :class="`text-${history.color}`" variant="tonal">
            <v-icon :icon="history.icon" size="18px"></v-icon>
          </v-avatar>
        </template>
        <div class="d-flex align-center justify-space-between w-100 gap-2">
          <div>
            <h6 class="text-subtitle-1 mb-0">{{ history.title }}</h6>
            <span class="text-subtitle-2 text-lightText font-weight-regular">{{ history.subtitle }}</span>
          </div>
          <div class="text-right">
            <h6 class="text-subtitle-1 mb-0">{{ history.price }}</h6>
            <span class="text-h6 text-lightText">{{ history.pricepercent }}</span>
          </div>
        </div>
      </v-list-item>
    </v-list>
  </UiTitleCard>
</template>
