// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/index',

  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layouts/admin/DashboardLayout.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/main2',
    name: 'mainHomepage2',
    component: () => import('@/views/test.vue'),
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('@/views/auth/join.vue'),
  },

  {
    path: '/contents',
    name: 'contents',
    component: () => import('@/views/componunts.vue'),
    redirect:'/login',
    children:[
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index.vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/login.vue'),
      },
      {
        path: '/freeBoard',
        name: 'freeBoard',
        component: () => import('@/views/contents/freeBoard.vue'),
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('@/views/contents/detail.vue'),
      },
      {
        path: '/write',
        name: 'write',
        component: () => import('@/views/contents/write.vue'),
      },
      {
        path: '/modify/:id',
        name: 'modify',
        component: () => import('@/views/contents/modify.vue'),
      },
    ]
  },

  {
    path: '/main3',
    name: 'mainHomepage2',
    component: () => import('@/views/test2.vue'),
    redirect:'/main3/test01',
    children:[
      {
        path: 'test01',
        name: 'test01131421',
        component: () => import('@/views/testContents/test1.vue'),
      },
      {
        path: 'test02',
        name: 'test02',
        component: () => import('@/views/testContents/test2.vue'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
