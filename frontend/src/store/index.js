/* eslint-disable no-empty-pattern */
import { createStore } from 'vuex'
import apollo from '@/apollo/config'
import axios from 'axios'
import {
  register,
  login,
  createFreeBoard,
  modifyFreeBoard,
  deleteFreeBoard,
  createReply,
  modifyReply,
  deleteReply,
  updateAdmin,
  deleteuser,
  posterRegistration,
  modifyPoster,
  deletePoster,
  updateTheater,
  createTheater,
  deleteTheater,
  createSchedule,
  deleteScheduls,
  createTicketing,
} from '@/apollo/mutation'
import {
  myData,
  freeBoardList,
  freeBoardDetail,
  replyList,
  duplicateUser,
  duplicateEmail,
  userList,
  userDetail,
  waitingAdminList,
  posterList,
  posterDetail,
  theaterList,
  theaterDetail,
  selectMovie,
  searchScheule,
  scheduleCount,
  mainPosterList,
  ticketingSchedules,
  posterNowShowtime,
  getTicketing
} from '@/apollo/query'
import { moduleA } from '@/store/moduleA'
import { moduleB } from '@/store/moduleB'

const TOKENNAME = 'user_token'

export default createStore({
  state: {
    meData: {},
    drawer:false,
    rail:false,
  },
  getters: {},
  mutations: {
    meData(state, newData) {
    state.meData = newData
    },
    // 레일 상태를 토글하는 뮤테이션
    TOGGLE_RAIL(state) {
      state.rail = !state.rail;
    },
  },
  actions: {
    /**메인 서비스 관련
    @param {type} paramname
    @version 16.20.02
    @author 노의진
    @returns returns
    */
    register({ commit }, input) { // commit = context 객체
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient']
          .mutate({ mutation: register, variables: input })
          .then(({ data }) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    login({ commit }, input) {
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient'].mutate({ mutation: login, variables: input })
          .then(({ data }) => {

            if (!data.login.user) {
              localStorage.removeItem(TOKENNAME)
              commit('meData', {})
              console.log("하이1")

            } else {
              localStorage.setItem(TOKENNAME, data.login.jwt)
              commit('meData', data.login.user)
              console.log("하이2")
            }
            resolve(data.login.user)
            console.log("하이3")
          })
          .catch((err) => {
            console.log({err})
            reject(err)
          })
      })
    },

    logout({ commit }){
      localStorage.removeItem(TOKENNAME)
      commit('meData',{})
    },

    //

/**myData

 Bearer는 HTTP 인증에 사용되는 액세스 토큰 유형

Authorization: 'Bearer ' + localStorage.getItem(TOKENNAME),
: TOKENNAME 키를 사용, 저장된 토큰 검색, Bearer 와 토큰 값을
사용하여 인증 헤더를 구성 => 사용자의 신원 인증을 위해 HTTP 요청에 포함
따라서 토큰 자체는 인증 중에 이전에 저장되었던 클라이언트의 로컬 저장소에서 검색

    */
    myData({ commit }) {
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient']
          .query({
            query: myData,
            context: {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem(TOKENNAME),
              },
            },
          })
          .then(({ data }) => {
            if (data.me.delete) {
              localStorage.removeItem(TOKENNAME)
              commit('meData', {})
            } else {
              commit('meData', data.me)
            }
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    createFreeBoard({ commit }, input) {
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient']
          .mutate({ mutation: createFreeBoard, variables: input })
          .then(({ data }) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    freeBoardList({},input){
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient']
        .query({
          query: freeBoardList,
          variables: input
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },

    freeBoardDetail({}, input){
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient']
        .query({
          query : freeBoardDetail,
          variables : input,
        })
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },

    modifyFreeBoard({}, input){
      return new Promise((resolve,reject) => {
        apollo.clients['defaultClient']
        .mutate({
          mutation:modifyFreeBoard,
          variables: input
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },

    deleteFreeBoard({}, input){
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient']
        .mutate({
          mutation:deleteFreeBoard,
          variables:input,
        })
        .then(({data}) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },

    createReply({} , input ){
      return new Promise((reslove, reject) => {
        apollo.clients['defaultClient']
        .mutate({
          mutation:createReply,
          variables:input,
        })
        .then(({data})=>{
          reslove(data)
        })
        .catch((err) => {
          reject(err)
        })
      })
    },

    replyList({}, input ){
      return new Promise((reslove, reject) => {
        apollo.clients['defaultClient']
        .query({
          query:replyList,
          variables:input
        })
        .then(({data})=>{
          reslove(data)
        })
        .catch((err)=>{
          reject(err)
        })
      })
    },

    modifyReply({}, input){
      return new Promise((resolve, reject)=>{
        apollo.clients['defaultClient']
        .mutate({
          mutation:modifyReply,
          variables:input,
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch((err)=>{
          reject(err)
        })
      })
    },

    deleteReply({}, input){
      return new Promise((resolve, reject)=>{
        apollo.clients['defaultClient']
        .mutate({
          mutation:deleteReply,
          variables:input,
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch((err)=>{
          reject(err)
        })
      })
    },

    duplicateUser({}, input ){
      return new Promise((reslove, reject) => {
        apollo.clients['defaultClient']
        .query({
          query:duplicateUser,
          variables:input,
        })
        .then(({data})=>{
          reslove(data)
        })
        .catch((err)=>{
          reject(err)
        })
      })
    },

    duplicateEmail({}, input){
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient']
        .query({
          query:duplicateEmail,
          variables:input,
        })
        .then(({data})=>{
          resolve(data)
        })
        .catch((err)=>{
          reject(err)
        })
      })
    },

  /** 관리자 관련
  @param {type} paramname
  @version 16.20.02
  @author 노의진
  @returns returns
  */

  updateAdmin ({}, input){
    return new Promise((resolve, reject) =>{
      apollo.clients['defaultClient']
      .mutate({
        mutation:updateAdmin,
        variables:input,
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  userList({ commit} , input ) {
    return new Promise((resolve, reject) =>{
      apollo.clients['defaultClient']
      .query({
        query:userList,
        variables:input,
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  deleteuser({commit}, input){
    return new Promise((resolve,reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:deleteuser,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  userDetail({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:userDetail,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  waitingAdminList({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:waitingAdminList,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  posterList({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:posterList,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  posterRegistration({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:posterRegistration,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  posterDetail({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:posterDetail,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  modifyPoster({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:modifyPoster,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  deletePoster({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:deletePoster,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  upload({}, input) {
    return new Promise((resolve, reject) => {
      var formData = new FormData()
      formData.append('files', input.files)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: 'Bearer ' + localStorage.getItem(TOKENNAME),
        },
      }
      axios
        .post(import.meta.env.VUE_APP_BACKEND_URL + '/upload', formData, config)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  theaterList({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:theaterList,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  theaterDetail({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:theaterDetail,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  updateTheater({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:updateTheater,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  createTheater({commit}, input){
    return new Promise((resolve,reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:createTheater,
        variables:input,
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },

  deleteTheater({commit}, input){
    return new Promise((resolve,reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:deleteTheater,
        variables:input,
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },

  selectMovie({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:selectMovie,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  createSchedule({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:createSchedule,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  searchScheule({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:searchScheule,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  deleteScheduls({commit} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:deleteScheduls,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  scheduleCount({} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:scheduleCount,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  mainPosterList({} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:mainPosterList,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  ticketingSchedules({} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:ticketingSchedules,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  posterNowShowtime({} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:posterNowShowtime,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  createTicketing({}, input){
    return new Promise((resolve,reject) => {
      apollo.clients['defaultClient']
      .mutate({
        mutation:createTicketing,
        variables: input
      })
      .then(({data}) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
    })
  },

  getTicketing({} , input ){
    return new Promise((resolve, reject) => {
      apollo.clients['defaultClient']
      .query({
        query:getTicketing,
        variables:input
      })
      .then(({data})=>{
        resolve(data)
      })
      .catch((err)=>{
        reject(err)
      })
    })
  },

  },

  modules: { moduleA, moduleB }
})

/**해석 및 설명
@param {type} paramname
@version 16.20.02
@author 노의진
@returns returns
*/

/*
commit 을 받는 이유 : mutation 의 상태를 변경 하기 위함.
두번째 인자 input은 : 로그인 시 필요한 입력 데이터 의미.

Promise 를 생성, 비동기 작업 수행 및 처리 결과 알림 return 값.

Apollo Client 를 사용 하여 GraphQL 의 login mutation 호출,
apollo 객체에서 'defaultClient'를 통해 클라이언트 호출 후,
mutate 메서드를 사용하여 mutation 실행.
- 이때, 입력테이터는 variables로 전달! -

mutation 실행이 성공하면, 해당 Promise가 이행되고, 반환된 데이터를 받아온다.
이 데이터는 사용자 정보 포함

commit('meData', {})
반환된 데이터를 기반으로 사용자 정보를 업데이트

resolve(data.login.user)
로그인한 사용자 정보를 반환
*/
