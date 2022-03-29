import axios from "axios";

/**
 * @Description 博主专题列表
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05
 **/
export const zhuantiList = (data) => {
    return axios.post('/zhuanti/list', data)
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
export const userLabelList = () => {
    return axios.get('/userlabels/list')
};

/**
 * @Description:
 * @Param:
 * @return:
 * @Author: zhuzhhm@yonyou.com
 * @date: 2022/3/26 22:22
 */
export const userLabelAdd = (label) => {
    return axios.post('/userlabels/add', {
        label
    })
};
/**
 * @Description:
 * @Param:
 * @return:
 * @Author: zhuzhhm@yonyou.com
 * @date: 2022/3/26 22:22
 */
export const userLabelDelete = (id) => {
    return axios.post('/userlabels/delete', {id})
};

/**
 * @Description:
 * @Param:
 * @return:
 * @Author: zhuzhhm@yonyou.com
 * @date: 2022/3/26 22:22
 */
export const zhuantiDetail = (data) => {
    return axios.post(`/zhuanti/detail`, data)
};

/**
* @Description: 删除某条动态
* @Param:
* @return:
* @Author: zhuzhhm@yonyou.com
* @date: 2022/3/27 15:15
*/
export const deleteDongtai = (id) => {
    return axios.get(`/zhuanti/detail/${id}`)
};

/**
* @Description: 点赞/取消点赞
* @Param:
* @return:
* @Author: zhuzhhm@yonyou.com
* @date: 2022/3/27 15:15
*/
export const dianZan = (itemId) => {
    return axios.post(`/zhuanti/up`,{
        itemId
    })
};

/**
 * @Description: 发布动态 添加 - 修改
 * @Param:
 * @return:
 * @Author: zhuzhhm@yonyou.com
 * @date: 2022/3/27 15:15
 */
export const postDynamic = (data) => {
    return axios.post(`/zhuanti/item/post`,data)
};

/**
 * @Description: 发布动态 添加 - 修改
 * @Param:
 * @return:
 * @Author: zhuzhhm@yonyou.com
 * @date: 2022/3/27 15:15
 */
export const createTopic = (data) => {
    return axios.post(`/zhuanti/bz/post`,data)
};

