/**
 * plugins/index.js
 *
 * `./src/main.js`에서 자동으로 포함됩니다.
 *
 * 함수나 변수나 프로퍼티 등.
 */

// 플러그인
import { loadFonts } from './webfontloader'
// 웹 폰트 로딩 관련 플러그인을 가져옵니다.
import { createHead } from '@vueuse/head'
// VueUse의 헤드 관리 플러그인을 가져옵니다.
import vuetify from './vuetify'
// Vuetify UI 프레임워크를 가져옵니다.
import i18n from './i18n'
// 다국어 지원을 위한 i18n 플러그인을 가져옵니다.
import router from '../router'
// Vue Router를 가져옵니다.
import validation from '@/function/vlidation'
// 전역 함수를 담은 플러그인을 가져옵니다.
import dayjs from 'dayjs'
// 날짜 및 시간 처리를 위한 라이브러리를 가져옵니다.
import utc from 'dayjs/plugin/utc'
// dayjs의 UTC 플러그인을 가져옵니다.
import timezone from 'dayjs/plugin/timezone'
// dayjs의 타임존 플러그인을 가져옵니다.
// import apolloProvider from '@/apollo/config'
// Apollo GraphQL 관련 설정을 가져옵니다.

// 타임존 설정
dayjs.extend(utc)
// dayjs에 UTC 플러그인을 확장합니다.
dayjs.extend(timezone)
// dayjs에 타임존 플러그인을 확장합니다.
dayjs.tz.setDefault('Asia/Seoul')
// 기본 타임존을 서울로 설정합니다.
const head = createHead()
// 헤드 관리 플러그인을 생성합니다.

// 플러그인 등록 함수
export function registerPlugins(app) {
  loadFonts() // 폰트를 로딩하는 함수를 호출합니다.
  app.use(head).use(i18n).use(vuetify).use(router)
  // 앱에 헤드, 다국어, Vuetify, 라우터를 등록합니다.
  app.config.globalProperties.$i18n = i18n
  // 전역으로 i18n을 사용할 수 있도록 앱의 설정에 추가합니다.
  app.config.globalProperties.$vuetify = vuetify
  // 전역으로 Vuetify를 사용할 수 있도록 앱의 설정에 추가합니다.
  app.config.globalProperties.$valid = validation
  // 전역으로 전역 함수를 사용할 수 있도록 앱의 설정에 추가합니다.
  app.config.globalProperties.$dayjs = dayjs
  // 전역으로 dayjs를 사용할 수 있도록 앱의 설정에 추가합니다.
  // .use(apolloProvider)
  // Apollo GraphQL 관련 설정을 앱에 등록합니다.
}
