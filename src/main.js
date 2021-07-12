import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'

import * as API  from "./api/index.js";

import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'

import  './assets/css/reset.css';
// 导入全局样式表
/* import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.prototype.axios = axios */

console.log(API);


Vue.prototype.$API = API
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
