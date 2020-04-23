/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-04-24 00:12:17
 * @LastEditors: lxw
 * @LastEditTime: 2020-04-24 02:09:35
 */
import mAjax from './lib/majax';
import './mock/mock.js';

// Mock.mock('/data/index', 'post', data)

console.log('mAjax')
console.log('--------------------')
console.log('基于promise 封装的ajax插件')
console.log('--------------------')
console.log(mAjax)
// index.html模板生成渲染后再引入打包的js文件后执行 api/data/article
const appEle = document.getElementById('app')
const testReqBtn = appEle.querySelector('.b1')
const infoShow = appEle.querySelector('.content')
testReqBtn.onclick = function(){
    infoShow.innerHTML = '请求中...'
    const request = mAjax({
        baseUrl: 'http://mockjs.com/api',
        method: 'get',
        withCredentials: true,
        isProgress: false,//是否展示进度
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },//默认发送表单格式数据，字符串键值对
    })
    request({url:'/posts'}).then((result) => {
       console.log(result.data) 
       infoShow.innerHTML = `请求成功——随机文章的title:${result.data.posts[0].title}`

    }).catch((err) => {
        console.log(err)
    });
}