import axios from "axios";

const uploadInstance = axios.create({
  headers: { 'Content-Type': 'multipart/form-data' }
});

/**
 * @Description: 上传
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/3/27 17:01
 */
export const upload = (formData) => {
  return uploadInstance.post('/upload', formData)
};

/**
* @Description: 获取系统配置
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/21 23:44
*/

export const getSystemSetting = () => {
  return axios.post('/wx/syssetting/get')
};
