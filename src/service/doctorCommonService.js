import axios from "axios";

/**
 * @Description: 医生相关service
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/5/6 18:48
 */
export const doctorLogout = () => {
    return axios.get('/doctor/logout')
};

export const doctorBind = ({phone, code}) => {
    return axios.post('/doctor/bind', {phone, code})
};

export const doctorAuth = () => {
    return axios.post('/doctor/redirect')
}

/**
 * @Description:  发送验证码
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const doctorSendSms = (phone) => {
    return axios.post('/wx/sms/sendDoctor', {phone})
};

/**
* @Description: 医生信息接口
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/14 16:02
*/
export const doctorUserInfo = () => {
    return axios.get('/wx/doctor/info')
};
