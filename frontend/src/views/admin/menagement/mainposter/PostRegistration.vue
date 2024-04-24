<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Registe from '@/layouts/admin/management/mainposter/Registe.vue';

const page = ref({ title: 'Register' });
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
      <Registe />
    </v-col>
  </v-row>
</template>
