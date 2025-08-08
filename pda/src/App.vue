<!--
 * @Author: 夏丹新
 * @Date: 2022-06-09 20:23:34
 * @LastEditTime: 2023-04-01 15:31:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \imsfapdae:\UserData\Dev28\imsv6\source\trunk\app\frontend\imspda\src\App.vue
-->
<template>
    <Suspense>
        <div style="height: 100%">
            <div 
                v-if="isShowExpireTip()"
                class="pg-password-expire"
            >
                <div class="pg-expire-message">{{ getExpireMessage() }}</div>
                <PgIcon class="pg-close-icon" name="cross" @click="onCloseExpireTipClick"></PgIcon>
            </div>
            <component :is="$route.meta.layout">
                <div class="content">
                    <router-view />
                </div>
            </component>
        </div>
    </Suspense>
</template>
<script setup>
import { watch, onMounted, getCurrentInstance, onBeforeMount, onBeforeUnmount, defineExpose, ref, computed } from 'vue'
import themeMode from '@/style/theme/index'

const vm = getCurrentInstance()
const appUtils = vm.appContext.config.globalProperties.$appUtils
const router = appUtils.getRouter()
const route = router.currentRoute.value
const userInfo = computed(() => {
    const user = appUtils.getStoreInfo('user', 'user')
    return user?.getUserValue()
})
// 密码过期主开关
const isShowExpireTipFlag = ref(true)
/****************** 方法 ***************** */
/**
 * 显示密码预过期提示
 */
const isShowExpireTip = function() {
    return isShowExpireTipFlag.value && userInfo.value && userInfo.value.result_message
}
/**
 * 获取密码过期信息
 */
const getExpireMessage = function() {
    return userInfo.value?.result_message
}
/**
 * 历史记录改变事件
 */
const popstateFn = function (e) {
    // 禁用浏览器返回
    let path = '/'
    if(appUtils.isLogin()){
        if (e.state && e.state.forward) {
            path =  e.state.forward
        }else {
            path = window.location.hash.substring(1, window.location.hash.length)
        }
    }else {
        path = '/login'
    }
    router.push(path)
    // 替换历史记录
    let hash = '#' + path
    history.replaceState(null, null, hash)
}
/**
 * 浏览器刷新、关闭前置事件
 */
const beforeUnloadFn = function(e) {
    e.preventDefault()
    sessionStorage.setItem(appUtils.PagesKey.Pages, "{}")
}
/**
 * 关闭密码预过期提示
 */
const onCloseExpireTipClick = function() {
    isShowExpireTipFlag.value = false
}
/******************** 生命周期 *************** */
onBeforeMount(() => {
    if (appUtils.isUseIndexedDb()) {
        // 初始化indexDB
        appUtils.initIDBConfig()
    }
    // 切换组件库样式
    const styleLink = document.querySelector('link[data-style=true]')
    if (styleLink) {
        styleLink.remove()
    }
    const isProduction = process.env.NODE_ENV === 'production'
    let bserUrl = isProduction ? JSON.parse(process.env.VUE_APP_CONFIG).baseDir + '/pda' : '.'
    const themeMode = localStorage.getItem('themeMode')
    const theme = themeMode && JSON.parse(themeMode)['mode'] === 'blueMode' ? 'blue' : 'orange'
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('data-style', true)
    link.setAttribute('href', `${bserUrl}/devstyle/dx.generic.custom-${theme}.css`)
    document.body.appendChild(link)
})
onMounted(() => {
    const { setImsFaTheme, getThemeStorage } = themeMode
    const mode = getThemeStorage() || { mode: 'defaultMode' }
    setImsFaTheme(mode)
    window.addEventListener('popstate', popstateFn, { passive: true })
    window.addEventListener('beforeunload', beforeUnloadFn, { passive: true })
    // 自定义浏览器图标
    var link = document.createElement('link')
    link.rel = 'icon'
    if(window.selfServiceConfig && window.selfServiceConfig.browserLogo){
        link.href = window.selfServiceConfig.browserLogo
    }else {
        link.href = './favicon.ico'
    }
    document.head.appendChild(link)
})
onBeforeUnmount(() => {
    window.removeEventListener('popstate', popstateFn)
    window.removeEventListener('beforeunload', beforeUnloadFn)
})

/********************** 监听 ***************** */
watch(
    () => route.path,
    () => {
        const isLogin = sessionStorage.getItem(appUtils.StorageKey.IS_LOGIN_PDA)
        //如果为第三方入口进来（即不为登录状态且带有token），保存token，然后跳转
        if (isLogin !== 1) {
            if (route.query.access_token) {
                sessionStorage.setItem(appUtils.StorageKey.ACCESS_TOKEN, route.query.access_token)
                router.push(route.path)
            } else if (route.path === '/login') {
                router.push('/login')
            }
        }
    },
    {
        immediate: true,
        deep: true
    }
)

/********************** 导出 ***************** */
defineExpose({
    // receivedMessage
})
</script>
<style scoped lang="scss">
    .pg-password-expire {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        text-align: center;
        background-color: #dc635fe6;
        color: #fff;
        padding: 6px 12px;
        font-size: 12px;
        box-shadow: 0px 5px 5px rgb(0 0 0 / 20%);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        .pg-expire-message {
            flex: 1;
        }
        .pg-close-icon {
            cursor: pointer;
        }
    }
</style>
