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
      // I'mport 관리자 페이지 -> 내정보 -> 가맹점식별코드
      // ''안에 띄어쓰기 없이 가맹점 식별코드를 붙여넣어주세요. 안 그러면 결제창이 안 뜹니다.
      IMP.request_pay(
        {
          pg: 'kakaopay.TC0ONETIME',
          pay_method: 'card',
          merchant_uid: 'merchant_' + new Date().getTime(),
          /*
           *  merchant_uid의 경우
           *  https://docs.iamport.kr/implementation/payment
           *  위의 URL에 따라가시면 넣을 수 있는 방법이 있습니다.
           */
          name: '주문명 : 아메리카노',
          // 결제창에서 보여질 이름
          // name: '주문명 : ${auction.a_title}',
          // 위와 같이 model에 담은 정보를 넣어 쓸 수도 있습니다.
          amount: 2000,
          // amount: ${bid.b_bid},
          // 가격
          buyer_name: '이름',
          // 구매자 이름, 구매자 정보도 model 값으로 바꿀 수 있습니다.
          // 구매자 정보에 여러 가지도 있으므로, 자세한 내용은 맨 위 링크를 참고해주세요.
          buyer_postcode: '123-456'
        },
        function (res) {
          console.log(res);
          let msg = '';
          if (res.success) {
            msg = '결제가 완료되었습니다.';
            msg += ' 결제 금액 : ' + res.paid_amount;
            // success.submit();
            // 결제 성공 시 정보를 넘겨줘야 한다면 body에 form을 만든 뒤 위의 코드를 사용하는 방법이 있습니다.
            // 자세한 설명은 구글링으로 보시는게 좋습니다.
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
