### 基于promise封装的简易ajax插件
- bug版，未调试
- 支持全局配置，局部调用配置
- 支持表单上传格式、json格式、文件生成进度监听
- 使用
```
const request = mAjax({
    baseUrl: '',
    method: 'get',
    withCredentials: false,
    isProgress: false,//是否展示进度
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },//默认发送表单格式数据，字符串键值对
})
request({metod:'post',url:'',data:{username:'xxx'}})
```
- 参数data；固定Object类型，如果是get请求且参数以uri的query形式的无需加data，如果是表单类型的，data也是Object类型，封装的方法内部会根据content-type类型自动转换data格式
- 封装方法返回的结果：{}类型，是自己包装给一个对象类型，包含状态码，后天响应结果data等字段

### 下面是xhr对象的字段
```
onabort: null
onerror: null
onload: null
onloadend: null
onloadstart: null
onprogress: null
onreadystatechange: null
ontimeout: null
readyState: 0
response: "" //这个
responseText: ""
responseType: ""
responseURL: ""
responseXML: null
status: 0
statusText: ""
timeout: 0
upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …} // 这个
withCredentials: false
__proto__: XMLHttpRequest
```