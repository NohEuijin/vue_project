<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Modify from '@/layouts/admin/management/mainposter/Modify.vue';

const page = ref({ title: 'Modify' });
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
    title: 'Modify',
    disabled: true,
    href: '/'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <Modify />
    </v-col>
  </v-row>
</template>
