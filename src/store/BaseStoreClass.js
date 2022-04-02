/**
 * @Description store基础类 所有的store module都继承于此 自动生成get set 后续考虑用注解改造
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/8/12 9:57
 **/

const toUpperCaseFirstLetter = (word) => {
    return word.replace(/^\S/, s => s.toUpperCase())
}

class BaseStoreClass{
    constructor(state) {
        this.namespaced = true;
        this.state = state || {};
        this.getters = {};
        this.mutations = {};
        this.actions = {};
        this.genGetters();
        this.genMutations();
    }
    genGetters(){
        for (const s in this.state) {
            this['getters'][`get${toUpperCaseFirstLetter(s)}`] = (state) => {
                return state[s];
            }
        }
    }
    genMutations(){
        for (const s in this.state) {
            this['mutations'][`set${toUpperCaseFirstLetter(s)}`] = (state, value) => {
                state[s] = value
            }
        }
    }
}

export default BaseStoreClass;
