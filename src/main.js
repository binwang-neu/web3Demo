import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import icons
import './assets/icon/iconfont.css'
import './assets/icon/iconfont'

import store from './store'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({

  render: h => h(App),
  store
}).$mount('#app')
