
/**
 * @Description 获取url参数
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/5/13 14:47
 **/
export const getParams = (key) => {
    const url = location.href;
    let params = {};
    if (url.indexOf("?") !== -1) {
        let str = url.split('?');
        let array = str[1].split('&');
        for (let i = 0; i < array.length; i++) {
            params[array[i].split("=")[0]] = unescape(array[i].split("=")[1]);
        }
    }
    if(key){
        return params[key]
    }
    return params;
}

/**
 * @Description 星号加密手机号
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/5/13 14:47
 **/
export const getStarPhone = (phone) => {
    if(typeof phone === 'number'){
        phone = String(phone);
    }
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * @Description 数字转数字+单位格式 用于超大数字
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/5/13 14:47
 **/

export const numberFormatByTenThousand = function (value) {
    if(!value){
        return 0
    }
    value = Number(value);
    const param = {};
    let k = 10000,
        sizes = ['', '万', '亿', '万亿'],
        i;
    if(value < k){
        param.value =value
        param.unit =''
    }else{
        i = Math.floor(Math.log(value) / Math.log(k));
        param.value = ((value / Math.pow(k, i))).toFixed(1);
        param.unit = sizes[i];
    }
    return param.value + param.unit;
}

/**
 * @Description 深层拷贝 不支持undefined function类型的copy
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/6/16 14:09
 **/
export const deepClone = (data) => {
    return JSON.parse(JSON.stringify(data));
}
/**
 * @Description 格式化日期
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/7/30 10:53
 **/

export const formatDate = (date, fmt='yyyy-MM-dd') => {
    if (typeof date == 'string') {
        return date;
    }
    if (!date) return null;
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
    return fmt
}

