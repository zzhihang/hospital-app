import BaseStoreClass from "../BaseStoreClass";

class CommonStore extends BaseStoreClass{
    constructor(props) {
        super(props);
    }
}

export default new CommonStore({
    userInfo: {},
    orderDoctor: {},
    orderPatient: {},
    orderService: {},
});
