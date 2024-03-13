<template>
      <v-col col="12" class="pa-0 header_section">
      <h1 class="logo">
        <a href=""></a>
      </h1>
      <!-- 헤더 group nav bar -->
      <div class="gnb">
        <ul class="g_menu1">
          <li>
            <a href="" class="afb">페이스북</a>
          </li>
          <li>
            <a href="" class="ayt">유튜브</a>
          </li>
          <li>
            <a href="" class="ain">인스타그램</a>
          </li>
        </ul>
        <ul class="g_menu2">
          <li>
            <a href="">멤버십</a>
          </li>
          <li>
            <a href="">고객센터</a>
          </li>
          <li>
            <a href="">단체관람/대관문의</a>
          </li>
          <li>
            <a href="">로그인</a>
          </li>
        </ul>
        <ul class="g_menu3">
          <li>
            <a href="" class="btn_my">회원가입</a>
          </li>
          <li>
            <a href="" class="btn_reserve">바로예매</a>
          </li>
          <li>
            <button class="btn_menu">버튼</button>
          </li>
        </ul>
      </div>
      <!-- 헤더 nav bar -->
      <div class="nav">
        <ul>
          <li>
            <a href="">예매</a>
          </li>
          <li>
            <a href="">영화</a>
          </li>
          <li>
            <a href="">영화관</a>
          </li>
          <li>
            <a href="">이벤트</a>
          </li>
          <li>
            <a href="">스토어</a>
          </li>
        </ul>
      </div>
    </v-col>
</template>

<script>

export default {
  // 스크롤시 fixed 나중에 수정 하기
//   mounted() {
//     window.addEventListener('scroll', this.handleScroll);
//   },
//   methods: {
//     handleScroll() {
//       const headerSection = document.querySelector('.header_section');
//       if (headerSection) {
//         const headerSectionPosition = headerSection.getBoundingClientRect();
//         if (headerSectionPosition.top <= 0) {
//           headerSection.style.position = 'fixed';
//         } else {
//           headerSection.style.position = 'absolute';
//         }
//       }
//     }
//   },
//   beforeUnmount() {
//     window.removeEventListener('scroll', this.handleScroll);
//   }
};
</script>

<style lang="scss">
@import '@/assets/css/global.scss';
 /* 헤더 세션 */
.header_section{
  position : absolute;
  z-index: 2;
  height: 194px;
  background: linear-gradient(to bottom, rgba(29,29,31,1) 0%,rgba(0,0,0,0) 100%);
   /* background-color:gray;  */
}
// 헤더 fixed 시 css
.header_section.fixed{
  border-bottom: 1px solid #EEE;
  background: #fff;
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  right: 0;
  height: 43px;
}
/* 로고 */
.logo{
  position: absolute;
  z-index: 1;
  top: 18px;
  left: 50%;
  margin-left: -109px;
  text-indent: -9999em;
  background : url("https://www.lottecinema.co.kr/NLCHS/Content/images/common/logo_wht.png") no-repeat center center;
}
.logo a{
  display: block;
  width: 219px;
  height: 37px;
}
/* 왼쪽 ul 테그 정리 */
.gnb{
  border-bottom: 1px solid rgba(255, 255, 255, .3);
  position: relative;
  width: 980px;
  height: 70px;
  margin: 0 auto;
}
 .g_menu1{
  opacity: .5;
  float: left;
  margin-top: 40px;
}
.g_menu1 li{
  margin-right: 14px;
  float: left;
}
.g_menu1 a{
  height: 14px;
  line-height: 14px;
  background-repeat: no-repeat;
  background-position: 0 center;
  display: block;
  color: #FFF;
}
.afb{
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/gnb_facebook_wht.png);
    padding-left: 18px;
}

.ayt{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/gnb_youtube_wht.png);
  padding-left: 19px;
}
.ain{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/gnb_follow_wht.png);
  padding-left: 17px;
}
/* 오른쪽 ul 테그 정리 */
.g_menu2{
  opacity: .5;
  float: right;
  margin-top: 40px;
}
.g_menu2 li{
  margin-right: 14px;
  float: left;
}
.g_menu2 a{
  height: 14px;
  line-height: 14px;
  background-repeat: no-repeat;
  background-position: 0 center;
  display: block;
  color: #FFF;
}
/* 오른쪽 아래 ul 테그 정리 */
.g_menu3{
  position: absolute;
  right: 0;
  top: 88px;
  margin-top: 0;
}
.g_menu3 li{
  margin-right: 25px;
  float: left;
}
.g_menu3 a{
  height: 14px;
  line-height: 14px;
  font-size: 11px;
  background-repeat: no-repeat;
  background-position: 0 center;
  display: block;
  color: #FFF;
}
.btn_my{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/nav_side_my_wht.png);
  padding-left: 15px;
}
.btn_reserve{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/nav_side_reserve_wht.png);
  padding-left: 18px;
}
.btn_menu{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/nav_side_all_wht.png);
  width: 17px;
  margin-top: -2px;
  border: none;
  color: #FFF;
  text-indent: -9999em
}
 /* 메인 nav */
.nav{
  width: 980px;
  margin: 3px auto 0;
  text-align: center;
}
.nav li{
  display: inline-block;
  
}
.nav a{
  color: #FFF;
  line-height: 40px;
  position: relative;
  padding: 0 24px;
  font-size: 14px;
  letter-spacing: 0.1em;
}

</style>