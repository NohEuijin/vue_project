<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Detail from '@/layouts/admin/management/mainposter/Detail.vue';

const page = ref({ title: 'Detail' });
const breadcrumbs = shallowRef([
  {
    title: 'Management',
    disabled: false,
  },
  {
    title: 'Main Poster',
    disabled: false,
    href: '/admin/mainposter'
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
      <Detail />
    </v-col>
  </v-row>
</template>
