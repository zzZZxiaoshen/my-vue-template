import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import settings from './modules/settings'
import errorLog from './modules/errorLog'
import getters from './getters'
import '@/styles/index.scss' // global css
import '@/styles/fontIcon/iconfont.css'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    user,
    settings,
    errorLog
  },
  getters
})

export default store
