import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import commonStore from './routeStore/commonStore'
Vue.config.devtools = true; //开发者工具选项
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        commonStore: commonStore,
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
});

export default store;
