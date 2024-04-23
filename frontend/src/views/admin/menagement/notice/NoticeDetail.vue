<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Ndetail from '@/layouts/admin/management/notice/Ndetail.vue';

const page = ref({ title: 'Detail' });
const breadcrumbs = shallowRef([
  {
    title: 'Management',
    disabled: false,
  },
  {
    title: 'Notice',
    disabled: false,
    href: '/notice'
  },
  {
    title: 'Detail',
    disabled: true,
    href: '/'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <Ndetail />
    </v-col>
  </v-row>
</template>
