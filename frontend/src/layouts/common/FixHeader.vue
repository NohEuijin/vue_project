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
            :class="{ 'btn_my2': joinState }"
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
            <a
            @click="$router.push({name:'mainticketing'})"
            >예매</a>
            <div class="display none">
              <ul>
                <li>
                  <a>
                  예매하기</a>
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
      <li v-show="!($store.state.meData && $store.state.meData.id)">
        <a
          class="btn_my"
          @click="$router.push({name:'join'})"
          >회원가입
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
        <a @click="$router.push({name:'mainticketing'})">
          예매
        </a>
        <div class="d-none">
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
      // console.log(res)
    }).catch(() => {
      // console.error("로그인 정보가 없습니다.")
    })
  }
  userData();

  let joinState = ref("회원가입");
  function joinStateCheck(){
    if(store.state.meData && store.state.meData.id){
      joinState.value = '';
    }else{
      joinState.value = "회원가입";
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
    // console.log(routerName.value)
    loginState();
    joinStateCheck();
  })

    return{
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
</style>
