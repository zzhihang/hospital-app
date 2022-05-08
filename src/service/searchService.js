
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
 * @Param: queryText
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const queryHospital = (queryText) => {
    return axios.post('/wx/search/queryHospital', {queryText})
};

/**
 * @Description:  搜索疾病标签
 * @Param: queryText
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const queryDisease = (queryText) => {
    return axios.post('/wx/search/queryLabel', {queryText})
};

/**
 * @Description:  搜索医院科室-医生列表
 * @Param: queryText
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const queryDoctorByHospital = ({deptId, hospitalId}) => {
    return axios.post('/wx/search/sd/doctor', {deptId, hospitalId})
};

/**
 * @Description:  搜索医院科室-医生列表
 * @Param: queryText
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const queryDoctorByLabel = ({diseaseId, label}) => {
    return axios.post('/wx/search/label/doctor', {diseaseId, label})
};

