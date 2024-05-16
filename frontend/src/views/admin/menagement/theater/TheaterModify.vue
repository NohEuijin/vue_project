<script setup>
import { ref, shallowRef } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import TtModify from '@/layouts/admin/management/theater/TtModify.vue';

const page = ref({ title: 'Modify' });
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
    title: 'Modify',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"/>

  <v-row class="mt-0">
    <v-col cols="12" md="12">
      <TtModify />
    </v-col>
  </v-row>
</template>
<style>

</style>
