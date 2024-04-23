<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Nregiste from '@/layouts/admin/management/notice/Nregiste.vue';

const page = ref({ title: 'Register' });
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
    title: 'Register',
    disabled: true,
    href: '/'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <Nregiste />
    </v-col>
  </v-row>
</template>
