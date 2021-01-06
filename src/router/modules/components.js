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
      name: 'dndList',
      meta: {
        title: 'dnd List',
        icon: 'dnd' ,
        noCache:true,
        roles:["admin"]
      }
    }
  ]
}

export default componentsRouter;
