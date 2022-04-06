/**
 * @Description 项目公共service存放
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/5/13 13:53
 **/

import axios from "axios";

const uploadInstance = axios.create({
    headers: { 'Content-Type': 'multipart/form-data' }
});

/**
* @Description: 上传
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/3/27 17:01
*/
export const upload = (formData) => {
    return uploadInstance.post('/upload', formData)
};

/**
* @Description: 退出登录
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/2 18:44
*/
export const logout = (data) => {
    return axios.get('/logout')
};


/**
* @Description: 更新用户信息
* @Param: nickname  headimgurl
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/3 0:44
*/
export const updateUserInfo = (data) => {
    return axios.post('/userinfo/update', data)
};

/**
* @Description:  发送验证码
* @Param: nickname  headimgurl
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/3 0:44
*/
export const sendSms = (phone) => {
    return axios.post('/syssms/send', {phone})
};

/**
 * @Description:  发送验证码
 * @Param: nickname  headimgurl
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const login = ({phone, code}) => {
    return axios.post('/login', {phone, code})
};
