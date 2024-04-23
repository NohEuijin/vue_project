<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Nmodify from '@/layouts/admin/management/notice/Nmodify.vue';

const page = ref({ title: 'Modify' });
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
      <Nmodify />
    </v-col>
  </v-row>
</template>
