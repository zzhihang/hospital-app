import axios from "axios";

export const fansList = () => {
    return axios.post(`/wx/doctorfollow/fans`)
};
