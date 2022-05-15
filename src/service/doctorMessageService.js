import axios from "axios";

export const doctorRemoveUnRead = () => {
  return axios.post(`/wx/user/count`)
};

/**
* @Description: 医生消息列表
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/15 19:55
*/
export const doctorMessageList = () => {
  return axios.post(`/wx/imbooks/doctor`)
};

/**
* @Description: 群组-添加成员
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/15 17:40
*/
export const doctorChatAddMember = ({groupId, userIds}) => {
  return axios.post(`/imgroupmember/add`,{groupId, userIds})
};
/**
 * @Description: 群组-删除成员
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/5/15 17:40
 */
export const doctorChatRemoveMember = (ids) => {
  return axios.post(`/imgroupmember/del`, {ids})
};

/**
* @Description: 群组成员
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/15 17:41
*/
export const doctorChatGroupMemberList = (groupId) => {
  return axios.post(`/imgroupmember/list`, {groupId})
};

/**
* @Description: 重命名群组
* @Param: groupName id
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/15 17:42
*/
export const doctorChatGroupRename = ({groupName, groupId}) => {
  return axios.post(`/imgroup/rename`, {groupName, groupId})
};

/**
* @Description: 创建群组
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/15 17:42
*/
export const doctorChatGroupCreate = (userIds) => {
  return axios.post(`/imgroup/create`, {userIds})
};

/**
* @Description: 聊天记录获取
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/15 17:42
*/
export const doctorChatHistory = (id) => {
  return axios.post(`/immessage/history`, {id})
};

