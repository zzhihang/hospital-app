import Compressor from 'compressorjs';
export const compressFile = (file) => {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            quality: 0.5, //压缩质量
            checkOrientation: false, //图片翻转，默认为false
            success(result) {
                resolve(result);
            },
            error(e) {
                reject()
            }
        })
    })
}
