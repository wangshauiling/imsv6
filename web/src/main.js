/*
 * @Author: your name
 * @Date: 2022-01-20 15:56:51
 * @LastEditTime: 2023-10-20 16:41:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \myproject\testapp\src\main.js
 */
import mitt from 'mitt'
import { createApp } from 'vue'
import { store, componentsMap, appUtils } from 'ims-web'

// 修正导入图片方法
appUtils.requireFile = function (imgPath) {
  return require('@/assets/' + imgPath)
}

appUtils.pro_version = '1.0.0'

import '@/assets/font/iconfont.css'
// 引入ims-web库
import 'ims-web/lib/ImsWeb.css'

import router from '@/router'
// 挂载router请求方法
appUtils.router = router

import { _appUtils } from '@/utils'
// 挂载router请求方法
appUtils._appUtils = _appUtils

// 引入ajax
import server from '@/ajax/ajax.js'
// 挂载ajax请求方法
appUtils.server = server
// 挂载vuex
appUtils.store = store

// 引入项目组件库
import App from '@/App.vue'
const app = createApp(App)
for (const componentName in componentsMap) {
  app.component(componentName, componentsMap[componentName])
}
// 事件总线
app.config.globalProperties.$bus = mitt()
// 内部工具类
app.config.globalProperties.$templateFn = appUtils.templateFn
// ajax内部类
app.config.globalProperties.$server = server
// 内部工具类
app.config.globalProperties.$appUtils = appUtils
// icon类
let menuIcon = process.env.VUE_APP_ICON_FONT_CSS
app.config.globalProperties.$menuIcon = menuIcon

//注册全局单击事件
app.config.globalProperties.globalClick = function (callback) {
  document.getElementsByTagName('body')[0].addEventListener('click', callback)
}
//卸载全局单击事件
app.config.globalProperties.globalClickOff = function (callback) {
  document.getElementsByTagName('body')[0].removeEventListener('click', callback)
}

// 初始化内部函数
appUtils.initfaweb({ appUtils, server, templateFn: appUtils.templateFn, menuIcon })

// 弹窗使用
appUtils.initProvideParams({
  appUtils,
  server,
  templateFn: appUtils.templateFn,
  menuIcon,
  globalClick: app.config.globalProperties.globalClick,
  globalClickOff: app.config.globalProperties.globalClickOff
})

// 修正环境变量
window._process = { env: process.env }
// 修正组件页面变量
import imsFaSystem from '@/views/systempart/systempart'
window._imsFaSystem = imsFaSystem

app.use(store).use(router).use(appUtils.ImsFaWeb).mount('#app')


// 错误拦截

// app.config.errorHandler = (err,vm,info) => {
//     app.config.globalProperties.$messageBox.error({
//          message:err.message
//      })
//     console.log(err,vm,info)
// }