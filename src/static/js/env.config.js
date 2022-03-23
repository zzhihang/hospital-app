/**
 * @Description 环境变量文件 考虑判断node_env编译时注入
 * @Param 
 * @return 
 * @Author zhuzh_hb@mingya.com.cn
 * @Date 2021/4/7 14:16 
 **/

const TEST_SIGNAL = 'testiweb.ibaodian.com';

const LOCALHOST = 'localhost';

const config = {
    test: {
        HUA_SHU_DA_QUAN: 'https://testwww.ibaodian.com/download/download.html?page=littletools',
        SUI_SHEN_BAO_DIAN: 'https://testwww.ibaodian.com/download/download.html?page=apphome',
        HOST: 'https://testiweb.ibaodian.com/',
        WWWHOST: 'https://testwww.ibaodian.com/',
        SHOST: 'https://tests.ibaodian.com',
        LHOST: 'https://testl.ibaodian.com',
        MHOST: 'https://testm.ibaodian.com',
        VHOST: 'https://testv.ibaodian.com',
        APPID: 'wx730027363ed07a2b',
        FILE_SERVER: 'https://files.ibaodian.com/static/official/',
        CHA_HE_BAO: 'http://wx.proxy.1fens.cn/?auk=hbb-test-cp-ssbd&uuid=',
        BHOST: 'https://testbill.ibaodian.com'
    },
    prod: {
        HUA_SHU_DA_QUAN: 'https://www.ibaodian.com/download/download.html?page=littletools',
        SUI_SHEN_BAO_DIAN: 'https://www.ibaodian.com/download/download.html?page=apphome',
        HOST: 'https://iweb.ibaodian.com/',
        WWWHOST: 'https://www.ibaodian.com/',
        SHOST: 'https://s.ibaodian.com',
        LHOST: 'https://l.ibaodian.com',
        MHOST: 'https://m.ibaodian.com',
        VHOST: 'https://v.ibaodian.com',
        APPID: 'wx25b5d2d437ba6d89',
        FILE_SERVER: 'https://files.ibaodian.com/static/official/',
        CHA_HE_BAO: 'http://wx.proxy.1fens.cn/?auk=hbb-cp-ssbd&uuid=',
        BHOST: 'https://bill.ibaodian.com'
    }
}


export const getEnvConfig = () => {
    const url = window.location.href;
    
    if(url.includes(TEST_SIGNAL) || url.includes(LOCALHOST) || url.includes('10.10.0.50')){
        return config.test
    }
    return config.prod;
}
