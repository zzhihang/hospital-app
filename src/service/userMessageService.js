import axios from "axios";

/**
 * @Description: 用户消息列表
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/5/15 19:55
 */
export const userMessageList = () => {
  return axios.post(`/wx/imbooks/user`)
};

/**
* @Description: 会话创建-用户
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/20 0:25
*/
export const userChatCreate = (doctorId) => {
  return axios.post(`/wx/imbooks/user/create`, {doctorId})
};
