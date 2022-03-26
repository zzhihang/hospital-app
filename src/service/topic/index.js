import axios from "axios";

/**
 * @Description 博主专题列表
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05
 **/
export const zhuantiList = (data) => {
    return axios.get('/zhuanti/list', data)
};

/**
 * @Description 标签列表
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05
 **/
export const userinfo = () => {
    return axios.get('/api/userinfo')
};

/**
 * @Description 标签列表
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05
 **/
export const testLogin = () => {
    return axios.get('/api/testLogin?openId=bozhu')
};

/**
* @Description:
* @Param:
* @return:
* @Author: zhuzhhm@yonyou.com
* @date: 2022/3/26 22:22
*/
export const userLabels = () => {
    return axios.get('/userlabels/list')
};
