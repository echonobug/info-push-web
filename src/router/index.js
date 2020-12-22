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
          title: '首页',
          icon: 'fa fa-home'
        }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '/about/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: {
          title: '关于',
          icon: 'fa fa-info'
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
