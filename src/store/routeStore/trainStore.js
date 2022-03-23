import BaseStoreClass from "../BaseStoreClass";

class TrainStore extends BaseStoreClass{
    constructor(props) {
        super(props);
    }
}

export default new TrainStore({
    userId: '',
    areaId: '1',
    areaName: '北京地区',
    trainRights: false,
    trainCourseroomModel: {},
    trainCourseList: [],
    questionList: []
});