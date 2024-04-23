<template>
  <div class="footer">
    <div class="footer_inner">
    <div class="inner_item">
      <img src="@/assets/logo/logo_footer.gif" alt="">
    </div>
    <ul class="f_menu">
      <li>
        <a href="">회사소개</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="">이용약관</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="" style="font-weight: bold; text-decoration: underline;">개인정보처리방침</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="">이메일무단수집거부</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="">고정형 영상정보처리기기 운영 및 관리방침</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="">L.POINT회원안내</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="">배정기준</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="">채용안내</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="">광고/임대문의</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="">사회적책임</a>
      </li>
      <div class="address_box"></div>
    </ul>
    <div class="address_text">
      <address>
        서울특별시 송파구 올림픽로 300 롯데월드타워 27층
      </address>
      <br>
      <em>대표 이메일
        <em class="roboto pl5">lottecultureworks@lotte.net</em>
      </em>
      <em class="bar">
        <span class="before"></span>
        고객센터
        <em class="roboto">1544-8855</em>
        (유료)
      </em>
      <em class="bar">
        <span class="before"></span>
        사업자등록번호
        <em class="roboto">313-87-00979</em>
      </em>
      <em class="bar">
        <span class="before"></span>
        통신판매업신고번호 제
        <em class="roboto">1184</em>
        호
      </em>
      <a href="" style="font-weight: 500; text-decoration: underline;">사업자정보확인</a>
      <br>
      <em>대표이사 최병환</em>
      <em class="bar">
        <span class="before"></span>
        개인정보 보호 책임자 김병문
      </em>
      <em class="bar">
        <span class="before"></span>
        호스팅 제공자 롯데정보통신
      </em>
      <p class="copyright">Copyright © LOTTE Cultureworks All Right Reserved.</p>
      <div class="familysite">
        <select>
          <option>Family Site</option>
        </select>
      </div>
    </div>
  </div>
  <div class="article_award">
    <div class="footer_inner">
      <ul>
        <li>
          <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/common/footer_award_NCSI8.PNG?v=22042601" alt="">
        </li>
        <li>
          <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/common/footer_award_kcsi.png?v=21020102" alt="">
        </li>
        <li>
          <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/common/footer_award_kssqi-11.png?v=22111001" alt="">
        </li>
        <li>
          <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/common/footer_award_brandcinema.png?v=21020101" alt="">
        </li>
        <li>
          <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/common/footer_award_greenstar.png?v=21020101" alt="">
        </li>
        <li>
          <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/common/footer_award_brandstar.png?v=21020101" alt="">
        </li>
        <li>
          <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/common/footer_award_familyship.png?v=21020101" alt="">
        </li>
        <li>
          <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/common/footer_award_winner.png?v=21020101" alt="">
        </li>
      </ul>
    </div>
  </div>
  <div>
    <div class="main_wrap fixed" v-show="isBannerVisible">
    <div class="mainbanner_botton">
      <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/main/appbannermain_bottom.jpg" alt="">
    </div>
    <button class="btn_close" @click="closeBanner"></button>
  </div>
  <div class="mainbanner_blank" v-show="isBannerVisible"></div>
</div>
</div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup(){
  const isBannerVisible = ref(true);

  const closeBanner = () =>{
        isBannerVisible.value = false;
      setTimeoust(() => {
        isBannerVisible.value = true;
      },15000);//15초 후 배너가 다시 나타납니다.
    }
    return{
      isBannerVisible,
      closeBanner
    }
  }
}
</script>

<style>

.familysite select{
  min-width: 180px;
  cursor: pointer;

  border: 1px solid #DDD;
  background: #fff url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/arr_dw_13.png);
  background-repeat: no-repeat;
  background-position: right 6px top 50%;
  height: 40px;
  line-height: 40px;
  padding: 0 35px 0 18px;
  font-size: 14px;
  box-sizing: border-box;
  border-radius: 4px;
}

</style>
