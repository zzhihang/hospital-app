import axios from "axios";

export const doctorRemoveUnRead = () => {
  return axios.post(`/wx/user/count`)
};

