const mammoth = require("mammoth");

export const wordPreview = (url) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";

    xhr.onload = function(e) {
        var arrayBuffer = xhr.response; //arrayBuffer

        mammoth
            .convertToHtml({ arrayBuffer: arrayBuffer })
            .then(displayResult)
            .done();

        function displayResult(result) {
            console.log(result);
        }
    };

    xhr.send();
};
