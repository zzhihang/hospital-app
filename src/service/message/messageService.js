import axios from "axios";

/**
* @Description: 消息中心
* @Param:
* @return:
* @Author: zhuzhhm@yonyou.com
* @date: 2022/4/2 11:01
*/
export const sysMessageList = (data) => {
    return axios.post('/sysmessage/list', data)
};


export const sysMessageReadall = (data) => {
    return axios.post('/sysmessage/readall', data)
};
