/* eslint-disable no-empty-pattern */
import { createStore } from 'vuex'
import apollo from '@/apollo/config'
import { createUser, login,
  createFreeBoard, modifyFreeBoard,
  deleteFreeBoard, createReply,
  modifyReply, deleteReply } from '@/apollo/mutation'
import { myData, freeBoardList, freeBoardDetail, replyList, duplicateUser, duplicateEmail } from '@/apollo/query'
import { moduleA } from '@/store/moduleA'
import { moduleB } from '@/store/moduleB'
import Premier from '@/layouts/index/main/Premier.vue'

const TOKENNAME = 'user_token'

export default createStore({
  state: {
    meData: {},
  },
  getters: {},
  mutations: {
    meData(state, newData) {
    state.meData = newData
    },
  },
  actions: {
    createUser({ commit }, input) { // commit = context 객체
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient']
          .mutate({ mutation: createUser, variables: input })
          .then(({ data }) => {
            resolve(data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
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
    login({ commit }, input) {
      return new Promise((resolve, reject) => {
        apollo.clients['defaultClient'].mutate({ mutation: login, variables: input })
          .then(({ data }) => {
            if (!data.login.user) {
              localStorage.removeItem(TOKENNAME)
              commit('meData', {})
            } else {
              localStorage.setItem(TOKENNAME, data.login.jwt)
              commit('meData', data.login.user)
            }
            resolve(data.login.user)
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
            if (!data.me) {
              localStorage.removeItem(TOKENNAME)
              commit('meData', {})
            } else {
              commit('meData', data.me)
            }
            resolve(data)
          })
          .catch((err) => {
            console.log("너냐?")
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


  },

  modules: { moduleA, moduleB }
})


