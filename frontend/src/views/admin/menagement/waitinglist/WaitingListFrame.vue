<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import WaitingList from '@/layouts/admin/management/waitinglist/WaitingList.vue';

const page = ref({ title: 'WaitingAdminList' });
const breadcrumbs = shallowRef([
  {
    title: 'Management',
    disabled: false,
  },
  {
    title: 'WaitingList',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <WaitingList />
    </v-col>
  </v-row>
</template>
<style>

</style>
