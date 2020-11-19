
import Vue from 'vue'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'

// mint-uistyles
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
const F2 = require('@antv/f2');

Vue.prototype.F2 = F2;

/**
 * 注意先后顺序，如果路由(router)先引入，在linux上自己修改的UI样式不起效果。
 */
// element-ui
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI)

import '@/styles/index.scss' // 全局样式


import App from './App'
import store from './store'
import router from './router'


import './icons'
import './permission'

import './filter/index' // permission control 权限访问控制全局拦截处理



import qs from "qs";
Vue.prototype.$qs = qs;





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
