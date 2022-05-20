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
