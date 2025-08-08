/*
 * @Author: 夏丹新
 * @Date: 2022-06-09 20:23:34
 * @LastEditTime: 2023-02-17 11:14:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \imsfapdae:\UserData\Dev28\imsv6\source\trunk\app\frontend\imspda\src\router\index.js
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import { appUtils, store, componentsMap } from 'ims-pda'
import DnsAccess from '@/views/publicpart/dnsAccess.vue'
import Login from '@/views/publicpart/login.vue'
import Home from '@/views/publicpart/home.vue'
import Mine from '@/views/publicpart/mine.vue'
import Message from '@/views/publicpart/message.vue'


const messageHelper = store.state.helper.messageHelper
const isProduction = process.env.NODE_ENV === 'production'
let baseUrl = isProduction ? JSON.parse(process.env.VUE_APP_CONFIG).baseDir + '/pda' : './'

const routes = [
    {
        path: '/',
        redirect: (to) => {
            return {
                path: '/home',
                query: to.query
            }
        }
    },
    {
        path: '/dnsAccess',
        name: 'dnsAccess',
        component: DnsAccess,
        meta: {
            title: messageHelper.get('common.ui.platform.name'),
            requiresAuth: false,
            power: true,
            layout: componentsMap.PgSimpleLayout,
            canTabs: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: messageHelper.get('common.ui.button.login'),
            requiresAuth: false,
            power: true,
            layout: componentsMap.PgSimpleLayout,
            canTabs: false
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            title: messageHelper.get('common.ui.home.page'),
            layout: componentsMap.PgDefaultLayout,
            requiresAuth: true,
            power: true,
            canTabs: true
        }
    },
    {
        path: '/mine',
        name: 'mine',
        component: Mine,
        meta: {
            title: messageHelper.get('common.ui.mine.page'),
            layout: componentsMap.PgDefaultLayout,
            requiresAuth: true,
            power: true,
            canTabs: true
        }
    },
    {
        path: '/message',
        name: 'message',
        component: Message,
        meta: {
            title: messageHelper.get('common.ui.message.page'),
            layout: componentsMap.PgDefaultLayout,
            requiresAuth: true,
            power: true,
            canTabs: true
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(baseUrl),
    routes
})
// 路由守卫
router.beforeEach(async (to, form, next) => {
    // 生成网页标题
    document.title = messageHelper.get('common.ui.platform.name')
    // 域名验证
    if (appUtils.getSelfServiceConfigParams('dnsAccess') && !appUtils.isUniAppEnv() && appUtils.isIpAccess(window.location.hostname)) {
        if (to.name === 'dnsAccess') {
            next()
        } else {
            next({
                name: 'dnsAccess'
            })
        }    
    } else {
        // 获取登录标识
        const isLogin = sessionStorage.getItem(appUtils.StorageKey.IS_LOGIN_PDA)
        // 从dns页面切回系统
        if(appUtils.getSelfServiceConfigParams('dnsAccess') && !appUtils.isUniAppEnv() && to.name === 'dnsAccess'){
            next({
                name: 'login'
            })
        }
        // 登录拦截跳转
        if ((isLogin === '1' && ['login'].includes(to.name)) || (to.name === 'home' && to.query.accessToken)) {
            if(to.query.accessToken){
                await appUtils.setStorageFromApp(to.query)
            }
            next({
                name: 'home'
            })
        }
        //没有找到匹配路由
        if (to.matched.length === 0) {
            next({
                name: form.name
            })
        }
        // 需要登录
        if (to.matched.some((item) => item.meta.requiresAuth)) {
            // 未登录 或者 登录失败
            if (isLogin === '0' || !isLogin) {
                next({
                    name: 'login'
                })
            }
            // 有访问权限
            else if (to.meta.power && isLogin === '1') {
                next()
            }
            // 回到当前页面
            else {
                next({
                    name: form.name
                })
            }
        } else {
            next()
        }
    }
    
})

export default router
