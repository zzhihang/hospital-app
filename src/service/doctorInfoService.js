import axios from "axios";

export const doctorRecommend = () => {
    return axios.post(`/wx/doctor/recommend`)
};

export const doctorDetail = (id) => {
    return axios.post(`/wx/doctor/detail`,{id})
};

export const doctorInfoService = (id) => {
    return axios.post(`/wx/doctor/service`,{id})
};

export const doctorUnFollow = (doctorId) => {
    return axios.post(`/wx/doctorfollow/del`,{doctorId})
};

export const doctorFollow = (doctorId) => {
    return axios.post(`/wx/doctorfollow/new`,{doctorId})
};
export const doctorFollowList = () => {
    return axios.post(`/wx/doctorfollow/list`)
};

export const doctorOrderCount = () => {
    return axios.post('/wx/doctor/count')
}
