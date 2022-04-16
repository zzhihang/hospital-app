import axios from "axios";

/**
 * @Description:  服务协议
 * @Param: nickname  headimgurl
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:44
 */
export const serviceAgreement = () => {
    return axios.post('/dict/serviceagreement')
};

/**
* @Description: 这个接口返回金额限制
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/16 13:47
*/
export const dictPrice = () => {
    return axios.post('/dict/price')
};
