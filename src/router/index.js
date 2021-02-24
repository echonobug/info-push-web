import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Layout from '@/layout'

export const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Home',
        component: Home,
        meta: {
          title: '仪表盘',
          icon: 'fa fa-tachometer'
        }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '用户角色管理',
      icon: 'fa fa-user-circle-o'
    },
    children: [
      {
        path: '/users/user',
        name: 'About1',
        component: () => import('@/views/About.vue'),
        meta: {
          title: '用户管理',
          icon: 'fa fa-user-o'
        }
      },
      {
        path: '/users/role',
        name: 'About2',
        component: () => import('@/views/About.vue'),
        meta: {
          title: '角色管理',
          icon: 'fa fa-user-circle'
        }
      }
    ]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/info/index',
        name: 'Home3',
        component: Home,
        meta: {
          title: '信息中心',
          icon: 'fa fa-globe'
        }
      }
    ]
  },
  {
    path: '/subscription',
    component: Layout,
    redirect: '/subscription/index',
    children: [
      {
        path: '/subscription/index',
        name: 'Home2',
        component: Home,
        meta: {
          title: '订阅管理',
          icon: 'fa fa-heart-o'
        }
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    redirect: '/task/index',
    children: [
      {
        path: '/task/index',
        name: 'Home1',
        component: Home,
        meta: {
          title: '系统任务管理',
          icon: 'fa fa-tasks'
        }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/user/layout'),
    hidden: true,
    redirect: '/user/login',
    children: [
      {
        path: '/user/login',
        name: 'Login',
        component: () => import('@/views/user/Login')
      },
      {
        path: '/user/register',
        name: 'Register',
        component: () => import('@/views/user/Register')
      }
    ]
  },
  {
    path: '/500',
    component: () => import('@/views/exception/500'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/exception/403'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/exception/404'),
    hidden: true
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
