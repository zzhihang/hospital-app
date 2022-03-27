import BaseStoreClass from "../BaseStoreClass";

class TopicStore extends BaseStoreClass{
    constructor(props) {
        super(props);
    }
}

export default new TopicStore({
    userId: '',
});
