// ajax请求封装
import { Service, initLoadPanel } from 'ims-pda'
import { ajaxDevConfig } from './ajaxDevConfig.js'

// 实例化
initLoadPanel()
const server = new Service({
    devBaseUrl: ajaxDevConfig.url,
    prodBaseUrl: window.selfServiceConfig && window.selfServiceConfig.baseUrl,
    env: process.env.NODE_ENV,
    // 单位1000 等于1秒 此处是60秒
    timeout: Service.defaultTime,
    U: 'pU:', // cookie
    P: 'pP:' // cookie
})

export default server