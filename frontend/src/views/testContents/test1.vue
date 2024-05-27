<template>
  <div class="pa-4 text-center">
    <v-dialog
      width="auto"
      scrollable
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="brown"
          prepend-icon="mdi-earth"
          text="Select Country"
          variant="outlined"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card>
          <v-col class="pa-0">
            <v-col
            class="md_main_title">
            19:30~22:08(샤롯데)
            </v-col>
            <v-btn
            class="md_btn_close"
            icon="mdi-window-close"
            color="white"
            rounded="sm"
            variant="text"
            size="small"
            >
            </v-btn>
          </v-col>



          <v-divider class="mt-3"></v-divider>

          <v-card-text class="text-center px-4 modal_frame" >
            <v-col class=" remain_seat">
              잔여좌석<strong>30</strong>/32
            </v-col>
            <v-col class="md_screen">SCREEN</v-col>

            <v-col class="md_txt_notice">
              <p class="tit">
                <span>15</span>
                본영화는
                <strong>만 15세 이상 관람가</strong>
                영화입니다.
              </p>
            <p class="txt">
              <span>만 15세 미만의 고객님(영, 유아 포함)은 반드시 부모님 또는 성인 보호자의 동반하에
            </span>
            <span>
              관람이 가능합니다. 연령 확인 불가 시 입장이 제한될 수 있습니다.
              </span>
            </p>

            </v-col>

          </v-card-text>

          <!-- v-divider요소는 목록이나 레이아웃의 섹션을 구분하는 데 사용 -->
          <!-- <v-divider class="border-opacity-100" color="success"></v-divider> -->

          <v-card-actions class="md_btn_box">
            <v-btn
              class="md_cansle_btn"
              text="취소"
              variant="plan"
              @click="isActive.value = false"
            ></v-btn>
            <v-btn
              class="md_select_btn"
              color="surface-variant"
              text="인원/좌석 선택"
              variant="plan"
              @click="isActive.value = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: '',
      }
    },
  }
</script>
<style scoped>
.modal_frame{
  height: 400px;
  width: 500px;
}
.md_btn_close{
  position: absolute;
    right: 15px;
    top: 15px;
    width: 19px;
    height: 19px;
}
.md_main_title{
  background-color: #666;
  color: white;
  font-size: 18px;
  font-weight: 600 !important;
  text-align: center;
  min-height: 50px;
}
.remain_seat{
  font-size: 18px;
}
.remain_seat strong{
  font-family: 'Roboto';
  font-size: 22px;
}
.md_screen{
  position: relative;
  z-index: 1;
  color: #bdbdbd;
  letter-spacing: 5px;
  background: none;
}
.md_txt_notice{
  padding: 18px 0 26px;
}
.md_txt_notice .tit{
  margin-bottom: 5px;
  font-size: 13px;
  color: #111;
  line-height: 1.3;
}
.md_txt_notice strong{
  border-bottom: 1px solid #dd7430;
  color: #dd7430;
}
.md_txt_notice .txt{
  line-height: 1.4;
  font-size: 11px;
  color: #666;
  letter-spacing: -0.5px;
}
.md_btn_box{
  text-align: center;
  display:block;
}
.md_cansle_btn{
  height: 40px;
  line-height: 38px;
  padding: 0 18px;

  margin: 0 3px;
  min-width: 160px;

  display: inline-block;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #414141;
  font-size: 14px;
  color: #ffffff !important;
  text-align: center;
  vertical-align: middle;
  background-color: #414141;
}
.md_select_btn{
  height: 40px;
  line-height: 38px;
  padding: 0 18px;

  margin: 0 3px;
  min-width: 160px;

  display: inline-block;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #FF243E;
  font-size: 14px;
  color: #ffffff !important;
  text-align: center;
  vertical-align: middle;
  background-color: #FF243E;
}
</style>
