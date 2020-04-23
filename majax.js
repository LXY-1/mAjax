/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-04-17 17:34:36
 * @LastEditors: lxw
 * @LastEditTime: 2020-04-24 02:10:17
 */
    /**
 * @name: 
 * @description: 
 * @msg: 
 * @param {Object} 
 * @return: Function(option)
 */
export default function ajax(options) {
    let opts = {
        baseUrl: '',
        method: 'get',
        withCredentials: false,
        isProgress: false,//是否展示进度
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },//默认发送表单格式数据，字符串键值对
    }
    opts = Object.assign(opts, options)
    //前面是全局配置，下面通过返回闭包，实现局部调用配置,使用promist处理异步监听
    /**
     * @name: 
     * @description: 
     * @msg: 
     * @param {Object} 
     * @return: 
     */
    return function (needOptions) {
        let needOpt = {
            url: '',
            method: 'get',
            withCredentials: true,
            isProgress: false,
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },//默认发送表单格式数据，字符串键值对
            data: '',//默认都是传json，不管是表单还是json格式，我会在方法对不对应转换的
            onUploadProgress(){
                
            },  //监听上传进度

        }
        needOpt = Object.assign(needOpt, needOptions)
        opts = Object.assign(opts, needOpt)
        console.log(opts)
        return new Promise((resolve, reject) => {
            // 创建xhr对象，用于发送ajax请求
            const xhr = getXhr();
            let senData = '';
            if (opts.data!=='') {
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
            }
            
            // 监听请求发送
            xhr.onreadystatechange = function () {
                // 判断请求是否完成
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        // 自己包装一个对象作为结果返回
                        const result = {
                            data: JSON.parse(xhr.response),
                            status: xhr.status,
                            statusText: xhr.statusText
                        }
                        resolve(result)
                    } else { // 剩下的状态码属于出错状态码，也包括请求超时501
                        reject(new Error('请求出错了'))// Error类型可以自动捕获具体的出错
                    }
                }
            }
            xhr.withCredentials = opts.withCredentials
            xhr.timeout = 10000 //设置超时时间为10秒
            // 设置请头
            for (const key in opts.header) {
                if (opts.header.hasOwnProperty(key)) {
                    // TODO:与mockjs一起使用的时候设置请求头会报错
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

