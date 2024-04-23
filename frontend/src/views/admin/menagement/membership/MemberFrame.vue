<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import MemberShipList from '@/layouts/admin/management/membership/MemberShipList.vue';

const page = ref({ title: 'MemberShip' });
const breadcrumbs = shallowRef([
{
    title: 'Management',
    disabled: false,
  },
  {
    title: 'MemberShip',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <MemberShipList />
    </v-col>
  </v-row>
</template>
<style>

</style>
