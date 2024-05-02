<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import SdDetail from '@/layouts/admin/management/schedule/SdDetail.vue';

const page = ref({ title: 'Schedule' });
const breadcrumbs = shallowRef([
{
    title: 'Management',
    disabled: false,
  },
  {
    title: 'Schedule',
    disabled: false,
    href: '/admin/schedule'
  },
  {
    title: 'Detail',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <SdDetail />
    </v-col>
  </v-row>
</template>
<style>

</style>
