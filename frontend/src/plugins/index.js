/**
 * plugins/index.js
 *
 * `./src/main.js`에서 자동으로 포함됩니다.
 *
 * 함수나 변수나 프로퍼티 등.
 */

// 플러그인
import { loadFonts } from './webfontloader'
import { createHead } from '@vueuse/head'
import vuetify from './vuetify'
import i18n from './i18n'
import router from '../router'
import validation from '@/function/vlidation'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// 타임존 설정
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Seoul')
const head = createHead()

// 플러그인 등록
export function registerPlugins(app) {
  loadFonts()
  app.use(head).use(i18n).use(vuetify).use(router)
  app.config.globalProperties.$i18n = i18n
  app.config.globalProperties.$vuetify = vuetify
  app.config.globalProperties.$valid = validation
  app.config.globalProperties.$dayjs = dayjs
}
