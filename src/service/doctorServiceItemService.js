import axios from "axios";

/**
 * @Description: 医生服务项目
 * @Param:
 * @return:
 * @Author: zzhihang@hotmail.com
 * @date: 2022/5/6 18:48
 */
export const doctorServiceList = () => {
    return axios.post('/wx/doctorgs/list')
};

export const doctorServiceSave = (data) => {
    return axios.post('/wx/doctorgs/save', data)
};

export const doctorServiceDetail = (id) => {
    return axios.post('/wx/doctorgs/detail', {id})
};

export const doctorServiceDelete = (id) => {
    return axios.post('/wx/doctorgs/delete', {id})
};

export const doctorServiceFreeDisable = () => {
    return axios.post('/wx/doctor/free/disable')
};

export const doctorServiceFreeEnable = () => {
    return axios.post('/wx/doctor/free/enable')
};
