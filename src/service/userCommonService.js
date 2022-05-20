
import axios from "axios";

/**
* @Description: 退出登录
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/2 18:44
*/
export const logout = () => {
    return axios.get('/logout')
};


/**
* @Description:  发送验证码
* @Param: nickname  headimgurl
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/3 0:44
*/
export const sendSms = (phone) => {
    return axios.post('/wx/sms/sendUser', {phone})
};

/**
 * @Description:  登录
 * @Param: nickname  headimgurl
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const login = ({phone, code}) => {
    return axios.post('/user/bind', {phone, code})
};


export const userInfo = () => {
    return axios.get('/wx/user/info')
};



