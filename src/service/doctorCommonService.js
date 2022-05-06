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

export const doctorBind = () => {
    return axios.get('/doctor/bind')
};

export const doctorRedirect = () => {
    return axios.get('/doctor/redirect')
};

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
