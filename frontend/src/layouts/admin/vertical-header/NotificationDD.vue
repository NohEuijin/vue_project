<script setup lang="ts">
import { ref } from 'vue';

// 아이콘
import 'primeicons/primeicons.css'
const isActive = ref(true);

function deactivateItem() {
  isActive.value = false;
}
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false" offset="6, 0">
    <template v-slot:activator="{ props }">
      <v-btn icon class="text-secondary ml-sm-2 ml-1" color="darkText" rounded="sm" size="small" v-bind="props">
        <v-badge :content="isActive ? '2' : '0'" color="primary" offset-x="-4" offset-y="-5">
          <i class="pi pi-bell" style="font-size: 0.9rem"></i>
        </v-badge>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="387" class="notification-dropdown">
      <div class="pa-4">
        <div class="d-flex align-center justify-space-between">
          <h6 class="text-subtitle-1 mb-0">Notifications</h6>
          <v-btn
            variant="text"
            color="success"
            icon
            rounded
            size="small"
            @click="deactivateItem()"
            :class="isActive ? 'd-block' : 'd-none'"
          >
          <i class="pi pi-check"></i>
            <v-tooltip aria-label="tooltip" activator="parent" location="bottom" :content-class="isActive ? 'custom-tooltip' : 'd-none'">
              <span class="text-caption">Mark as all read</span>
            </v-tooltip>
          </v-btn>
        </div>
      </div>
      <hr class="noti_hr">
      <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 265px">
        <v-list class="py-0" lines="two" aria-label="notification list" aria-busy="true">
          <v-list-item value="1" color="secondary" class="no-spacer py-1" :active="isActive">
            <template v-slot:prepend>
              <v-avatar size="36" variant="flat" color="lightsuccess" class="mr-3 py-2 text-success">
                <i class="pi pi-user-plus noti_icon_deco"></i>
              </v-avatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-subtitle-1 font-weight-regular mb-0">
                <span style="font-weight: 600">
                   000
                </span> 님 회원 가입!
              </h6>
              <span class="text-caption">3:00 AM</span>
            </div>

            <p class="text-caption text-medium-emphasis my-0">2 min ago</p>
          </v-list-item>
          <hr class="noti_hr">
          <v-list-item value="2" color="secondary" class="no-spacer">
            <template v-slot:prepend>
              <v-avatar size="36" variant="flat" color="lightprimary" class="mr-3 py-2 text-primary">
                <i class="pi pi-comment noti_icon_deco">
                </i>
              </v-avatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-subtitle-1 font-weight-regular mb-0">
              <span style="font-weight: 500">
                000
              </span>님 문의 글 "할 수 있을까요?" </h6>
              <span class="text-caption">6:00 PM</span>
            </div>

            <p class="text-caption text-medium-emphasis my-0">5 August</p>
          </v-list-item>
          <hr class="noti_hr">
          <v-list-item value="3" color="secondary" class="no-spacer" :active="isActive">
            <template v-slot:prepend>
              <v-avatar size="36" variant="flat" color="lightprimary" class="mr-3 py-2 text-primary">
                <i class="pi pi-comment noti_icon_deco">
                </i>
              </v-avatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-subtitle-1 font-weight-regular mb-0">
              <span style="font-weight: 600">
                000
              </span>님 문의 글 "감사합니다!"</h6>
              <span class="text-caption">2:45 PM</span>
            </div>

            <p class="text-caption text-medium-emphasis my-0">7 hours ago</p>

          </v-list-item>

          <hr class="noti_hr">
          <v-list-item value="4" color="secondary" class="no-spacer">
            <template v-slot:prepend>
              <v-avatar size="36" variant="flat" color="lightprimary" class="mr-3 py-2 text-primary">
                <i class="pi
                pi-comment"
                style="font-size: 0.8rem">
                </i>
              </v-avatar>
            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-subtitle-1 font-weight-regular mb-0">
              <span style="font-weight: 600">
                000
              </span>님 문의 글 "이거 이렇게..."</h6>
              <span class="text-caption">9:10 PM</span>
            </div>

            <p class="text-caption text-medium-emphasis my-0">Daily scrum meeting time</p>
          </v-list-item>
          <hr class="noti_hr">
        </v-list>

      </perfect-scrollbar>

      <div class="pa-2 profil_text-center">
        <v-btn color="primary" variant="text">
          <span class="text-center-span">
            View All
          </span>

        </v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>

<style lang="scss">
.v-tooltip {
  > .v-overlay__content.custom-tooltip {
    padding: 2px 6px;
  }
}
.pi-bell{
  color: black;
}
.pi-check{
    color: green;
}
.pi-user-plus{
  color: black;
}
.profil_text-center{
  height: auto;
  position: fixed;
  bottom: 0;
  left: 120px;
}
.text-center-span{
  background-color: rgb(247, 251, 255);
  border-radius: 4px;
}
.noti_icon_deco{
  font-size: 0.8rem;
}
.noti_hr{
  margin: 0 0;
  border: 1px solid #f7f7f7 !important;
}
</style>
