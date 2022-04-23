import BaseStoreClass from "../BaseStoreClass";

class CommonStore extends BaseStoreClass{
    constructor(props) {
        super(props);
    }
}

export default new CommonStore({
    userInfo: {
        "id": '',
        "userId": '',
        "parentUser": '',
        "phone": '',
        "appid": '',
        "nickname": '',
        "headimgurl": '',
        "userType": '', //1为博主  0为普通用户
        "login": '',
        "unReadCount": ''
    },
    isBozhu: false,
    ifShowTabBar: false,
    commentShow: false
});
