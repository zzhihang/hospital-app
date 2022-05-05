import axios from "axios";

export const orderJxz = () => {
    return axios.post(`/wx/doctor/order/jxz`)
};
export const orderDjs = () => {
    return axios.post(`/wx/doctor/order/djs`)
};
