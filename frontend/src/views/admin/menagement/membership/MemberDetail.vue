<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import MsDetail from '@/layouts/admin/management/membership/MsDetail.vue';

const page = ref({ title: 'Detail' });
const breadcrumbs = shallowRef([
{
    title: 'Management',
    disabled: false,
  },
  {
    title: 'MemberShip',
    disabled: false,
    href: '/admin/membership'
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
      <MsDetail />
    </v-col>
  </v-row>
</template>
<style>

</style>
