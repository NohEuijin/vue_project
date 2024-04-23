<script setup lang="ts">
import { shallowRef } from 'vue';

import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const projects = shallowRef([
  {
    number: 13256498,
    order: 125,
    name: '범죄도시4',
    amount: '14,000' + '원',
    priority: 'rejected'
  },
  {
    number: 13286564,
    order: 100,
    name: '쿵푸팬더4',
    amount: '28,000' + '원',
    priority: 'approved'
  },
  {
    number: 84564564,
    order: 40,
    name: '파묘',
    amount: '40,570' + '원',
    priority: 'pending'
  },
  {
    number: 13256498,
    order: 125,
    name: '범죄도시4',
    amount: '14,000' + '원',
    priority: 'rejected'
  },
  {
    number: 13286564,
    order: 100,
    name: '쿵푸팬더4',
    amount: '28,000' + '원',
    priority: 'approved'
  },
  {
    number: 84564564,
    order: 40,
    name: '파묘',
    amount: '40,570' + '원',
    priority: 'rejected'
  },
  {
    number: 13256498,
    order: 125,
    name: '범죄도시4',
    amount: '14,000' + '원',
    priority: 'pending'
  },
  {
    number: 13286564,
    order: 100,
    name: '쿵푸팬더4',
    amount: '28,000' + '원',
    priority: 'approved'
  },
  {
    number: 84564564,
    order: 40,
    name: '파묘',
    amount: '40,570' + '원',
    priority: 'rejected'
  },
  {
    number: 13256498,
    order: 125,
    name: '범죄도시4',
    amount: '14,000' + '원',
    priority: 'pending'
  },
  {
    number: 13286564,
    order: 100,
    name: '쿵푸팬더4',
    amount: '28,000' + '원',
    priority: 'pending'
  },
  {
    number: 84564564,
    order: 40,
    name: '파묘',
    amount: '40,570' + '원',
    priority: 'rejected'
  },
]);
</script>

<template>
  <UiTitleCard title="Recent Orders" class-name="px-0 pb-0 rounded-md">
    <v-table class="bordered-table" hover density="comfortable">
      <thead class="bg-containerBg">
        <tr>
          <th class="text-left text-caption font-weight-bold text-uppercase">Tracking no.</th>
          <th class="text-left text-caption font-weight-bold text-uppercase">Product name</th>
          <th class="text-right text-caption font-weight-bold text-uppercase" style="min-width: 100px">Total order</th>
          <th class="text-left text-caption font-weight-bold text-uppercase">Status</th>
          <th class="text-right text-caption font-weight-bold text-uppercase">Total amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in projects" :key="item.name">
          <td class="py-3">
            <router-link to="/admin/dashboard/" class="text-secondary link-hover">{{ item.number }}</router-link>
          </td>
          <td class="py-3">{{ item.name }}</td>
          <td class="py-3 text-right" style="min-width: 100px">{{ item.order }}</td>
          <td class="py-3">
            <v-chip variant="text" size="small" class="px-0" v-if="item.priority === 'rejected'">
              <v-avatar size="8" color="error" variant="flat" class="mr-2"></v-avatar>
              <p class="text-h6 mb-0">취소</p>
            </v-chip>
            <v-chip variant="text" size="small" class="px-0" v-else-if="item.priority === 'approved'">
              <v-avatar size="8" color="success" variant="flat" class="mr-2"></v-avatar>
              <p class="text-h6 mb-0">완료</p>
            </v-chip>
            <v-chip variant="text" size="small" class="px-0" v-else>
              <v-avatar size="8" color="warning" variant="flat" class="mr-2"></v-avatar>
              <p class="text-h6 mb-0">대기</p>
            </v-chip>
          </td>
          <td class="py-3 text-right" style="min-width: 100px">{{ item.amount }}</td>
        </tr>
      </tbody>
    </v-table>
  </UiTitleCard>
</template>
