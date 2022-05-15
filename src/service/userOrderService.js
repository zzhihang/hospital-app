import axios from "axios";

export const orderCreate = (data) => {
    return axios.post(`/wx/order/create`, data)
};

export const orderList = (data) => {
    return axios.post(`/wx/order/list`, data)
};

export const orderInfo = (id) => {
    return axios.post(`/wx/order/info`, {id})
};

export const orderCancel = (id) => {
    return axios.post(`/wx/order/cancel`, {id})
};

export const orderDelete = (id) => {
    return axios.post(`/wx/order/delete`, {id})
};

export const wxYanQian = (url) => {
    return axios.post(`/wx/order/jssignature`, {url})
};

export const wxPay = (orderNo) => {
    return axios.post(`/wx/order/wxpay`, {orderNo})
};

export const orderStatus = (orderNo) => {
    return axios.post(`/wx/order/status`, {orderNo})
};
