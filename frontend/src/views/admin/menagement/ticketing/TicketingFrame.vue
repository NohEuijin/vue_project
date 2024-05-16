<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Ticketing from '@/layouts/admin/management/ticketing/Ticketing.vue';

const page = ref({ title: 'Ticketing' });
const breadcrumbs = shallowRef([
  {
    title: 'Management',
    disabled: false,
  },
  {
    title: 'Ticketing',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <Ticketing />
    </v-col>
  </v-row>
</template>
<style>

</style>
