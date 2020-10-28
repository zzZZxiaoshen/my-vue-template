import waves from './waves'

const install = function(Vue) {
  Vue.directive('waves', waves)
}

if (window.Vue) {
  window.waves = waves
  console.log("11111")
  Vue.use(install); // eslint-disable-line
}

waves.install = install
export default waves
