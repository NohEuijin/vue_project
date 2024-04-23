<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import SalesList from '@/layouts/admin/management/sales/SalesList.vue';

const page = ref({ title: 'Sales' });
const breadcrumbs = shallowRef([
  {
    title: 'Management',
    disabled: false,
  },
  {
    title: 'Sales',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <SalesList />
    </v-col>
  </v-row>
</template>
<style>

</style>
