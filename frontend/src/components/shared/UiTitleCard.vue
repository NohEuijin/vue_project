<template>
  <v-card class="title-card" variant="text" rounded="md">
    <v-card-item class="pb-2 px-0 pt-0">
      <v-card-title class="ml-1 text-h6">{{ title }}</v-card-title>
    </v-card-item>
    <v-card-text variant="outlined" :class="className">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    className: String
  }
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
