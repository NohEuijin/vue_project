<template>
  <v-col
  v-if="$route.name !== 'index'"
  class="pa-0 header_section_all">
      <div class="logo1" >
        <a  @click="$router.push({name:'index'})"></a>
      </div>
      <!-- 헤더 group nav1 bar -->
      <div class="gnb">
        <ul class="g_menu1all">
          <li>
            <a href="#" class="afb1">페이스북</a>
          </li>
          <li>
            <a href="#" class="ayt1">유튜브</a>
          </li>
          <li>
            <a href="#" class="ain1">인스타그램</a>
          </li>
        </ul>
        <ul class="g_menu2all">
          <li>
            <a href="#">멤버십</a>
          </li>
          <li>
        <a @click="$router.push({name:'freeBoard'})">커뮤니티</a>
      </li>
      <li>
        <a href="#">단체관람/대관문의</a>
      </li>

      <li
      v-for="(auth, authIdx) of header_auth" :key="authIdx">
        <a @click="clickHeaderAuth(auth.router)">
          {{ auth.title }}
        </a>
      </li>

        </ul>
        <ul class="g_menu3all">
          <li>
            <a
            :class="{ 'btn_my2': joinState === '회원가입' }"
            @click="$router.push({name:'join'})"
            >{{ joinState }}
          </a>
          </li>
          <li>
            <a href="#" class="btn_reserve2">바로예매</a>
          </li>
          <li>
            <button class="btn_menu2">버튼</button>
          </li>
        </ul>
      </div>
      <!-- 헤더 nav1 bar -->
      <div class="nav1">
        <ul>
          <li>
            <a href="#"
            @mouseover="blockBox"
            @mouseleave="noneBox"
            >예매</a>
            <div class="display none" :class="{ 'display': isBoxDisplay }">
              <ul>
                <li>
                  <a href="#">예매하기</a>
                </li>
                <li>
                  <a href="#">상영시간표</a>
                </li>
                <li>
                  <a href="#">할인안내</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <span class="before2"></span>
            <a href="#">영화</a>
          </li>
          <li>
            <span class="before2"></span>
            <a href="#">영화관</a>
          </li>
          <li>
            <span class="before2"></span>
            <a href="#">이벤트</a>
          </li>
          <li>
            <span class="before2"></span>
            <a href="#">스토어</a>
          </li>
        </ul>
      </div>
    </v-col>
    <v-col
    v-if="$route.name === 'index'"
    class="pa-0 header_section">
  <h1 class="logo" >
    <a  @click="$router.push({name:'index'})"></a>
  </h1>
  <!-- 헤더 group nav bar -->
  <div class="gnb1">
    <ul class="g_menu1">
      <li>
        <a href="#" class="afb">페이스북</a>
      </li>
      <li>
        <a href="#" class="ayt">유튜브</a>
      </li>
      <li>
        <a href="#" class="ain">인스타그램</a>
      </li>
    </ul>
    <ul class="g_menu2">
      <li>
        <a href="#">멤버십</a>
      </li>
      <li>
        <a @click="$router.push({name:'freeBoard'})">커뮤니티</a>
      </li>
      <li>
        <a href="#">단체관람/대관문의</a>
      </li>
      <!-- tit start -->
      <li
      v-for="(auth, authIdx) of header_auth" :key="authIdx">
        <a @click="clickHeaderAuth(auth.router)">
          {{ auth.title }}
        </a>
      </li>
      <!-- tit end -->
    </ul>
    <ul class="g_menu3">
      <li>
        <a
          :class="{ 'btn_my': joinState === '회원가입' }"
          @click="$router.push({name:'join'})"
          >{{ joinState }}
        </a>
      </li>
      <li>
        <a href="#" class="btn_reserve">바로예매</a>
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
        <a href="#"
        @mouseover="blockBox"
        @mouseleave="noneBox"
        >예매</a>
        <div class="display none" :class="{ 'display': isBoxDisplay }">
          <ul>
            <li>
              <a href="#">예매하기</a>
            </li>
            <li>
              <a href="#">상영시간표</a>
            </li>
            <li>
              <a href="#">할인안내</a>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <span class="before"></span>
        <a href="#">영화</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="#">영화관</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="#">이벤트</a>
      </li>
      <li>
        <span class="before"></span>
        <a href="#">스토어</a>
      </li>
    </ul>
  </div>
</v-col>
</template>

<script>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
  setup(){
  const route = useRoute()
  const store = useStore();
  const router = useRouter();


  // 로그인 정보 불러오기
  const userData = async () => {
    await store.dispatch('myData').then((res) =>{
      console.log(res)
    }).catch(() => {
      console.error("로그인 정보가 없습니다.")
    })
  }
  userData();

  let joinState = "회원가입";
  function joinStateCheck(){
    if(store.state.meData && store.state.meData.id){
      joinState = '';
    }else{
      joinState = "회원가입";
    }
  }
  joinStateCheck();

  // 기본값 로그인 meData 존재 = ""님
  let header_auth = ref([{title:"로그인",router:"login"}])

  //로그인 상태 체크
  function loginState() {
    if(store.state.meData && store.state.meData.id){
      header_auth.value = [
        {title:`${store.state.meData.name +" 님 "}`
        ,router:"index"},
        {title:"로그아웃",router:"login"}
      ]
    }else{
      header_auth.value  = [{title:"로그인",router:"login"}]
    }
  }
  loginState();

  //로그아웃
  const logout = () => {
  store.dispatch('logout')
  // alert("로그아웃 되었습니다!")
  }

  // router 가 index 인지 체크 (헤더 반전)
  const clickHeaderAuth = (headKey) => {
    if (headKey === 'index'){
      router.push({name:headKey})
    }else if(headKey === 'login'){
      logout()
      router.push({name:headKey})
    }
  }

  const routerName = ref(route.name);
  // watch : route.name을 기준으로 계속 체크 해줌
  watch(() => route.name, () => {
    routerName.value = route.name
    console.log(routerName.value)
    loginState();
    // joinStateCheck();
    if(store.state.meData && store.state.meData.id){
      joinState = '';
    }else{
      joinState = "회원가입";
    }
  })

  /*
  bannerShow 초기 true로 설정되어 있어 배너가 표시,
  bannerClose 함수 호출로 배너가 숨겨짐.
  */
  const bannerShow = ref(true);
  const bannerClose = () => {
    bannerShow.value = false;
  }
  const banners = [
    {
      img: "https://cf2.lottecinema.co.kr/lotte_image/2024/BobMarley_OneLove/0313/BobMarley_OneLove_98080.jpg",
      bg : 'purple2'
    },
    {
      img: "https://cf2.lottecinema.co.kr/lotte_image/2024/TheBraveBeluga/TheBraveBeluga_98080.jpg",
      bg : 'blue2'
    },
    {
      img: "https://cf2.lottecinema.co.kr/lotte_image/2024/BreadBarbershop/BreadBarbershop_980807.jpg",
      bg : 'black'
    },
  ];
  const bannerIndex = ref(Math.floor(Math.random() * banners.length));
    setInterval(() => {
    bannerIndex.value = Math.floor(Math.random() * banners.length);
    console.log(bannerIndex)
  },20000); //20 seconds

    return{
      banners,
      bannerIndex,
      bannerShow,
      bannerClose,
      userData,
      joinState,
      header_auth,
      logout,
      clickHeaderAuth,
      routerName,
    }
  }
}

</script>

<style lang="scss">
@import '@/assets/css/global.scss';
/* 배너 */
.inner{
  position: relative;
  width: 980px;
  height: 80px;
  margin: 0 auto;
  overflow: hidden;
}
.btn-close{
  position:absolute;
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/close_19_wht.png) no-repeat 50% 50%;
  width: 20px;
  height: 20px;
  top: 40%;
  right: 0;
}

 /* 헤더 세션 */
 .header_section_all{
  position: relative;
  height: 114px;
  border-bottom: 1px solid #EEE;
  background-color: #fff;
  color: #000;
}
 /* 헤더 fixed 시 css */

/* 로고 */
.logo1{
  position: absolute;
  z-index: 1;
  top: 18px;
  left: 50%;
  margin-left: -109px;
  text-indent: -9999em;
  background : url("https://www.lottecinema.co.kr/NLCHS/Content/images/common/logo.png") ;

  width: 219px;
  height: 37px;
}
.logo1 a{
  display: block;
  width: 219px;
  height: 37px;
}

/* 왼쪽 ul 테그 정리 */
.gnb{
  border-bottom: 1px solid #656565;
  position: relative;
  width: 980px;
  height: 70px;
  margin: 0 auto;
}
 .g_menu1all{
  float: left;
  margin-top: 40px;
  opacity: 1;
  color: #656565;
}
.g_menu1all li{
  margin-right: 14px;
  float: left;
}
.g_menu1all a{
  height: 14px;
  line-height: 14px;
  background-repeat: no-repeat;
  background-position: 0 center;
  display: block;
  color: #656565;
}
.afb1{
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/gnb_facebook.png);
    padding-left: 18px;
}

.ayt1{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/gnb_youtube.png);
  padding-left: 19px;
}
.ain1{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/gnb_follow2.png);
  padding-left: 17px;
}
/* 오른쪽 ul 테그 정리 */
.g_menu2all{
  opacity: 1;
  float: right;
  margin-top: 40px;
  color: #656565;
}
.g_menu2all li{
  margin-right: 14px;
  float: left;
}
.g_menu2all a{
  height: 14px;
  line-height: 14px;
  background-repeat: no-repeat;
  background-position: 0 center;
  display: block;
  color: #656565;
}
/* 오른쪽 아래 ul 테그 정리 */
.g_menu3all{
  position: absolute;
  right: 0;
  top: 86px;
  margin-top: 0;
}
.g_menu3all li{
  margin-right: 25px;
  float: left;
}
.g_menu3all a{
  height: 14px;
  line-height: 14px;
  font-size: 11px;
  background-repeat: no-repeat;
  background-position: 0 center;
  display: block;
  color: #656565;
}
.btn_my2{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/nav_side_my.png);
  padding-left: 15px;
}
.btn_reserve2{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/nav_side_reserve.png);
  padding-left: 18px;
}
.btn_menu2{
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/nav_side_all.png);
  width: 17px;
  margin-top: -2px;
  border: none;
  color: #656565;
  text-indent: -9999em
}
 /* 메인 nav1 */
.nav1{
  width: 980px;
  margin: 3px auto 0;
  text-align: center;
}
.nav1 li{
  display: inline-block;

}
.nav1 a{
  color: #000;
  line-height: 40px;
  position: relative;
  padding: 0 24px;
  font-size: 14px;
  letter-spacing: 0.1em;
}
 /* none 세션 */
.nav1 .display{
  display: none;
  background-color: rgba(0, 0, 0, .7);
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: 114px;
  height: 38px;
  text-align: center;
}
.nav1 .before2{
  opacity: 1;
  position: absolute;
  top: 83%;
  height: 9px;
  margin-top: -5px;
  border-left: 1px solid #c0c0c0;
}

 /* 헤더 세션 */
 .header_section{
  position : absolute;
  z-index: 2;
  height: 194px;
  width: 100%;
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
.gnb1{
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
// none 세션
.nav .display{
  display: none;
  background-color: rgba(0, 0, 0, .7);
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: 114px;
  height: 38px;
  text-align: center;
}

</style>
