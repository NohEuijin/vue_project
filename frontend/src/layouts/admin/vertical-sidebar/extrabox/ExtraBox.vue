<script setup>
</script>

<template>
  <v-sheet rounded="md" color="" class="pa-4 ExtraBox hide-menu text-center" >
    <div class="d-flex align-center flex-column">
      <img class="side_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Qs98MGBwA5n5xOMNh3ldrgQyKAYIxKf9FdZ7tg0Nvw&s" height="130" width="130">
      <div class="px-3">
        <h5 class="text-h5 mb-0 line-height-none">

        </h5>
        <small class="text-lightText text-h6">

        </small>
      </div>
    </div>
    <div class="mt-1">
      <a
        @click="$router.push({name:'index'})"
        target="_blank"
        class="v-btn v-theme--DefaultTheme bg-error v-btn--density-default v-btn--size-default v-btn--variant-flat primary-shadow"
        >
        <v-icon icon="mr-1 mdi-home-export-outline "></v-icon>
        Home
        </a>
    </div>
  </v-sheet>
</template>
<style lang="scss">
.ExtraBox {
  position: relative;
  overflow: hidden;
}
.line-height-none {
  line-height: normal;
}
.text-center{
  border-width: 1px !important;
  border-color: rgb(230, 230, 230) !important;
}
</style>
