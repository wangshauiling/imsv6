/*
 * @Author: your name
 * @Date: 2022-02-12 15:02:22
 * @LastEditors: Please set LastEditors
 * @Description: 调用ajax工具类
 * @FilePath: \webapp\src\ajax\ajax.js
 */
// ajax请求封装
import { Service, initLoadPanel } from 'ims-web'
import { ajaxDevConfig } from './ajaxDevConfig.js'

// 实例化
initLoadPanel()
const server = new Service({
    devBaseUrl: ajaxDevConfig.url,
    prodBaseUrl: window.selfServiceConfig && window.selfServiceConfig.baseUrl,
    env: process.env.NODE_ENV,
    // 单位1000 等于1秒 此处是60秒
    timeout: Service.defaultTime,
    U: 'wU:', // cookie
    P: 'wP:' // cookie
})

export default server
