import store from '@/store'
import router from '@/router'

function checkUserName(user_name){
  const user_name_check = /^[A-Za-z0-9]{6,13}$/
}



/**
checkPhoneKr(phone_number)
: 대한민국 전화번호 형식을 확인
: 하이픈('-')이 포함되거나 포함되지 않은 경우를 모두 고려
*/
function checkPhoneKr(phone_number) {
  const phone_regex_kr_13 = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
  const phone_regex_kr_11 = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/
  if (phone_number.length <= 11) {
    return phone_regex_kr_11.test(phone_number)
  } else if (phone_number.length <= 13) {
    return phone_regex_kr_13.test(phone_number)
  } else {
    return false
  }
}
/**
checkNumber(contents)
: 숫자인지 여부를 확인
*/
function checkNumber(contents) {
  const number_check = /^[0-9][0-9]*[0-9]$/
  return number_check.test(contents)
}
/**
checkKorean(contents)
: 한글이 포함되어 있는지 확인
*/
function checkKorean(contents) {
  const korean_check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  return korean_check.test(contents)
}
/**
checkPhoneGl(phone_number)
: 전화번호의 전역적인 형식을 확인
: 하이픈이 포함된 경우를 고려합니다.
*/
function checkPhoneGl(phone_number) {
  const phone_regex_gl = /^[0-9][0-9\-]*[0-9]$/
  return phone_regex_gl.test(phone_number)
}

/**
checkGlobalCode(global_code)
: 국제 전화번호 코드를 확인
: 코드는 +로 시작해야 합니다.
*/
function checkGlobalCode(global_code) {
  const global_regex = /^\+[0-9]*$/
  return global_regex.test(global_code)
}
/**
checkName(name, type)
: 이름의 유효성을 확인
: 한국어 이름 또는 영어 이름에 대해 다르게 처리
*/
function checkName(name, type) {
  if (type === 'korea') {
    const korean = /^[가-힣\s]*$/
    return korean.test(name)
  } else if (type === 'overseas') {
    const english = /^[a-zA-Z\s]*$/
    return english.test(name)
  } else {
    return false
  }
}
/**
 checkAffiliation(affil_name, type)
 : 소속의 유효성을 확인
 : 한국 또는 해외 소속에 따라 다르게 처리
*/
function checkAffiliation(affil_name, type) {
  if (type === 'korea') {
    const korean = /^[가-힣()0-9\s]*$/
    return korean.test(affil_name)
  } else if (type === 'overseas') {
    const english = /^[a-zA-Z()0-9\s]*$/
    return english.test(affil_name)
  }
}
/**
checkPassword(pre_password)
: 비밀번호의 유효성을 확인
: 특수 문자를 사용하지 않는 비밀번호인지 확인
*/
function checkPassword(pre_password) {
  const password_regex_special = /[<>`~!@#$%^&*|\\\'\";:\/?]/gi
  return password_regex_special.test(pre_password)
}
/**
checkEmail(email_address)
: 이메일 주소의 유효성을 확인
: 이메일 주소가 '@'와 '.com'을 포함해야 합니다.
*/
function checkEmail(email_address) {
  const email_regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  )
  return email_regex.test(email_address)
}
/**
checkBlank(contents)
: 내용 공백 확인.
: 빈공간이 있으면 체크 할때 ! 빼기 .
*/
function checkBlank(contents) {
  if (!contents) {
    return false
  }
  const blank_check = contents.trim().replace(/\s/g, '')
  return blank_check === '' ? false : true
}

function checkUrlDomain(contents) {
  const domain_check =
    /(http(s)?:\/\/|www.)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}([\/a-z0-9-%#?&=\w])+(\.[a-z0-9]{2,4}(\?[\/a-z0-9-%#?&=\w]+)*)*/gi
  return domain_check.test(contents)
}
/**
checkRouteRefresh(type)
: 페이지 새로고침시 경로 확인
: 스토어에 저장된 메뉴 정보를 기준으로 현재 경로를 확인하고 설정
type
: 페이지 유형으로 "auth", "certificated", "main", "admin" 값
*/
function checkRouteRefresh(type) {
  if (type === 'auth') {
    store.state.main_nav = store.state.auth_menu
    for (let index = 0; index < store.state.auth_menu.sub_menu.length; index++) {
      if (store.state.auth_menu.sub_menu[index].route_name === router.currentRoute.value.name) {
        store.state.sub_nav = store.state.auth_menu.sub_menu[index]
        store.state.frame_nav = index
        return
      }
    }
    return
  }

  if (type === 'certificated') {
    store.state.main_nav = store.state.certificated_menu
    for (let index = 0; index < store.state.certificated_menu.sub_menu.length; index++) {
      if (
        store.state.certificated_menu.sub_menu[index].route_name === router.currentRoute.value.name
      ) {
        store.state.sub_nav = store.state.certificated_menu.sub_menu[index]
        store.state.frame_nav = index
        return
      }
    }
    return
  }

  if (type === 'main') {
    for (let index = 0; index < store.state.nav_menu.length; index++) {
      if (store.state.nav_menu[index].route_name === router.currentRoute.value.matched[1].name) {
        const idx = store.state.nav_menu[index].sub_menu.findIndex(
          (el) => el.route_name === router.currentRoute.value.name,
        )
        store.state.main_nav = store.state.nav_menu[index]
        store.state.sub_nav = idx > -1 ? store.state.nav_menu[index].sub_menu[idx] : ''
        store.state.frame_nav = idx > -1 ? idx : ''
        return
      }
    }
    return
  }
  if (type === 'admin') {
    for (let index = 0; index < store.state.adminStore.left_nav_menu.length; index++) {
      if (
        store.state.adminStore.left_nav_menu[index].route_name ===
        router.currentRoute.value.matched[2].name
      ) {
        const idx = store.state.adminStore.left_nav_menu[index].sub_menu.findIndex(
          (el) => el.route_name === router.currentRoute.value.name,
        )
        store.state.adminStore.main_nav = store.state.adminStore.left_nav_menu[index]
        store.state.adminStore.selectedSubMenus =
          store.state.adminStore.left_nav_menu[index].sub_menu[idx]
        return
      }
    }
    return
  }
}

const globalValidation = {
  checkPhoneKr,
  checkPhoneGl,
  checkGlobalCode,
  checkEmail,
  checkBlank,
  checkRouteRefresh,
  checkPassword,
  checkName,
  checkAffiliation,
  checkKorean,
  checkNumber,
  checkUrlDomain,
}

export default globalValidation
