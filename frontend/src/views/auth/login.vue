<template>
  <div id="contents" class="contents_full contents_member_comn">
    <!-- 회원 -->
  <div class="loginContents">
    <ul>
      <li>
        <button type="button" class="tab_tit">
          <p>회원</p>
        </button>
    <div class="tab_con">
      <h3 class="hidden">회원</h3>
      <div class="member_login_wrap">
        <div class="contents_inner">
          <div class="login_box">
          <p class="tip">
            L.POINT, 롯데시네마 ID로 별도의 회원가입 없이 이용 가능 합니다.
          </p>
          <div class="login_area">
            <input
             v-model="identifier"
             type="text"
             id="userId"
             clearable="true"
             maxlength="20"
             placeholder="아이디 또는 이메일을 입력해 주세요.">
            <input
            v-model="password"
            @keyup.enter="loginUser"
            type="password"
            id="userPassword"
            placeholder="비밀번호를 입력해 주세요.">
            <input type="hidden">
            <button
            @click="loginUser"
            type="button"
            class="btn_login"
            >로그인</button>
          </div>
          <div class="login_bot_wrap">
            <div class="login_check">
              <input
              v-model="save_id"
              type="checkbox"
              name="loginCheck"
              id="cheeckSaveId">
              <label for="cheeckSaveId">아이디 저장</label>
            </div>
          <div class="login_menu">
            <a
            @click="$router.push({ name : 'join' })"
            >회원가입</a>
            <a href=""><p class="tic"></p>아이디 찾기</a>
            <a href=""><p class="tic"></p>비밀번호 찾기</a>
          </div>
          <div class="block1"></div>
        </div>

        <div class="login_ad">
          <a href="">
            <img src="https://cf2.lottecinema.co.kr/lotte_image/2021/MinWise/0722/Minwise_18126_1.png" alt="">
          </a>
        </div>
          </div>
            <div class="ad_box">
              <a href="">
                <img src="https://cf2.lottecinema.co.kr/lotte_image/2022/Samsungfire/0525/Samsungfire_450220.png" alt="">
              </a>
            </div>
            </div>
          </div>
        </div>
      </li>

      <li>
        <button type="button">
          <p class="tab_tit2">비회원</p>
        </button>
      </li>

      <li>
        <button type="button">
          <p class="tab_tit3">소셜 로그인</p>
        </button>
      </li>

      <li class="wrap_nav_underline">
          <p class="nav_underline"></p>
      </li>

    </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter} from 'vue-router';

export default {
  setup(){
    const router = useRouter();
    const store = useStore();
    const identifier = ref('');
    const password = ref('');
    const save_id = ref(false);
    const SAVETOKEN = 'user_save_token';

    // 아이디 저장
    function loginChange(){
      const loginName = localStorage.getItem(SAVETOKEN);
      if(loginName){
        identifier.value = loginName
        save_id.value = true
      }
    }
    loginChange();

    // 로컬스토리지에 아이디 값 저장.
    const saveIdinCookie = () => {
      if(save_id.value){
        localStorage.setItem(SAVETOKEN, identifier.value);
      }else{
        localStorage.removeItem(SAVETOKEN);
      }
    };

    //로그인 처리
    const loginUser = async () => {
      checkBlank();
      try{
        await store.dispatch('login', {
          identifier: identifier.value,
          password: password.value
        })
        .then((res) => {
          if(res.role.id === "1"){
            saveIdinCookie();
          router.push({ name : 'index'});
          alert(res.name + "님 환영 합니다!")
          console.log( identifier.value )
          }else{
            alert("잘못된 접근 입니다!")
          }
        })
      }
      catch({err}){
        if (identifier.value.trim() && password.value.trim()) {
        alert("아이디 또는 비밀번호가 틀립니다!")
     }
     console.error( "로그인 실패 : " + err )
    }
  }

  //아이디 비밀번호 빈칸 체크
  const checkBlank = () => {
    if (!identifier.value.trim()) {
      alert('아이디를 입력해 주세요.');
      return;
    }
    if (!password.value.trim()) {
      alert('비밀번호를 입력해 주세요.');
      return;
  };

  }
    return{
      identifier,
      password,
      save_id,
      loginUser,
      loginChange,
      saveIdinCookie,
    }
  }
}
</script>

<style>
#contents{
  /* width: 980px;
  margin: 0 auto;
  padding: 50px 0 0 0; */

  min-width: 1024px;
  width: 1024px;
  margin: 0 auto;
}
#contents.contents_full{
  width: 100%;
}
#contents.contents_member_comn{
  padding-top: 105px;
}
.loginContents{
  padding-top: 80px;
  position: relative;
}
.loginContents .tab_tit{
  left: 50%;
  width: 326.667px;
  margin-left: -490px;

  position: absolute;
  top: 0;
  border-bottom: 2px solid #111;

  height: 50px;
    line-height: 50px;
}
.loginContents p{
  font-size: 15px;
}
.hidden{
  overflow: hidden;
  position: absolute !important;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
}
.member_login_wrap{
  padding: 60px 0;
  background-color: #F5F5F5;

  min-width: 1024px;
}
.contents_inner{
  width: 980px;
  margin: 0 auto;

  position: relative;
}
.login_box{
  position: relative;
  width: 470px;
  min-height: 220px;
}
.login_box p{
  font-size: 15px;
  font-weight: 500;
}
.login_area{
  position: relative;
  margin-top: 21px;
  padding-right: 120px;
}
.login_area input{
  display: block;
  width: 100%;
  height: 45px;

  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #DDD;

  line-height: 40px;
  padding: 0 18px;
}
/* input + input {
    margin-top: 10px;
} */
.btn_login{
  position: absolute;
  right: 0;
  top: 0;
  width: 110px;
  height: 100px;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  background-color: #FF243E;
}
.login_bot_wrap{
  margin: 15px 0 40px;
}
.login_check{
  float: left;
}
.login_check input{
  display: inline-block;
  border: 1px solid #DDD;
  background-color: #fff;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  cursor: pointer;
  vertical-align: -5px;
}
.login_check label{
  min-width: 88px;
  display: inline-block;
}
.login_menu{
  float: right;
  font-size: 0;
  line-height: 20px;
}
.login_menu a:first-child {
  margin-left: 0;
}
.login_menu a{
  position: relative;
  margin-left: 20px;
  color: #666;
  font-size: 12px;
}
.tic{
  position: absolute;
  left: -11px;
  top: 50%;
  margin-top: -5px;
  width: 1px;
  height: 10px;
  background: #ddd;
}
.block1{
  display: block;
  clear: both;
}
.login_ad{
  text-align: right;
}
.ad_box{
  position: absolute;
  right: 0;
  top: 20px;
  width: 451px;
  height: 220px;
}
.loginContents .tab_tit2{
  left: 50%;
  width: 326.667px;
  margin-left: -163.333px;

  position: absolute;
  top: 0;
  border-bottom: 1px solid #CCC;

  height: 50px;
  line-height: 50px;
}
.loginContents .tab_tit3{
  left: 50%;
  width: 326.667px;
  margin-left: 163.333px;

  position: absolute;
  top: 0;
  border-bottom: 1px solid #CCC;

  height: 50px;
  line-height: 50px;
}
/* 언더라인 */
.wrap_nav_underline{
  position: absolute;
  top: 50px;
  left: 50%;
  margin-left: -490px;
  width: 980px;
  height: 2px;
  margin-top: -2px;
  border: 0px solid #f00;
}
.nav_underline{
  position: absolute;
  left: 0;
  bottom: 0;
  width: 326.667px;
  height: 2px;
  background: #111;
  transition: all .3s ease-in-out;

  /* left: 326px; */
}
</style>
