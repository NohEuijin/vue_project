// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/index',
  },

  {
    path: '/',
    name: 'admin',
    component: () => import('@/layouts/admin/DashboardLayout.vue'),
    redirect:'admin/dashboard',
    children:[
      {
        path: 'admin/dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/dashboard/DefaultDashboard.vue'),
      },
      {
        path: 'admin/theater',
        name: 'theater',
        component: () => import('@/views/admin/menagement/theater/TheaterFrame.vue'),
      },
      {
        path: 'admin/theater/register',
        name: 'ttRegister',
        component: () => import('@/views/admin/menagement/theater/TheaterRegistration.vue'),
      },
      {
        path: 'admin/theater/detail/:id',
        name: 'ttDetail',
        component: () => import('@/views/admin/menagement/theater/TheaterDetail.vue'),
      },
      {
        path: 'admin/theater/modify/:id',
        name: 'ttModify',
        component: () => import('@/views/admin/menagement/theater/TheaterModify.vue'),
      },
      {
        path: 'admin/ticketing',
        name: 'ticketing',
        component: () => import('@/views/admin/menagement/ticketing/TicketingFrame.vue'),
      },
      {
        path: 'admin/mainposter',
        name: 'mainposter',
        component: () => import('@/views/admin/menagement/mainposter/MainFrame.vue'),
      },
      {
        path: 'admin/mainposter/register',
        name: 'mpRegister',
        component: () => import('@/views/admin/menagement/mainposter/PostRegistration.vue'),
      },
      {
        path: 'admin/mainposter/detail/:id',
        name: 'mpdetail',
        component: () => import('@/views/admin/menagement/mainposter/PostDetail.vue'),
      },
      {
        path: 'admin/mainposter/modify/:id',
        name: 'mpmodify',
        component: () => import('@/views/admin/menagement/mainposter/PostModify.vue'),
      },
      {
        path: 'admin/membership',
        name: 'membership',
        component: () => import('@/views/admin/menagement/membership/MemberFrame.vue'),
      },
      {
        path: 'admin/membership/detail/:id',
        name: 'msdetail',
        component: () => import('@/views/admin/menagement/membership/MemberDetail.vue'),
      },
      {
        path: 'admin/waitinglist',
        name: 'waitinglist',
        component: () => import('@/views/admin/menagement/waitinglist/WaitingListFrame.vue'),
      },
      {
        path: 'admin/sales',
        name: 'sales',
        component: () => import('@/views/admin/menagement/sales/SalesFrame.vue'),
      },
    ]
  },
  {
    path: '/admin/login',
    name: 'adminlogin',
    component: () => import('@/views/admin/authentication/auth/LoginPage.vue'),
  },
  {
    path: '/admin/register',
    name: 'adminregister',
    component: () => import('@/views/admin/authentication/auth/RegisterPage.vue'),
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
      {
        path: '/mainticketing',
        name: 'mainticketing',
        component: () => import('@/views/ticketing/mainTicketing.vue'),
      },
      {
        path: '/personSeat/:id',
        name: 'personSeat',
        component: () => import('@/views/ticketing/personSeat.vue'),
      },
      {
        path: '/order/:id',
        name: 'order',
        component: () => import('@/views/ticketing/order.vue'),
      },
      {
        path: '/payment/:id',
        name: 'payment',
        component: () => import('@/views/ticketing/payment.vue'),
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
        name: 'test01',
        component: () => import('@/views/testContents/test1.vue'),
      },
      {
        path: 'test02',
        name: 'test02',
        component: () => import('@/views/testContents/test2.vue'),
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
