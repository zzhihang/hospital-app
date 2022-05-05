
import axios from "axios";

/**
 * @Description:  搜索全部
 * @Param: nickname  headimgurl
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const searchAll = (queryText) => {
    return axios.post('/wx/search/queryAll', {queryText})
};

/**
 * @Description:  搜索医院
 * @Param: nickname  headimgurl
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const queryHospital = (queryText) => {
    return axios.post('/wx/search/queryHospital', {queryText})
};

