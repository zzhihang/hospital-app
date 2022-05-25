/**
 * @Description 环境变量文件 考虑判断node_env编译时注入
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/4/7 14:16
 **/

const LOCALHOST = 'localhost';

const config = {
    test: {
        HOST: 'https://knowledge.shouzimu.xyz',
    },
    prod: {
        HOST: 'https://knowledge.shouzimu.xyz',
    }
};


export const getEnvConfig = () => {
    const url = window.location.href;

    if(url.includes(config.test.HOST) || url.includes(LOCALHOST)){
        return config.test
    }
    return config.prod;
};
