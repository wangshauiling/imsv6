
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { createApp } from 'vue'
// 样式文件
import 'ims-pda/lib/ImsPda.css'
//引入字体图标
import '@/assets/iconfont/iconfont.css' 
//引入桌面端事件适配文件
import '@vant/touch-emulator' 

import { store, componentsMap, appUtils } from 'ims-pda'

// 项目版本
appUtils.pro_version = '1.0.0'
appUtils.store = store

import router from '@/router'
appUtils.router = router

// 引入ajax
import server from '@/ajax/ajax.js' 
appUtils.server = server

import {_appUtils} from '@/utils'
appUtils._appUtils = _appUtils

import App from '@/App.vue'
const app = createApp(App)
for (const componentName in componentsMap) {
    app.component(componentName, componentsMap[componentName])
}
const pdaUtils = appUtils.ImsFaPda.pdaUtils
// ajax内部类
app.config.globalProperties.$server = server
// 内部工具类
app.config.globalProperties.$appUtils = appUtils
app.config.globalProperties.$pdaUtils = pdaUtils
//注册全局单击事件
app.config.globalProperties.globalClick = function (callback) {
    document.getElementsByTagName('body')[0].addEventListener('click', callback, { passive: true })
}
//卸载全局单击事件
app.config.globalProperties.globalClickOff = function (callback) {
    document.getElementsByTagName('body')[0].removeEventListener('click', callback, { passive: true })
}
// 初始化内部函数
appUtils.initImsFaPda({ appUtils, server, templateFn: appUtils.templateFn })
appUtils.initProvideParams({ appUtils, server, templateFn: appUtils.templateFn })

// 重写获取音频方法
appUtils.getAudio = function (type = 'success', audioPath) {
    let _audio = ''
    const audioType = {
        fail: window.selfServiceConfig?.errorVideo ?? require('@/assets/audio/Fail.wav'),
        success: window.selfServiceConfig?.suceessVideo ?? require('@/assets/audio/suceess.wav')
    }
    if(audioPath){
        _audio = new Audio(audioPath)
    }else if (audioType[type]) {
        _audio = new Audio(audioType[type])
    }
    return _audio
}

// 修正环境变量
window._process_env = process.env

// 修正组件页面变量
import imsFaSystem from '@/views/systempart/systempart'
window._imsFaSystem = imsFaSystem


app.use(store).use(router).use(appUtils.ImsFaPda).mount('#app')
