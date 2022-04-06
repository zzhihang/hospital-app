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
import toast from "@/components/toast";
import {Toast} from "vant";
Vue.prototype.$bridge = Bridge;

Vue.config.productionTip = false;

Vue.prototype.params = getParams(); //全局注入url params参数

Vue.prototype.$confirm = confirm;

Vue.prototype.$toast = toast;

//axios请求拦截
axios.interceptors.request.use((request) => {
  let REQUEST_DATA = request.data
  //对白名单提交contenttype不做stringfy处理 直接提交request payload到后端
  const whiteList = ['application/x-www-form-urlencoded; charset=UTF-8']
  if(whiteList.includes(request.headers['Content-Type'])){
    return request
  }
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
  Toast.fail('服务器出小差了,请稍后重试')
  return Promise.reject(error);
});

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8080/api'
}else{
  axios.defaults.baseURL = 'http://wx.shouzimu.xyz/api'
}


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
});

Vue.directive("bozhu", { //博主按钮权限管理 v-bozhu
  inserted (el, binding) {
    let permission = sessionStorage.getItem('isBozhu')
    if (permission !== 'true') {
      el.parentNode && el.parentNode.removeChild(el);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

