/**
 * @Description 路由
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/3/30 11:07
 **/
import VueRouter from 'vue-router'
import Vue from 'vue'

import routes from "./routerConfig";

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
    base: process.env.NODE_ENV === 'development' ? '/' : '/iweb',
})
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      window.document.title = to.meta.title
    }
    next()
  })
export default router
