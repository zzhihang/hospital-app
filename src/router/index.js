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
const showList = ['/app', '/my', '/focus', '/message', '/doctor/app', '/doctor/message', '/doctor/fans', '/doctor/my'];
router.beforeEach((to, from, next) => {
    const fullPath = to.path;
    if(['/doctor/fans', '/focus'].includes(fullPath)){
        store.state.commonStore.tabBarActive = 2;
    }else if(['/message', '/doctor/message'].includes(fullPath)){
        store.state.commonStore.tabBarActive = 1
    }else if(['/my', '/doctor/my'].includes(fullPath)){
        store.state.commonStore.tabBarActive = 3
    }else if(['/app', '/doctor/app'].includes(fullPath)){
        store.state.commonStore.tabBarActive = 0
    }
    store.state.commonStore.ifShowTabBar = showList.includes(fullPath);
    if (to.meta.title) {
        window.document.title = to.meta.title
    }
    next()
});
export default router
