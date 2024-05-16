/**
 * main.js
 * Vuetify and other plugins then mounts the App`
 *
 * 전역에 사용하려면 설치후 이곳에 import 해서 사용하여야 한다.
 */

/** Vue */
import App from './App.vue'
import { createApp } from 'vue';
import store from '@/store'
/** Router */
import router from './router'
/** Scss */
import '@/assets/css/global.scss'
import '@/assets/css/style.scss'

// import index from './views/index.vue'

import PerfectScrollbar from 'vue3-perfect-scrollbar';
import { registerPlugins } from '@/plugins'
import { VueDaumPostcode } from 'vue-daum-postcode'
/** VueApexCharts */
import VueApexCharts from "vue3-apexcharts";
/** Vuetify */
import vuetify from './plugins/vuetify'
/** Vcalendar : 달력 라이브러리 */

import dayjs from 'dayjs'

/**
TOKENNAME : 사용자의 인증 상태를 추적하는 데 사용

router.beforeEach((to, from, next)
: Vue 라우터의 전역 네비게이션 가드를 설정,
이 가드는 페이지 이동이 발생하기 전에 실행되는 콜백 함수를 등록한다.

 */

const TOKENNAME = 'user_token'

router.beforeEach( async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem(TOKENNAME) === null) {
      window.alert('로그인이 필요합니다!')
      next('/auth/login')
    } else {
      await store
        .dispatch('myData')
        .then(() => {
          next()
        })
        .catch(() => {
          window.alert(
            '로그인이 만료되었습니다. \n 다시 로그인하십시오.')
          localStorage.removeItem(TOKENNAME)
          store.state.meData = {}
          next('/auth/login')
        })
    }
  } else {
    if (localStorage.getItem(TOKENNAME) !== null) {
      await store
        .dispatch('myData')
        .then(() => {
          next()
        })
        .catch(() => {
          localStorage.removeItem(TOKENNAME)
          store.state.meData = {}
          next()
        })
    } else {
      next()
    }
  }
})

/** Vue Appicaiotn Setting */
// 모듈과 라이브 러리 등록!
const app = createApp(App)
app.component('VueDaumPostcode', VueDaumPostcode)
app.use(store)
app.use(PerfectScrollbar)
app.use(VueApexCharts)
app.use(vuetify)
registerPlugins(app)
app.config.globalProperties.$dayjs = dayjs
//연결
app.mount('#app')
