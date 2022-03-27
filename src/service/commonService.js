/**
 * @Description 项目公共service存放
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
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
* @Author: zhuzhhm@yonyou.com
* @date: 2022/3/27 17:01
*/
export const upload = (formData) => {
    return uploadInstance.post('/api/upload', formData)
}
