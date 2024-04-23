<script>
export default {
  props: ['item']
}
</script>

<template>
  <v-list-subheader color="lightText" class="ml-2 smallCap text-subtitle-2">
    {{ item.header }}
  </v-list-subheader>
</template>

<!--
  props: ['item'] 값 = sidebarItem.js 값
 -->
