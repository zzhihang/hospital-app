/**
 * @Description 项目公共service存放
 * @Param 
 * @return 
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/13 13:53 
 **/

import axios from "axios";
import {getEnvConfig} from "../static/js/env.config";

const env = getEnvConfig();

/**
 * @Description 项目埋点方法
 * @Param 
 * @return 
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05 
 **/
export const statistics = (data) => {
    return axios.post(env.SHOST + '/web/vip/statistics.shtml', data)
}

/**
 * @Description 项目迁移过来的埋点方法
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05
 **/
export const mdStatistics = (option, platform='web-public') => {
    const data = {
        option: JSON.stringify(option),
        platform
    }
    return axios.post('/user/statistics', data)
}

/**
 * @Description  获取用户userid
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05
 **/
export const getUserInfoOnlyWxNew = (params) => {
    return axios.post('/web/common/getUserInfoOnlyWxNew', params)
}

/**
 * @Description 校验一个用户是否注册了随身保典
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05
 **/
export const isRegistered = ({mobile}) => {
    return axios.post('/web/invite/isregistered', {mobile})
}

/**
 * @Description 获取token
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/8/5 16:26
 **/
export const getToken = (key) => {
    return axios.get(`${env.WWWHOST}/getSsbdFileToken.shtml?key=${key}`);
}

/**
 * @Description 上传图片到七牛
 * @Param  base64
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/8/5 16:26
 **/
export const uploadImgToQiNiu = (key, picData, token) => {
    const url = location.protocol === 'http:' ? "http://upload-z1.qiniu.com/putb64/-1/key/" + key : "https://upload-z1.qbox.me/putb64/-1/key/" + key;
    return axios.post(url, picData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `UpToken ${token}`
        }
    });
}