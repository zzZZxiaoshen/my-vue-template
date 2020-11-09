import Vue from 'vue'
import Router from 'vue-router'
import Layout from  '@/layout'

Vue.use(Router)


export const constantRoutes =[
  {
  //注意这是路由跳转的路径 而非后路径后面携带的param参数 误区注意区分
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component:Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',

        meta: { title: 'Dashboard', icon: 'dashboard' , affix: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/active',
    component: Layout,
    redirect:"/active/list",
    name: 'Active',
    meta: {
      title: '活动管理',
      icon: 'documentation' ,
      affix: true,
      roles:["admin"]
      },
    children:[
      {
        path: 'list',
        component: () => import('@/views/active/list'),
        name: 'ActiveList',
        meta: {
          title: '活动列表',
          icon: 'list' ,
          noCache:true,
          roles:["admin"]
        }
      },
      {
        path: 'create',
        component: () => import('@/views/active/create'),
        name: 'CreateActive',
        meta: {
          title: '添加活动',
          icon: 'edit' ,
          noCache:true,
          roles:["admin"]
        }
      },
      {
        path: 'edit/:id(\\w+)',
        component: () => import('@/views/active/edit'),
        name: 'EditBook',
        meta: { title: '编辑用户', noCache: true, activeMenu: '/active/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/sys',
    component: Layout,
    redirect:"/sys/list",
    name: 'Sys',
    meta: {
      title: '用户管理',
      icon: 'documentation' ,
      affix: true,
      roles:["admin"]
    },
    children:[
      {
        path: 'list',
        component: () => import('@/views/sys/list'),
        name: 'SysList',
        meta: {
          title: '用户列表',
          icon: 'list' ,
          noCache:true,
          roles:["admin"]
        }
      },
      {
        path: 'create',
        component: () => import('@/views/sys/create'),
        name: 'CreateActive',
        meta: {
          title: '添加用户',
          icon: 'edit' ,
          noCache:true,
          roles:["admin"]
        }
      },
      {
        path: 'edit/:id(\\w+)',
        component: () => import('@/views/sys/edit'),
        name: 'EditBook',
        meta: { title: '编辑用户', noCache: true, activeMenu: '/sys/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect:"/test/list",
    name: 'Test',
    meta: {
      title: '测试',
      icon: 'documentation' ,
      affix: true,
      roles:["admin"]
    },
    children:[
      {
        path: 'list',
        component: () => import('@/views/test/list'),
        name: 'SysList',
        meta: {
          title: '测试',
          icon: 'list' ,
          noCache:true,
          roles:["admin"]
        }
      }
    ]
  }
];


export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
