<template>
  <body id="KOR">
  <div class="mast_head">
    <v-container class="pa-0 a h-container">
      <v-col class="pa-0 bi">
        <a href="">
          <img src="https://members.lpoint.com/resources/images/common/bi-lpoint-new.png" alt="">
        </a>
        <a @click="$router.push({name:'index'})">
          <img src="https://members.lpoint.com/resources/images/logo/img_1050.png" alt="">
        </a>
      </v-col>
    </v-container>
  </div>

  <div class="mast_body">
    <div class="mb_container">
      <div>
        <h2 class="title">롯데시네마 회원가입</h2>
        <form action="" method="" id="join-form">

<!-- 약관동의 -->
<div class="join-input">
  <div class="join-term-title">
    <h3>약관동의</h3>
    <p>필수 약관에 동의하지 않으면 회원가입을 할 수 없습니다.</p>
    </div>
    <div class="total-select-checkbox">
      <label for="total-check">
        <input
        v-model="allChecked"
        @change="toggleAllTerms"
        type="checkbox" id="total-check" name="total-check" >
        아래 약관에 모두 동의합니다.
      </label>
    </div>
    <div class="join-term">
      <div
      v-for="(term, index) in terms" :key="index"
      class="terms">
        <input
        v-model="checkedTerms[index]"
        @change="checkTotalTerm"
        type="checkbox" :id="'term'+(index+1)" class="term" >
        <label :for="'term'+(index+1)">
          {{ term.name }}
          <em class="must"> (필수)</em>
        </label>
        <p class="more-btn">
          <a :href="term.link">더보기</a>
        </p>
      </div>
    </div>



    <!-- 회원 정보 입력 -->
    <div class="join-input-title">
        <h3>회원 정보</h3>
    </div>
    <!-- 아이디 username -->
    <div class="join-id-input user-input">
    <img src="/src/assets/user/userId.png" alt="userId" class="userId-img join-img"/>
    <input
    v-model="username"
    @input="checkUsername($event)"
    type="text" id="username" name="username"
    maxlength="20"
    placeholder="영문 소문자, 숫자를 사용한 6~13자리" />
    <label for="username" class="input-title">아이디</label>

    <!--추후 비동기로 중복여부 확인-->
    <div v-if="availableUsername">
      <em class="material-symbols-outlined check-icon">done</em>
    </div>
    <div v-else-if="usernameFomat" for="username" class="checkedUserNameh check">
      <em>영문 소문자, 숫자를 사용한 6 ~ 13자리 확인 해주세요.</em>
    </div>
    <!-- <div v-else for="username" class="checkedUserNameh-unavailable check">
      <em>이미 가입된 아이디입니다.</em>
    </div> -->

  </div>

    <!-- 비밀번호 password -->
    <div class="login-pw-input user-input">
      <img src="/src/assets/user/userPw.png" alt="userPassword" class="userPw-img join-img"/>
      <input
      v-model="password"
      @input="checkPassword($event)"
      maxlength="20"
      type="password" id="password" name="password"
      placeholder="특수문자와 숫자를 포함하여 8 ~ 15 자리 기입하세요" />
      <!-- oninput="checkPw()" -->
      <label for="password" class="input-title">비밀번호</label>

    <label
    v-if="availablePassword"
    for="userPassword"
    class="userPw-available check">
      <em class="material-symbols-outlined check-icon">
          done
      </em>
    </label>
      <label
      v-else-if="passwordFomat"
      for="userPassword"
      class="userPw-unavailable check">
      <em>
        사용 불가능한 비밀번호입니다.
      </em>
    </label>
    </div>
    <!-- 비밀번호 확인  -->
    <div class="login-pw-ch-input user-input">
      <img src="/src/assets/user/userPw.png" alt="userPassword" class="userPw-img join-img"/>

    <input
    v-model="rePassword"
    @input="reCheckPassword($event)"
    maxlength="20"
    type="password" id="userPasswordCh"
    name="userPasswordCh" placeholder="비밀번호를 다시 입력해주세요"/>
    <label for="userPasswordCh" class="input-title">비밀번호 확인</label>

    <label
    v-if="availableRePassword"
    for="userPasswordCh" class="userPwChOk check">
      <em class="material-symbols-outlined check-icon">
        done
      </em>
    </label>

    <label
    v-else-if="passwordReFomat"
    for="userPasswordCh" class="userPwCh check">
      <em>비밀번호가 일치하지 않습니다.</em>
    </label>

    </div>

    <!-- 이름 name -->
    <div class="login-name-input user-input">
      <img src="/src/assets/user/userId.png" alt="userName" class="userName-img join-img"/>
      <input
      v-model="name"
      @input="checkNameFormat()"
      maxlength="10"
      type="text" id="name" name="name" placeholder="성명을 입력하세요.()" />
      <label for="userId" class="input-title">이름</label>

    </div>
    <!-- 폰 phone -->
    <div class="login-phone-input user-input">
      <img src="/src/assets/user/phone.png" alt="userPhone" class="userPhone-img join-img"/>
      <input
      v-model="phone"
      @input="checkNumberFormat()"
      maxlength="11"
      type="text" id="phone" name="phone"
      placeholder="번호를 입력해주세요.( -제외 )"  />
      <!-- onkeyup="AllCharacterCheck(this)" -->
      <label for="phone" class="input-title">휴대폰 번호</label>

      <!--휴대폰 중복검사 추후-->
      <!-- <label
      v-if="availablePhone"
      for="userPhone" class="userPhone-available check">
        <em class="material-symbols-outlined check-icon">
          done
        </em>
      </label> -->
      <!-- <label
      v-else
      for="userPhone" class="userPhone-unavailable check">
        <em>이미 가입된 번호입니다.</em>
      </label> -->

    </div>

    <!-- 이메일 email -->
    <div class="login-email-input user-input">
      <img src="/src/assets/user/email.png" alt="userEmail" class="userEmail-img join-img"/>
      <input
      v-model="email"
      @input="checkEmail"
      type="text" id="email" name="email"
      placeholder="이메일을 입력하세요."  />
      <!-- onkeyup="characterCheck(this)" -->
      <label for="userId" class="input-title">이메일</label>

      <!--이메일 중복검사 추후-->
      <label
      v-if="availableEmail"
      for="userEmail"
      class="userEmail-available check-icon">
        <em class="material-symbols-outlined">
          done
        </em>
        </label>
      <label
      v-else-if="emailFomat"
      for="userEmail"
      class="userEmailCh check">
        <em>이메일 형식이 아닙니다.</em>
      </label>
    <!-- <label
      v-else-if="emailFomat"
      for="userEmail"
      class="userEmail-unavailable check">
        <em>이미 가입된 이메일입니다.</em>
      </label> -->
    </div>

    <div class="login-address-input user-input">
        <div class="address-post-code">
            <img src="/src/assets/user/addr.png" alt="userAddress" class="userAddress-img join-img"/>
            <input
            v-model="addressZipCode"
            class="postalCode" type="text" id="addressPost"
            name="addressPost"
            readonly>
            <input
            v-model="address"
            type="text" id="address"
            name="address"
            readonly/>
            <label for="userId" class="input-title">주소</label>
        </div>

        <div class="mb-2">
        </div>
            <input
            v-model="addressDong"
            type="text" id="addressDetail"
            name="addressDetail" />
            <input
            v-model="addressDetail"
            type="text" id="addressDetails"
            name="addressDetails"
            placeholder="상세주소 입력" />
        <button
        @click="openPost()"
        type="button" class="addrBtn"
        value="우편번호 찾기" >
        주소찾기
        </button>

    </div>
</div>
    <!-- 회원 정보 입력 끝 -->
          <div class="join-btn">
            <button class="join-submit-btn" type="button" @click="submitForm">가 입 하 기</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="mast_foot">
    <div class="f_container">
      <div class="">
        <div class="utility">
          <div class="item">
            <a href="">회사소개</a>
          </div>
          <div class="item">
            <div class="mf_before">·</div>
            <a href="">고객센터</a>
          </div>
          <div class="item">
            <div class="mf_before">·</div>
            <a href="">이용약관</a>
          </div>
          <div class="item">
            <div class="mf_before">·</div>
            <a href="">
              <em class="point_color">개인정보처리방침</em>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-5 com-address">
        <address>
          <em>
            서울시 중구 통일로 2길 16 AIA타워 14층
            <em class="mf_after">|</em>
          </em>
          <em>
            회사명 롯데멤버스(주)
            <em class="mf_after">|</em>
          </em>
          <em>
            대표이사 김혜주
            <em class="mf_after">|</em>
          </em>
          <em>
            사업자등록번호 104-86-58491
            <em class="mf_after">|</em>
          </em>
          <em>
            고객센터 1899-8900
            <em class="mf_after"></em>
          </em>
        </address>
      </div>

      <div class="copyright">
        © LOTTE MEMBERS CO..LTD.
      </div>

      <div class="friendly" ref="friendly">
    <div class="site-linker" :class="{ 'active': isActive[0] }" ref="siteLinker1">
      <button type="button" role="button" @click="toggleActive(0)">
        <div class="b_before"></div>
        Service Site
      </button>
      <ul v-show="isActive[0]">
        <li>
          <a href="">L.POINT</a>
        </li>
      </ul>
    </div>
    <div class="site-linker" :class="{ 'active': isActive[1] }" ref="siteLinker2">
      <button type="button" role="button" @click="toggleActive(1)">
        <div class="b_before"></div>
        Family Site
      </button>
      <ul v-show="isActive[1]">
        <li>
          <a href="">롯데그룹</a>
          </li>
        </ul>
      </div>
      </div>

    </div>
  </div>
</body>
</template>

<script>
import { ref, watch, watchEffect, getCurrentInstance, onMounted, onUnmounted  } from 'vue';
import { useStore } from 'vuex';
import { useRouter} from 'vue-router';

export default {
  setup(){
  const store = useStore();
  const router = useRouter();
  // 전역 함수 테스트
  const currentInstance = getCurrentInstance();
  const validate = currentInstance.appContext.config.globalProperties.$valid
  const vuedaumpostcode = currentInstance.appContext.config.globalProperties.$vuedaumpostcode

  // console.log(validate)
  // console.log(vuedaumpostcode)

  /**약관 동의
  @param {terms} 약관 배열
  @param {allChecked} 전체 동의 체크
  @param {checkedTerms} 각 약관 동의 여부 체크
  @param {toggleAllTerms} 전체 동의 체크시 메소드
  @param {checkTotalTerm} 각 약관 동의에 따른 메소드
  */
  const terms = [
      { name: '서비스 이용약관', link: '#' },
      { name: '개인정보 수집 및 이용 동의', link: '#' },
      { name: '개인정보 취급위탁 동의', link: '#' },
    ];

    const allChecked = ref(false);
    const checkedTerms = ref(Array(terms.length).fill(false));

    function toggleAllTerms(){
      checkedTerms.value = checkedTerms.value.map(() => allChecked.value);
    };
    function checkTotalTerm() {
      allChecked.value = checkedTerms.value.every(term => term);
  }

  /*
{ deep: true }
: watch 함수에 전달되는 옵션 객체
: watch 함수의 세 번째 매개변수로 전달
: 객체 또는 배열의 내부 변경 사항도 감시할지 여부를 결정
: 위 같이 사용 시, 객체 또는 배열 내부의 값이 변경될 때도 감시
  */
watch(checkedTerms, (allValue) => {
  const allCheckedValue = allValue.every(term => term);
  if (allCheckedValue) {
    alert("모든 약관에 동의하였습니다.")
  }
}, { deep: true });

  // join info
  const username = ref('');
  const password = ref('');
  const rePassword = ref('');
  const name = ref('');
  const phone = ref('');
  const email = ref('');
  const addressZipCode = ref('');
  const address = ref('');
  const addressDong =ref('');
  const addressDetail = ref('');

  async function submitForm(){
    await joinCheck();
    const form = {
      username: username.value,
      password: password.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      addressZipCode: addressZipCode.value,
      address: address.value,
      addressDong: addressDong.value,
      addressDetail: addressDetail.value,
    }
    console.log(form)
    await store.dispatch('register', form).then((res) => {
      console.log(res);

      router.push({ name : 'login'});
    })
  };

  /**유효성 검사
  @param {joinCheck} 회원가입 유효성 체크
  @returns 완료한 회원가입 유효성 체크
  */
  async function joinCheck(){
    if(await duplicateTermsCheck()){
    }else{
      return
    }
    if(await duplicateUserCheck()){
    }else{
      return
    }
    if(await duplicatePasswordCheck()){
    }else{
      return
    }
    if(await duplicatePasswordReCheck()){
    }else{
      return
    }
    if(await duplicateNameCheck()){
    }else{
      return
    }
    if(await duplicatePhoneCheck()){
    }else{
      return
    }
    if(await duplicateAddressCheck()){
    }else{
      return
    }
  }

  const idCheck = /^[A-Za-z0-9]{6,13}$/;
  const passwordCheck = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).{8,15}$/;
  const emailCheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  //dispatch 값 받아 올때
  //{username:username.value} 기억하기

  async function duplicateTermsCheck(){
    // console.log(allChecked.value)
    if(allChecked.value === false){
      alert("약관을 모두 체크해 주세요!")
      return false
    }
    return true
  }
  async function duplicateUserCheck(){
    const checkedUserName = await store.dispatch('duplicateUser',{username:username.value})
    // console.log(checkedUserName.users.length)
    // console.log(username.value)
    if(!username.value.trim()){
      alert("아이디를 입력해 주세요!")
      return false
    }else if(!idCheck.test(username.value)){
      alert("아이디 형식이 맞지 않습니다!")
      return false
    }else if(checkedUserName.users.length > 0){
      alert("중복된 아이디 입니다! 수정해주세요")
      return false
    }
    return true
  }
  async function duplicatePasswordCheck(){
    // console.log(password.value)
    if(!validate.checkBlank(password.value)){
      alert("비밀번호를 입력해 주세요!")
      return false
    }else if(!passwordCheck.test(password.value)){
      alert("비밀번호를 형식이 맞지 않습니다!")
      return false
    }
    return true
  }
  async function duplicatePasswordReCheck(){
    // console.log(rePassword.value)
    if(!validate.checkBlank(rePassword.value)){
      alert("비밀번호 확인 해주세요!")
      return false
    }else if(password.value !== rePassword.value){
      alert("비밀번호와 확인이 맞지 않습니다!")
      return false
    }
    return true
  }
  async function duplicateNameCheck(){
    // console.log(name.value)
    if(!validate.checkBlank(name.value)){
      alert("이름을 입력해 주세요!")
      return false
    }
    return true
  }
  async function duplicatePhoneCheck(){
    // console.log(phone.value)
    if(!validate.checkBlank(phone.value)){
      alert("휴대폰 번호를 입력해 주세요!")
      return false
    }
    return true
  }
  async function duplicatePhoneCheck(){

    const checkedEmail = await store.dispatch('duplicateEmail',{email:email.value})
    // console.log(email.value)
    // console.log(checkedEmail.users.length)
    if(!validate.checkBlank(email.value)){
      alert("이메일을 입력해 주세요!")
      return false
    }else if(!emailCheck.test(email.value)){
      alert("이메일 형식이 맞지 않습니다!")
      return false
    }else if(checkedEmail.users.length > 0){
      alert("중복된 이메일 입니다! 수정해주세요")
      return false
    }
    return true
  }
  async function duplicateAddressCheck(){
    // console.log(address.value)
    if(!validate.checkBlank(address.value)){
      alert("주소를 입력해 주세요!")
      return false
    }
    return true
  }

  /**
  회원가입에서 항목 검사
  */

  //유저 체크
  const availableUsername = ref(false);
  const usernameFomat = ref(false);
  function checkUsername(e){
    if(idCheck.test(e.target.value)){
      username.value = e.target.value
      availableUsername.value =true;
    }else if(!validate.checkBlank(e.target.value)){
      availableUsername.value =false;
      usernameFomat.value = false;
    }else{
      availableUsername.value =false;
      usernameFomat.value = true;
    }
  };
  //비밀번호 체크
  const availablePassword = ref(false);
  const passwordFomat = ref(false);
   function checkPassword(e){
    // console.log(e.target.value)

    // console.log(passwordCheck.test(e.target.value))
    if(passwordCheck.test(e.target.value)){
      password.value = e.target.value
      availablePassword.value =true;
    }else if(!e.target.value.trim()){
      availablePassword.value =false;
      passwordFomat.value = false;
    }else{
      availablePassword.value =false;
      passwordFomat.value = true;
    }
  };
  //비밀번호 확인

  const availableRePassword = ref(false);
  const passwordReFomat = ref(false);
  function reCheckPassword(e){
    if(password.value===e.target.value){
      availableRePassword.value = true;
    }else if(!e.target.value.trim()){
      availableRePassword.value = false
      passwordReFomat.value = false;
    }else{
      passwordReFomat.value = true;
      availableRePassword.value = false
    }
  }

  //이름 체크
  function checkNameFormat(){
    const nameCheck = /^[가-힣a-zA-Z]*$/;
      if (!nameCheck.test(name.value)) {
        name.value = '';
    }
  };

  //번호 체크
  function checkNumberFormat(){
    const numberCheck = /^[0-9]*$/;
    if (!numberCheck.test(phone.value)) {
      phone.value = '';
    }
  };

  //이메일 체크
  const availableEmail = ref(false);
  const emailFomat = ref(false);
  function checkEmail(e){
    if(emailCheck.test(e.target.value)){
      availableEmail.value =true;
    }else if(!e.target.value.trim()){
      availableEmail.value =false;
      emailFomat.value = false;
    }else{
      availableEmail.value =false;
      emailFomat.value = true;
    }
  };

  /**다음 API
  @param {addr} 주소 변수
  @param {extraAddr} 참고항목 변수(동)
  */
  function openPost(){
    new daum.Postcode({
      oncomplete: function(data) {
    /*
    팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
    각 주소의 노출 규칙에 따라 주소를 조합한다.
    내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
    */
    var addr = '';
    var extraAddr = '';

    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
    if (data.userSelectedType === 'R') {
      // 사용자가 도로명 주소를 선택했을 경우
      addr = data.roadAddress;
    } else { // 사용자가 지번 주소를 선택했을 경우(J)
      addr = data.jibunAddress;
    }
    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
    if(data.userSelectedType === 'R'){
      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
          extraAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if(data.buildingName !== '' && data.apartment === 'Y'){
          extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if(extraAddr !== ''){
          extraAddr = ' (' + extraAddr + ')';
      } console.log(extraAddr);
      // 조합된 참고항목을 해당 필드에 넣는다.
      addressDong.value = extraAddr;
    } else {
      addressDong.value = '';
    }
    // 우편번호와 주소 정보를 해당 필드에 넣는다.
    addressZipCode.value = data.zonecode;
    address.value = addr;
    // 커서를 상세주소 필드로 이동
    document.getElementById('addressDetails').focus();
  }
  }).open()
  console.log("성공!!")
}

// footer button show
const isActive = ref([false, false]);
const friendly = ref('');
const siteLinker1 = ref('');
const siteLinker2 = ref('');


const toggleActive = (index) => {
  isActive.value[index] = !isActive.value[index];
};
/**
- 전역 처리
- 특정 영역 외의 클릭을 감지하고, 해당 영역을 닫는 역할
- onMounted 훅을 사용하여 컴포넌트가 마운트되면 등록되고,
- onUnmounted 훅을 사용하여 컴포넌트가 언마운트될 때 제거됩니다.
*/
const handleClickOutside = (event) => {
  if (
    !friendly.value.contains(event.target) &&
    !siteLinker1.value.contains(event.target) &&
    !siteLinker2.value.contains(event.target)
  ) {
    isActive.value = [false, false];
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

  return {
  username,
  password,
  name,
  phone,
  email,
  addressZipCode,
  address,
  addressDetail,
  addressDong,
  submitForm,
  openPost,
  checkUsername,
  availableUsername,
  usernameFomat,
  checkPassword,
  availablePassword,
  passwordFomat,
  reCheckPassword,
  availableRePassword,
  passwordReFomat,
  rePassword,
  checkNameFormat,
  checkNumberFormat,
  availableEmail,
  emailFomat,
  checkEmail,
  terms,
  allChecked,
  checkedTerms,
  toggleAllTerms,
  checkTotalTerm,
  isActive,
  toggleActive,
  friendly,
  siteLinker1,
  siteLinker2,
};
}
};
</script>

<style>
/* #KOR{
  font-size: 15px;
  letter-spacing: -0.05em;

  font-family: 'GowunDodum-Regular';
  font-weight: normal;
  font-style: normal;
} */
em, p, address{
  font-style: normal;
  font-weight: 600;
}
select:focus, textarea:focus, a:focus, input:focus, button:focus{
  outline: 3px solid rgba(255, 37, 52, .3);
}
.mast_head{
  height: 80px;
  border-bottom: 1px solid #ebebeb;
}
.h-container img{
  cursor: pointer;
}
.bi{
  font-size: 16px;
    height: 80px;
    line-height: 80px;
    background: url(https://members.lpoint.com/resources/images/ico/ico-with.png) no-repeat 90px 53%;
}
.bi a{
  float: left;
}
.bi a:nth-child(2) {
  margin-left: 38px;
}
.h-container img{
  max-height: 50px;
  width: auto;

  vertical-align: middle;
}
.h-container a:first-child img {
  height: 18px;
}
.mb_container{
  margin: 0 auto;
  padding: 40px 0 100px 0;
  max-width: 1100px;
}
.mast_body .title{
  margin-bottom: 38px;
  padding: 8px 0;
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;
  color: #000;
  word-break: break-all;

  margin-left: 220px;
}

/* 회원가입 양식 */
.join-page-wrap {
  width: 1024px;
  margin: 150px auto;
  /* font-family: 'GmarketSansMedium'; */
}
.img-container {
  width: 100%;
  height: 200px;
  min-width: 900px;
  text-align: center;
  margin: 120px 0px 70px 0px;
  position: relative;
}
.title-logo {
  width: 300px;
  margin: 0 auto;
  position: relative;

}
.title-logo a {
  display: flex;
  margin: 0 auto;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.puppy-img {
  width: 150px;
  height: 180px;
}
.title-img {
 position: relative;

}
.join-term-title  {
   padding-bottom: 20px;

}
.join-term-title p {
  font-size: 13px;
  margin-top: 10px;
  font-weight: 400;
}

.join-input {
  display: flex;
  flex-direction: column;
  width: 650px;
  margin: 0 auto;
}

.total-select-checkbox {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    height: 40px;
    width: 650px;
    padding: 10px;
    background-color: #a1dbff;
    color: #393939;
}
.total-select-checkbox label{
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
}

#total-check {
    vertical-align: middle;
    width: 20px;
}

.join-term {
    font-size: 14px;
    color: gray;
    width: 650px;
    height: 140px;
    border: 1px solid rgba(128, 128, 128, 0.525);
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    margin: 10px 0px 0px 0px;
    line-height: 2.5;

}
.join-term label {
    cursor: pointer;
    width: 100%;
    display: flex;
    font-weight: 600;
}

.must {
  margin-left: 5px;
  color: rgba(193, 27, 27, 0.983);
}
.more-btn {
  width: 100%;
  text-align: end;
}

.more-btn a{
  border-bottom: 1px solid gray;
  color: rgb(164, 164, 164);
  font-size: 10px;
}

.join-term input {
    margin-right: 10px;
    width: 11px !important;

}
.terms {
    display: flex;
    align-items: center;
}
.check-icon {
    position: absolute;
    z-index: 99;
    right: 2px;
    color:  green;
    top: 19px;
}
.join-input-title {
    padding-top: 25px;
}
.join-id-input {
    margin-top: 20px;
}
.user-input {
   position: relative;
  padding-bottom: 10px;
}
.join-img {
    position: absolute;
    width: 11px;
    height: 11px;
    top:16px;
    left: 13px;
}
.input-title {
    font-size: 13px;
    position: absolute;
    left: 30px;
    top: 10px;
}

.check {
    color: red;
    font-size: 13px;
}
.join-input input {
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.516);
    width: 650px;
    box-sizing: border-box;
    text-indent: 30px;
    padding: 30px 0px 10px 0px;
    font-size: 13px;
}
.login-address-input {
    position: relative;

}
.login-address-input .join-img {
    top: 12px;
}

.address-post-code {
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.516);
}

#addressPost {
  background-color: white;

  border: none;
  width: 15%;
}
#address {
  background-color: white;
  border: none;
  width: 65%;
}

#addressDetail {
  padding: 15px 0px 15px 0px;
  width: 130px;
  text-indent: 0;
  text-align: center;
}
#addressDetails {
  padding: 15px 0px 15px 0px;

  width: 520px;
  text-indent: 20px;
}

.addrBtn {
    /* font-family: 'GmarketSansMedium'; */
    cursor: pointer;
    width: 100px;
    height: 35px;
    position: absolute;
    top: 13px;
    background: white;
    right: 8px;
    border: 0.5px solid rgba(128, 128, 128, 0.516);
    border-radius: 10px;
}


.join-btn {
    text-align: center;
}

.join-submit-btn {
    border: none;
    height: 40px;
    width: 650px;
    font-size: 15px;
    cursor: pointer;
    background-color: #a1dbff;
    /* font-family: 'GmarketSansMedium'; */
    letter-spacing: 2px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    font-size: 18px;
    font-weight: 600;
    color: #393939;
}
/* 푸터 */
.mast_foot{
  padding: 30px 0;
  border-top: 1px solid #d0d0d0;
}
.f_container{
  margin: 0 auto;
  max-width: 1100px;
  position: relative;
}
.f_container .item{
  display: inline-block;

}
.f_container .item a{
  font-size: 13.905px;
  color: #8a8a8a;
  font-weight: 600;
  text-decoration: none;
}
.mf_before{
  display: inline;
  margin: 0 5px;
  color: #b8b8b8;
}
em, p, address{
  font-style: normal;
  font-weight: 600;
}
.point_color{
  color: #ee1c25;
  font-weight: 600;
  border-bottom: 1px solid #ee1c25
}
.com-address{
  font-size: 13.905px;
  color: #8a8a8a;
  margin-right: 20px;
}
.mf_after{
  display: inline;
  margin: 0 5px;
  color: #b7b7b7;
}
.copyright{
  margin: 10px 0 10px;
  font-size: 13.905px;
  color: #000;
}
.friendly{
  position: absolute;
  right: 0;
  top: 0;
}
.mast_foot .site-linker{
  position: relative;
  display: inline-block;
  margin: 0 2px;
  width: 150px;
  font-size: 12.855px;
  background-color: #fff;
}
.site-linker button{
  width: 100%;
  height: 34px;
  color: #333;
  text-indent: -26px;
  border: 1px solid #b7b7b7;
  font-weight: 600;
  border-radius: 4px;
}
.b_before{
  position: absolute;
  top: 50%;
  right: 10px;
  margin: -2px 0 0;
  border: 1px solid transparent;
  border-top-color: #333;
  border-width: 4px 4px 0;
}
.site-linker ul{
  /* display: none; */
  position: absolute;
  left: 0;
  right: 0;
  bottom: 33px;
  padding: 10px 0;
  max-height: 200px;
  border: 1px solid #b7b7b7;
  background-color: #fff;
  overflow: hidden;
  overflow-y: auto;
}
.site-linker a{
  display: block;
  padding: 2px 10px;
  /* font-size: inherit; */
  color: #8a8a8a;
  text-decoration: none;
}
/*
모달
*/
.default_post_code_layout {
    max-height: 600px;
    overflow-y: auto;
  }

/* .default_post_code_control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > .v-btn {
    height: 44px;
    span {
      font-size: 1.6rem;
    }
  }
} */
</style>

