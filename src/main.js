// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './filter/index' // permission control 权限访问控制全局拦截处理

import './styles/element-variables.scss'
import '@/styles/index.scss' // 全局样式
import enLang from 'element-ui/lib/locale/lang/en'

import './icons'
import './permission'



import qs from "qs";
Vue.prototype.$qs = qs;

// mint-uistyles
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

/**
 * 注意先后顺序，如果路由(router)先引入，在linux上自己修改的UI样式不起效果。
 */
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/index'

Vue.use(ElementUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
