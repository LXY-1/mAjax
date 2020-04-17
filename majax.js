/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-04-17 17:34:36
 * @LastEditors: lxw
 * @LastEditTime: 2020-04-17 17:36:26
 */
const mAjas = (function () {
    function ajax(options) {
        let opts = {
            baseUrl: '',
            method: 'get',
            withCredentials: false,
            isProgress: false,//是否展示进度
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },//默认发送表单格式数据，字符串键值对
        }
        opts = Object.assign(opts, options)
        //前面是全局配置，下面通过返回闭包，实现局部调用配置,使用promist处理异步监听
        return function (needOptions) {
            let needOpt = {
                url: '',
                method: 'get',
                withCredentials: false,
                isProgress: false,
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },//默认发送表单格式数据，字符串键值对
                data: '',//默认都是传json，不管是表单还是json格式，我会在方法对不对应转换的
                onUploadProgress,//监听上传进度

            }
            needOpt = Object.assign(needOpt, needOptions)
            opts = Object.assign(opts, needOpt)
            return new Promise((resolve, reject) => {
                // 创建xhr对象，用于发送ajax请求
                const xhr = getXhr();
                let senData = '';
                if (opts.header['Content-Type'] === 'application/x-www-form-urlencoded') {
                    // 序列化参数
                    for (const key in opts.data) {
                        if (object.hasOwnProperty(key)) {
                            senData += `${key}=${opts.data[key]}&`
                        }
                    }
                    senData = senData.substr(0, data.length - 1);
                } else if (pts.header['Content-Type'] === 'json') {
                    senData = JSON.stringify(opts.data)
                }
                // 监听请求发送
                xhr.onreadystatechange = function () {
                    // 判断请求是否完成
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                            resolve(xhr.responseText)
                        } else {
                            reject(xhr)
                        }
                    }
                }
                xhr.withCredentials = opts.withCredentials
                // 设置请头
                for (const key in opts.header) {
                    if (object.hasOwnProperty(property)) {
                        xhr.setRequestHeader(key, opts.header[key]);
                    }
                }
                // 是否监督上传进度
                if (opts.isProgress) {
                    xhr.upload.addEventListener('progress', function (event) {
                        onUploadProgress(event)
                    }, false);
                }
                // 开始准备建立发送
                xhr.open(opts.method, opts.baseUrl + opts.url, true)
                xhr.send(opts.data)
            });
        }
    }
    // 获取xhr对象
    function getXhr() {
        return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
    }

    return ajax

})()