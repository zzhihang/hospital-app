import axios from "axios";

export const doctorOrderJxz = () => {
    return axios.post(`/wx/doctor/order/jxz`)
};
export const doctorOrderDjs = () => {
    return axios.post(`/wx/doctor/order/djs`)
};

export const doctorOrderAccept = (orderId) => {
    return axios.post(`/wx/order/accept`, {orderId})
};

export const doctorOrderReject = (orderId) => {
    return axios.post(`/wx/order/reject`, {orderId})
};
