<template>
  <div>
    <div class="d-flex align-center pa-5">
      <v-avatar size="32" class="mr-2">
        <img src="@/assets/images/users/avatar-1.png" width="32" alt="Julia" />
      </v-avatar>
      <div>
        <h6 class="text-title mb-0">000 관리자 님</h6>
        <p class="text-caption mb-0">팀장</p>
      </div>
      <div class="ml-auto">
        <v-btn variant="text" color="primary" rounded="sm" icon size="large" @click="logout">
          <i class="pi pi-sign-out">
          </i>
        </v-btn>
      </div>
    </div>
    <v-tabs v-model="tab" color="primary" grow>
      <v-tab value="111">
        <i class="mr-2 pi pi-user"></i>
        Profile
      </v-tab>
      <v-tab value="222">
        <i class="mr-2 pi pi-cog"></i>
        Setting
      </v-tab>
    </v-tabs>
    <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 240px">
      <v-window v-model="tab">
        <v-window-item value="111">
          <v-list class="py-0" aria-label="프로필 목록" aria-busy="true">
            <v-list-item color="primary" rounded="0" value="Edit Profile">
              <template v-slot:prepend>
                <i class="pi pi-pencil p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                Edit Profile
              </v-list-item-title>
            </v-list-item>

            <v-list-item color="primary" rounded="0" value="View Profile">
              <template v-slot:prepend>
                <i class="pi pi-user p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                View Profile
              </v-list-item-title>
            </v-list-item>

            <v-list-item color="primary" rounded="0" value="Social Profile">
              <template v-slot:prepend>
                <i class="pi pi-book p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                Social Profile
              </v-list-item-title>
            </v-list-item>

            <v-list-item color="primary" rounded="0" value="Billing">
              <template v-slot:prepend>
                <i class="pi pi-dollar p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                Billing
              </v-list-item-title>
            </v-list-item>

            <v-list-item @click="authStore.logout()" color="secondary" rounded="0">
              <template v-slot:prepend>
                <i class="pi pi-sign-out p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                Logout
              </v-list-item-title>
            </v-list-item>
            <!-- 나머지 항목들 -->
          </v-list>
        </v-window-item>
        <v-window-item value="222">
          <v-list class="py-0" aria-label="설정 목록" aria-busy="true">

            <!-- 나머지 항목들 -->
            <v-list-item color="primary" rounded="0" value="Billing">
              <template v-slot:prepend>
                <i class="pi pi-question p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                Support
              </v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" rounded="0" value="Billing">
              <template v-slot:prepend>
                <i class="pi pi-user p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                Account settings
              </v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" rounded="0" value="Billing">
              <template v-slot:prepend>
                <i class="pi pi-lock p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                Privacy center
              </v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" rounded="0" value="Billing">
              <template v-slot:prepend>
                <i class="pi pi-comments p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                Feedback
              </v-list-item-title>
            </v-list-item>
            <v-list-item color="primary" rounded="0" value="Billing">
              <template v-slot:prepend>
                <i class="pi pi-list p_icon">
                </i>
              </template>
              <v-list-item-title class="ml-3 v_profile_tit">
                History
              </v-list-item-title>
            </v-list-item>


          </v-list>
        </v-window-item>
      </v-window>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null
    };
  },
  methods: {
    logout() {
      // 로그아웃 기능 구현
    }
  }
};
</script>
<style lang="scss">
.p_icon{
  font-size: 0.6rem;
}
</style>
