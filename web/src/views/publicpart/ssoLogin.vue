<!--
 * @Author: 庄集贵
 * @Date: 2022-01-20 15:56:51
 * @LastEditTime: 2023-04-03 09:28:14
 * @LastEditors: Please set LastEditors
 * @Description: 登录页面
 * @FilePath: \myproject\testapp\src\views\Home.vue
-->
<template>
  <div id="login"></div>
</template>
<script>
export default {
  name: 'ssoLogin',
}
</script>
<script setup>
import { getCurrentInstance, onBeforeMount, onMounted, nextTick } from 'vue'
const vm = getCurrentInstance()
const server = vm.appContext.config.globalProperties.$server
const appUtils = vm.appContext.config.globalProperties.$appUtils
const messageHelper = appUtils.getStoreInfo('helper', 'messageHelper')

const imsfaweb = appUtils.imsfaweb
const imsFaCore = imsfaweb.imsFaCore
const Constant = imsFaCore.Constant
const messageBox = imsfaweb.messageBox
const Utils = imsFaCore.Utils
const Params = imsFaCore.Params
const router = appUtils.getRouter()


// 解析URL参数为对象
const getUrlParams = function (url = window.location.href) {
  const queryString = url.split('?')[1];
  if (!queryString) return {};

  return queryString.split('&').reduce((params, pair) => {
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    return params;
  }, {});
}
const submitToggle = function () {
  // 加密
  const host = Utils.encrypt(location.port) //浏览器域名

  // Params 工具类处理数据
  const _params = getUrlParams()

  const params = new Params()
  params.setReckonValue(_params)

  // 发起ajax请求
  server.excuteParams('/system/sso/login', params, { useToken: false, useMenuCode: false }).then(async res => {
    if (res) {

      const errorMsg = res.getValue('error_msg')
      const redirect_uri = res.getValue('redirect_uri')
      if (errorMsg) {
        messageBox.alert({
          message: errorMsg,
          onCloseClick: function () {
            appUtils._removeSessionItem()
            appUtils.triggerStoreEvent('router', 'resetCacheRouter')
            appUtils.triggerStoreEvent('router', 'resetCurrentRoute')
            appUtils.triggerStoreEvent('user', 'resetUser')
            nextTick(() => {
              if (redirect_uri) {
                setTimeout(() => {
                  window.location.assign(redirect_uri)
                })
              } else {
                // 路由跳转
                router.push({
                  path: '/login'
                })
              }
            })
          }
        })

      } else {
        // 操作用户cookie
        const host = Utils.encrypt(location.port) //浏览器域名
        // 存住用户与密码
        sessionStorage.setItem('wU:' + host, Utils.encrypt(res.getValue('user_code')))

        sessionStorage.setItem('user', JSON.stringify(res))
        sessionStorage.setItem('access_token', res.getString('access_token'))
        sessionStorage.setItem('client_name', res.getString('client_name'))
        sessionStorage.setItem('refresh_token', res.getString('refresh_token'))
        sessionStorage.setItem('locale_code', res.getString('locale_code'))
        sessionStorage.setItem('is_login_web', '1')
        sessionStorage.setItem('current_login_time', new Date().getTime())
        //存到缓存
        appUtils.triggerStoreEvent('user', 'refreshUser', res)
        if (redirect_uri) {
          const pushRoute = {
            name: redirect_uri.substring(1, redirect_uri.length),
            path: redirect_uri,
          }
          sessionStorage.setItem('currentRoute', JSON.stringify(pushRoute))
          appUtils.triggerStoreEvent('router', 'setCurrentRoute', pushRoute)
        }

        messageHelper.localeCode = res.getString('locale_code')

        nextTick(() => {
          setTimeout(() => {
            router.push({
              path: '/home'
            })
          }, 200)
        })

      }
    }
  }).catch((err) => {
    appUtils._removesessionItem()
    appUtils.triggerstoreEvent('router', 'resetCacheRouter')
    appUtils.triggerstoreEvent('router', 'resetCurrentRoute')
    appUtils.triggerstoreEvent('user', 'resetUser')
    nextTick(() => {
      setTimeout(() => {
        router.push({
          path: '/login'
        })
      }, 200)
    })
  })

}

// 生命周期函数
onBeforeMount(() => {
})
onMounted(() => {
  sessionStorage.setItem(Constant.Def.TIME_ZONE, Intl.DateTimeFormat().resolvedOptions().timeZone)
  submitToggle()
})
</script>

<style lang="scss" scoped></style>