import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import "amfe-flexible";
import axios from 'axios'
import qs from 'qs';
import './static/css/reset.css'
import './static/css/common.less'
import './static/css/icon.less'
import {getParams} from "@static/js/util";
import confirm from 'components/confirm'
import loading from 'components/loading/loading.js'
import store from './store';
import toast from "@/components/toast";
import {Toast} from "vant";
import './static/js/lazy'
import './static/iconfont/iconfont.css'
// import Vconsole from 'vconsole'
Vue.use(loading)

Vue.config.productionTip = false;

Vue.prototype.params = getParams(); //全局注入url params参数

Vue.prototype.$confirm = confirm;

Vue.prototype.$toast = toast;

// new Vconsole();

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
  const result = response.data;
  if(result.status === -101){
    window.location.href = result.data.redirect;
    return;
  }
  if(result.status === -102){
    toast.fail('请重新登录');
    router.push('/login');
    return;
  }
  return result;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  Toast.fail('服务器出小差了,请稍后重试')
  return Promise.reject(error);
});

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8083/api'
}else{
  axios.defaults.baseURL = 'https://knowledge.shouzimu.xyz/api'
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


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

