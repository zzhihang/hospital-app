import axios from "axios";

export const doctorFansList = () => {
    return axios.post(`/wx/doctorfollow/fans`)
};
