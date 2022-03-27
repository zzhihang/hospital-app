/**
 * @Description 项目公共service存放
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/13 13:53
 **/

import axios from "axios";
import {getEnvConfig} from "../static/js/env.config";

const env = getEnvConfig();

/**
 * @Description 项目埋点方法
 * @Param
 * @return
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/5/14 17:05
 **/
export const statistics = (data) => {
    return axios.post(env.SHOST + '/web/vip/statistics.shtml', data)
}
