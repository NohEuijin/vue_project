<script setup>
const props = defineProps({
  title: String,
  breadcrumbs: Array,
  icon: String
});
</script>

<template>
  <v-row class="page-breadcrumb mb-0 mt-n2">
    <v-col cols="12" md="12">
      <v-card elevation="0" variant="text">
        <v-row no-gutters class="align-center">
          <v-col sm="12">
            <v-breadcrumbs :items="props.breadcrumbs" class="main_poster_tit text-lightText pa-1 mb-0">
              <template v-slot:divider>
                <div class="d-flex align-center">/</div>
              </template>
              <template v-slot:prepend>
                <router-link to="/admin/dashboard" class="text-lightText text-decoration-none main_poster_tit"> Home </router-link>
                <div class="d-flex align-center px-2">/</div>
              </template>
            </v-breadcrumbs>
            <h6 class="text-h4 mt-10 mb-0">{{ props.title }}</h6>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.page-breadcrumb {
  .v-toolbar {
    background: transparent;
  }
}
.main_poster_tit{
   font-size: 14px !important;
   font-weight: 600;
}
</style>
