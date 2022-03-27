import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import "amfe-flexible";
import axios from 'axios'
import qs from 'qs';
import './static/css/reset.css'
import './static/css/cover.less'
import './static/css/common.less'
import './static/css/icon.less'
import Bridge from "@static/js/bridge.js"
import {getParams} from "@static/js/util";
import confirm from 'components/confirm'
import store from './store';
Vue.prototype.$bridge = Bridge;

Vue.config.productionTip = false;

Vue.prototype.params = getParams(); //全局注入url params参数

Vue.prototype.$confirm = confirm;

//axios请求拦截
axios.interceptors.request.use((request) => {
  let REQUEST_DATA = request.data
  //对白名单提交contenttype不做stringfy处理 直接提交request payload到后端
  // const whiteList = ['application/x-www-form-urlencoded; charset=UTF-8']
  // if(whiteList.includes(request.headers['Content-Type'])){
  //   return request
  // }
  //提交格式为formdata
  request.data = qs.stringify(REQUEST_DATA);
  return request;

}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});



router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (window._hmt) {
    if (to.path) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

