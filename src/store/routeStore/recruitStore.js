import BaseStoreClass from "../BaseStoreClass";

class TrainStore extends BaseStoreClass{
    constructor(props) {
        super(props);
    }
}

export default new TrainStore({
    teamid:15,//团队长ID
    teammodel:{},//团长信息
    seting:false,
    citys:[],//增员要求，城市
    obj:{
        name:''
    }
});