//iOS 交互声明
function connectWebViewJavascriptBridgeIOS(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    let WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
}


//Android 交互声明
function connectWebViewJavascriptBridgeANDROID(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            "WebViewJavascriptBridgeReady",
            function () {
                callback(WebViewJavascriptBridge);
            },
            false
        );
    }
}
let inits = 0
export default {
    //H5调用Native
    callhandler(name, data, callback) {
        //iOS的方法
        if (/(iPhone|iPad|iPod|iOS|Macintosh)/i.test(navigator.userAgent)) {
            connectWebViewJavascriptBridgeIOS(function (bridge) {
                bridge.callHandler(name, data, callback)
            })
        }
        //Android方法
        if (/(Android)/i.test(navigator.userAgent)) {
            connectWebViewJavascriptBridgeANDROID(function (bridge) {
                bridge.callHandler(name, data, callback)
            })
        }
    },
    //Native调用H5
    registerhandler(name, callback) {
        //iOS的方法
        if (/(iPhone|iPad|iPod|iOS|Macintosh)/i.test(navigator.userAgent)) {
            connectWebViewJavascriptBridgeIOS(function (bridge) {
                bridge.registerHandler(name, function (data, responseCallback) {
                    callback(data, responseCallback)
                })
            })
        }
        //Android方法
        if (/(Android)/i.test(navigator.userAgent)) {
            connectWebViewJavascriptBridgeANDROID(function (bridge) {
                console.log(inits) // 连续调用不行
                if(inits == 0){
                    bridge.init(function (message, responseCallback) {
                        if (responseCallback) {
                            // responseCallback(data);
                        }
                    });
                }
                inits++

                bridge.registerHandler(name, function (data, responseCallback) {
                    callback(data, responseCallback)
                })
            })
        }

    },

}