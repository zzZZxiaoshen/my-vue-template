import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: 'noRedirect',
  name: 'table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children:[
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'dynamic-table',
      meta: { title: 'Dynamic Table' }
    },
  ]
}

export default tableRouter;
