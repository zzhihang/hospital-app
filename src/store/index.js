import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import trainStore from "@/store/routeStore/trainStore";
import recruitStore from "@/store/routeStore/recruitStore";

Vue.config.devtools = true; //开发者工具选项
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        trainStore: trainStore,
        recruitStore: recruitStore
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
});

export default store;