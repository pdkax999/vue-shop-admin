import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'

import dayjs from "dayjs";

import * as API from "./api/index.js";

import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'

import './assets/css/reset.css';
// 导入全局样式表
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$API = API
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
  beforeCreate() {

    Vue.prototype.$bus = this

  },
  router,
  render: h => h(App)
}).$mount('#app')
