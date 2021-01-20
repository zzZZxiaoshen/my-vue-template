import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Components',
    icon: 'component'
  },
  children:[
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: {
        title: 'Component Mixin',
        icon: 'mixin' ,
        noCache:true,
        roles:["admin"]
      }
    },
    {
      path: 'split',
      component: () => import('@/views/components-demo/split-pane'),
      name: 'SplitPaneDemo',
      meta: {
        title: 'Split Pane',
        icon: 'Split' ,
        noCache:true,
        roles:["admin"]
      }
    },
    {
      path: 'dnd',
      component: () => import('@/views/components-demo/dnd-list'),
      name: 'DndList',
      meta: {
        title: 'Dnd List',
        icon: 'dnd' ,
        noCache:true,
        roles:["admin"]
      }
    },
    {
      path: 'count',
      component: () => import('@/views/components-demo/count-to'),
      name: 'CountTo',
      meta: {
        title: 'Count to',
        icon: 'count' ,
        noCache:true,
        roles:["admin"]
      }
    },
    {
      path: 'top',
      component: () => import('@/views/components-demo/back-to-top'),
      name: 'backTop',
      meta: {
        title: 'Back Top',
        icon: 'top' ,
        noCache:true,
        roles:["admin"]
      }
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky'),
      name: 'sticky',
      meta: {
        title: 'Sticky',
        icon: 'sticky' ,
        noCache:true,
        roles:["admin"]
      }
    }
  ]
}

export default componentsRouter;
