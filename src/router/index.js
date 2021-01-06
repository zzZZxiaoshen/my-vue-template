import Vue from 'vue'
import Router from 'vue-router'
import Layout from  '@/layout'
import componentsRouter from './modules/components'

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
      title: 'Active',
      icon: 'documentation' ,
      affix: true,
      roles:["admin","测试"]
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
          roles:["admin","测试"]
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
    redirect:"/sys/user/list",
    name: 'Sys',
    meta: {
      title: 'Account',
      icon: 'documentation' ,
      affix: true,
      roles:["admin"]
    },
    children:[
      {
        path: 'user/list',
        component: () => import('@/views/sys/user/list'),
        name: 'SysUserList',
        meta: {
          title: '用户列表',
          icon: 'list' ,
          noCache:true,
          roles:["admin"]
        }
      },
      {
        path: 'user/create',
        component: () => import('@/views/sys/user/create'),
        name: 'CreateUser',
        meta: {
          title: '新建用户',
          icon: 'edit' ,
          noCache:true,
          roles:["admin"]
        },
        hidden: true
      },
      {
        path: 'user/edit/:email',
        component: () => import('@/views/sys/user/edit'),
        name: 'EditUser',
        meta: { title: '编辑用户', noCache: true, activeMenu: '/sys/user/list', },
        hidden: true
      },
      {
        path: 'role/role',
        component: () => import('@/views/sys/role/role'),
        name: 'SysRoleList',
        meta: {
          title: '角色与权限',
          icon: 'list' ,
          noCache:true,
          roles:["admin"]
        }
      },
    ]
  },
  {
    path: '/icons',
    component: Layout,
    redirect:"/icons/index",
    children:[
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: {
          title: 'Icons',
          icon: 'icon' ,
          noCache:true,
          roles:["admin"]
        }
      },
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect:"/theme/index",
    children:[
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'theme',
        meta: {
          title: 'Theme',
          icon: 'theme' ,
          noCache:true,
          roles:["admin"]
        }
      },
    ]
  },
  {
    path: '/excel',
    component: Layout,
    redirect:"/excel/export-excel",
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children:[
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: {
          title: 'Export Excel',
          icon: 'ExportExcel' ,
          noCache:true,
          roles:["admin"]
        },
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: {
          title: 'Upload Excel',
          icon: 'ExportExcel' ,
          noCache:true,
          roles:["admin"]
        },
      },
    ]
  },
  componentsRouter,
  {
    path: '/test',
    component: Layout,
    redirect:"/test/test",
    name: 'Test',
    hidden: false,
    meta: {
      title: 'test',
      icon: 'documentation' ,
      affix: true,
      roles:["admin"]
    },
    children:[
      {
        path: 'test',
        component: () => import('@/views/test/test'),
        name: 'test',
        hidden: false,
        meta: {
          title: 'test',
          icon: 'test' ,
          noCache:true,
          roles:["admin"]
        }
      }
    ]
  },

];


export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
