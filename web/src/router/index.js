/*
 * @Author: your name
 * @Date: 2022-01-20 15:56:51
 * @LastEditTime: 2023-03-25 11:20:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \myproject\webapp\src\router\index.js
 */
// 配置前缀url
import { componentsMap, routerWeb, appUtils } from 'ims-web'
const isProduction = process.env.NODE_ENV === 'production'
let bserUrl = isProduction ? JSON.parse(process.env.VUE_APP_CONFIG).baseDir + '/web' : './'
import { createRouter, createWebHashHistory } from 'vue-router'
import login from '@/views/publicpart/login.vue'
import dnsAccess from '@/views/publicpart/dnsAccess.vue'
import ssoLogin from '@/views/publicpart/ssoLogin.vue'
import home from '@/views/publicpart/home.vue'

const messageHelper = appUtils.getStoreInfo('helper', 'messageHelper')

//由存储到vuex的菜单取出
let routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/dnsAccess',
    name: 'dnsAccess',
    meta: {
      title: messageHelper.get('common.ui.button.login'),
      requiresAuth: false,
      power: true,
      layout: componentsMap.PgSimpleLayout,
      canTabs: false
    },
    component: dnsAccess
  },
  {
    path: '/ssoLogin',
    name: 'ssoLogin',
    meta: {
      title: messageHelper.get('common.ui.button.login'),
      requiresAuth: false,
      power: true,
      layout: componentsMap.PgSimpleLayout,
      canTabs: false
    },
    component: ssoLogin
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: messageHelper.get('common.ui.button.login'),
      requiresAuth: false,
      power: true,
      layout: componentsMap.PgSimpleLayout,
      canTabs: false
    },
    component: login
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: messageHelper.get('common.ui.home.page'),
      requiresAuth: true,
      power: true,
      layout: componentsMap.PgDefaultLayout,
      canTabs: true,
      menu_code: 'home'
    },
    component: home
  }
]
const router = createRouter({
  history: createWebHashHistory(bserUrl),
  routes
})

router.beforeEach(routerWeb.beforeEach)
export default router


