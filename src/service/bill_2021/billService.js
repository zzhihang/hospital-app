import axios from "axios";

/**
 * @Description 2021 年年度账单
 * @Param 
 * @return 
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/12/24 11:38 
 **/
export const bill2021Service = ({userid, watchuserid}) => {
    return axios.post( '/web/list/list2021', {userid, watchuserid})
}