<template>
  <v-card variant="outlined" class="withbg" color="info">
    <v-card-text class="help_box">
      <div class="d-flex align-center justify-space-between">
        <div>
          <h5 class="text-h6 mb-0">도움 및 기술 지원</h5>
          <span class="text-caption text-lightText">
            최신 AI 지혜에게 물어 보세요!
          </span>
        </div>
        <div class="d-flex align-center justify-center flex-wrap flex-row-reverse">
          <v-avatar size="35" variant="outlined" color="surface" class="ml-n2">
            <img src="@/assets/images/users/avatar-4.png" width="35" alt="vector" />
          </v-avatar>
          <v-avatar size="35" variant="outlined" color="surface" class="ml-n2">
            <img src="@/assets/images/users/avatar-3.png" width="35" alt="vector" />
          </v-avatar>
          <v-avatar size="35" variant="outlined" color="surface" class="ml-n2">
            <img src="@/assets/images/users/avatar-2.png" width="35" alt="vector" />
          </v-avatar>
          <v-avatar size="35" variant="outlined" color="surface">
            <img src="@/assets/images/users/avatar-1.png" width="35" alt="vector" />
          </v-avatar>
        </div>
      </div>
      <v-btn color="info" block variant="flat" density="comfortable" class="mt-6" href="https://protectx.imweb.me/" target="_"
        >도움이 필요하다면?</v-btn>
    </v-card-text>
  </v-card>
</template>
<style lang="scss">
// .help_box{
//   border-color: #c7c7c7 !important;
// }
</style>
