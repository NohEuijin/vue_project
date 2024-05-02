<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import TtDetail from '@/layouts/admin/management/theater/TtDetail.vue';

const page = ref({ title: 'Detail' });
const breadcrumbs = shallowRef([
{
    title: 'Management',
    disabled: false,
  },
  {
    title: 'Theater',
    disabled: false,
    href: '/admin/theater'
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
      <TtDetail />
    </v-col>
  </v-row>
</template>
<style>

</style>
