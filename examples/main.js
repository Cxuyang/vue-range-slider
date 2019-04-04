import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import VueRangeSilderc from '../packages'
Vue.use(VueRangeSilderc)

new Vue({
  render: h => h(App)
}).$mount('#app')
