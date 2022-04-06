/**
 * @Description 路由
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/3/30 11:07
 **/
import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '../store/index';
import routes from "./routerConfig";
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
});
const showList = ['/topic', '/my', '/message'];
router.beforeEach((to, from, next) => {
    if(showList.includes(to.fullPath)){
        store.state.commonStore.ifShowTabBar = true;
    }else{
        store.state.commonStore.ifShowTabBar = false;
    }
    if (to.meta.title) {
        window.document.title = to.meta.title
    }
    next()
});
export default router
