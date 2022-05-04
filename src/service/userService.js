import axios from "axios";

export const userCount = () => {
    return axios.post(`/wx/user/count`)
};


export const userPatientList = () => {
    return axios.post(`/wx/userPatient/list`)
};

export const userPatientInfo = (id) => {
    return axios.post(`/wx/userPatient/info`, {id})
};

export const userPatientSave = (data) => {
    return axios.post(`/wx/userPatient/save`, data)
};
