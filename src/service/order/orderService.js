/**
 * @Description: 删除
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/3/27 15:15
 */
import axios from "axios";

/**
* @Description:糖主订单列表
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/3 0:38
*/
export const orderList = () => {
    return axios.post(`/order/trancaction/list`)
};
/**
* @Description: 糖主订单详情
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/3 0:38
*/
export const orderDetail = (id) => {
    return axios.post(`/order/trancaction/info`, {id})
};

/**
 * @Description: 订单状态
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:38
 */
export const orderStatus = (orderNo) => {
    return axios.post(`/order/status`, {orderNo})
};

/**
 * @Description: 获取微信支付信息
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/4/3 0:38
 */
export const getWxPayInfo = (orderNo) => {
    return axios.post(`/order/wxpay`, {orderNo})
};


/**
* @Description:支付宝跳转接口
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/4 16:47
*/
export const aliPay = (orderNo) => {
    return axios.post(`/order/alipay`, {orderNo})
};

/**
* @Description: 普通客人订单列表
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/3 0:38
*/
export const customerOrderList = () => {
    return axios.post(`/order/list`)
};


/**
* @Description: 8 普通客人订单详情
 * @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/3 0:39
*/
export const customerOrderDetail = (id) => {
    return axios.post(`/order/info`, {id})
};

/**
* @Description: 专题订阅 产生订单
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/4/5 9:31
*/
export const orderCreate = (id) => {
    return axios.post(`/order/create`, {businessId: id})
};
