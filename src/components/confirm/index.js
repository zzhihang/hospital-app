import { Dialog } from 'vant';

const confirm = (option, okCb, cancenCb) => {
    const options = Object.assign({}, {title: '提示', confirmButtonText: '确定'}, option)
    Dialog.confirm(options)
        .then(() => {
            okCb && okCb();
        })
        .catch(() => {
            cancenCb && cancenCb();
        })
}

export default confirm;

