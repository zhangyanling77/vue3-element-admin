import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// 异步获取路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import(/* webpackChunkName: "documentation" */ '../views/documentation/index.vue'),
        meta: {
          title: 'Documentation',
          icon: 'el-icon-document-copy'
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import(/* webpackChunkName: "guide" */ '../views/guide/index.vue'),
        meta: {
          title: 'Guide',
          icon: 'el-icon-guide',
          activeMenu: '/documentation/index'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      icon: 'el-icon-setting',
      alwaysShow: true
    },
    children: [
      {
        path: 'menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/system/menu.vue'),
        meta: {
          title: 'Menu Management',
          icon: 'el-icon-menu',
          hidden: true
        }
      },
      {
        path: 'role',
        component: () => import(/* webpackChunkName: "role" */ '@/views/system/role.vue'),
        meta: {
          title: 'Role Management',
          icon: 'el-icon-s-management',
          hidden: true
        }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/system/user.vue'),
        meta: {
          title: 'User Management',
          icon: 'el-icon-user'
        }
      }
    ]
  },
  { // 外链路由
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com',
        redirect: '/',
        meta: {
          title: 'External Link',
          icon: 'el-icon-link'
        }
      }
    ]
  }
]

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'el-icon-s-home'
        }
      }
    ]
  }
]

export const routes = constantRoutes.concat(asyncRoutes)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
