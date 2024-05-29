<template>
  <div class="ma-12 main-text-div">
    <v-text-field
      v-model="myInput"
      label="Input"
      outlined
    />
    <v-btn
      id="check_module"
      @click="kakao_pay"
      color="primary"
    >
      카카오 결제
    </v-btn>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      myInput: ''
    };
  },
  methods: {
    kakao_pay() {
      var IMP = window.IMP; // 생략가능
      IMP.init('imp24106650');
      IMP.request_pay(
        {
          pg: 'kakaopay.TC0ONETIME',
          pay_method: 'card',
          merchant_uid: 'merchant_' + new Date().getTime(),

          name: '주문명 : 아메리카노',
          amount: 2000,
          buyer_name: '이름',
          buyer_postcode: '123-456'
        },
        function (res) {
          console.log(res);
          let msg = '';
          if (res.success) {
            msg = '결제가 완료되었습니다.';
            msg += ' 결제 금액 : ' + res.paid_amount;
          } else {
            msg = '결제에 실패하였습니다.';
            msg += ' 에러 내용 : ' + res.error_msg;
          }
          alert(msg);
        }
      );
    }
  }
});
</script>

<style scoped>
.main-text-div {
  margin: 12px;
}
</style>
