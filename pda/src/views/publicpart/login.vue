<!--
 * @Author: 夏丹新
 * @Date: 2022-07-30 14:46:31
 * @LastEditTime: 2023-04-04 13:59:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \imsfapdae:\UserData\Dev28\imsv6\source\trunk\app\frontend\imspda\src\views\publicpart\Login.vue
-->
<template>
    <div class="pg-login-box">
        <div class="pg-login-form">
            <div>
                <div class="pg-product-logo-box">
                    <img :src="pangusTipLogo"/>
                </div>
                <div class="platform-name">{{ i18nLabelObj.platform_name_label }}</div>
            </div>

            <PgForm @submit="onFormSubmit" class="pg-form page-simple-form">
                <PgTextBox
                    class="pg-input-box pg-vertical-layout"
                    v-model="userCodeObj.value"
                    v-bind="userCodeObj"
                    clearable
                ></PgTextBox>
                <PgTextBox
                    class="pg-input-box pg-vertical-layout"
                    v-model="passwordObj.value"
                    v-bind="passwordObj"
                    clearable
                ></PgTextBox>
                <PgSelectBox
                    class="pg-input-box pg-vertical-layout"
                    v-model="languageObj.value"
                    v-bind="languageObj"
                ></PgSelectBox>
                <PgTextBox name="checkboxResult" class="pg-checkbox-parent" :border="false">
                    <template #input>
                        <PgCheckboxGroup
                            v-model="reactiveData.checkboxResult"
                            direction="horizontal"
                            class="pg-checkbox-group"
                        >
                            <PgCheckbox
                                name="user_code"
                                shape="square"
                                icon-size="14"
                            >{{ i18nLabelObj.remember_user_name_label }}</PgCheckbox>
                            <PgCheckbox
                                name="password"
                                shape="square"
                                icon-size="14"
                            >{{ i18nLabelObj.remember_password_label }}</PgCheckbox>
                        </PgCheckboxGroup>
                    </template>
                </PgTextBox>
                <div class="pg-btn-box">
                    <PgButton
                        type="primary"
                        native-type="submit"
                        block
                    >{{ i18nLabelObj.login_label }}</PgButton>
                </div>
            </PgForm>
        </div>
        <div class="pg-copyright">
            {{ i18nLabelObj.copyright }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    inheritAttrs: false
}
</script>
<script setup>
import { onBeforeMount, onMounted, getCurrentInstance, defineEmits, reactive, watch, computed } from 'vue'
const emits = defineEmits(['beforeMount', 'mounted'])

const vm = getCurrentInstance()
const appUtils = vm.appContext.config.globalProperties.$appUtils
const server = vm.appContext.config.globalProperties.$server
const imsFaCore = appUtils.imsFaPda.imsFaCore
const Params = imsFaCore.Params
const CoreColumnType = imsFaCore.CoreColumnType
const Utils = imsFaCore.Utils
const Constant = imsFaCore.Constant
const messageHelper = appUtils.getStoreInfo('helper', 'messageHelper')
const router = appUtils.getRouter()
let textboxBorder = false
/*********** 响应式数据 ********* */
// 自定义logo
const pangusTipLogo = computed(() => {
  if (window.selfServiceConfig && window.selfServiceConfig.homeLogo) {
    return window.selfServiceConfig.homeLogo
  } else {
    return appUtils.requireFile('img/ims.png')
  }
})
// 背景图片
const backgroundImg = computed(() => {
  if ((window.selfServiceConfig && window.selfServiceConfig.homeBg)) {
    return `url(${window.selfServiceConfig.homeBg}) no-repeat center top`
  }
  return `url(${require("@/assets/img/pangus-bg.jpg")}) no-repeat center top`
})

const i18nLabelObj = reactive({})
const initI18nLabelFn = function () {
    const langObj = {
        company_short_name_label: messageHelper.get('common.ui.company.short.name'),
        platform_name_label: messageHelper.get('common.ui.platform.name'),
        login_label: messageHelper.get('common.ui.button.login'),
        remember_user_name_label: messageHelper.get('common.ui.remember.user'),
        remember_password_label: messageHelper.get('common.ui.remember.pass'),
        user_code_label: messageHelper.get('common.ui.user'),
        password_label: messageHelper.get('common.ui.pass'),
        language_label: messageHelper.get('common.ui.language'),
        can_not_empty_label: messageHelper.get('common.ui.not.empty'),
        copyright: messageHelper.getAsFormat('common.ui.about.copyright', appUtils.year_version),
        ok: messageHelper.get('common.ui.button.ok'),
        cancel: messageHelper.get('common.ui.button.cancel'),
    }
    userCodeObj.label = langObj.user_code_label
    passwordObj.label = langObj.password_label
    languageObj.label = langObj.language_label
    languageObj.selectOption.confirmButtonText = langObj.ok
    languageObj.selectOption.cancelButtonText = langObj.cancel
    return langObj
}
// 校验规则
const validateRules = reactive([{ required: true, message: i18nLabelObj.can_not_empty_label }])
// 用户编码
const userCodeObj = reactive({
    value: '',
    validateRules,
    name: 'user_code',
    labelWidth: '4em',
    label: null,
    rules: validateRules,
    border: textboxBorder
})
// 密码
const passwordObj = reactive({
    value: '',
    validateRules,
    name: 'password',
    type: 'password',
    labelWidth: '4em',
    autocomplete: 'off',
    label: null,
    rules: validateRules,
    border: textboxBorder,
    rightIcon: 'eye-o',
    onClickRightIcon: function() {
        if(passwordObj['type'] === 'password'){
            passwordObj['type'] = 'text'
        }else {
            passwordObj['type'] = 'password'
        }
    }
})
// 语言
const languageObj = reactive({
    value: '',
    name: 'locale_code',
    labelWidth: '4em',
    inputAlign: 'left',
    rightIcon: 'arrow',
    label: null,
    border: textboxBorder,
    rules: validateRules,
    selectOption: {
        confirmButtonText: messageHelper.get('common.ui.button.ok'),
        cancelButtonText: messageHelper.get('common.ui.button.cancel'),
        columns: [],
        columnsFieldNames: { text: 'text', value: 'value' },
        onConfirm: function (value) {
            languageObj.value = value.selectedValues[0]
            saveLocalCodeStorage(value.selectedValues[0])
        }
    }
})
// 响应式数据
const reactiveData = reactive({
    checkboxResult: ['user_code', 'password']
})

/************* 方法 *********** */
/**
 * @description:设置cookie操作
 * @param {*}
 * @return {*}
 */
const remberFn = function (name, value, expr = 30) {
    // 设置cookie 30天过期
    Utils.setCookie(name, value, expr)
}
/**
 * 获取可用语言
 */
const getAvailableLocaleReq = function () {
    const params = new Params()
    server.excuteDataTable('/system/getAvailableLocale', params, { isLoading: false, useToken: false }).then((res) => {
        if(res){
            if (res.ext) {
                const imsMessageDataTable = res.ext.value['ims_message']
                if(imsMessageDataTable && imsMessageDataTable.rows){
                    const messageObj = {}
                    imsMessageDataTable.rows.forEach(item => {
                        if (messageObj[item.locale_code]) {
                            messageObj[item.locale_code][item.msg_key] = item
                        } else {
                            messageObj[item.locale_code] = {}
                            messageObj[item.locale_code][item.msg_key] = item
                        }
                    })
                    messageHelper.updateMessage(messageObj)
                }
            }
            const values = []
            for (let i = 0; i < res.rows.length; i++) {
                const _row = res.rows[i]
                const value = {
                    text: _row.locale_name,
                    name: _row.locale_code,
                    value: _row.locale_code
                }
                values.push(value)
            }
            languageObj.selectOption.columns.length = 0
            if (values.length > 0) {
                languageObj.selectOption.columns.push(...values)
                // 设置本地语言
                initLocaleLanguage()
            }
            Object.assign(i18nLabelObj, initI18nLabelFn())
        }
    })
}
/**
 * 保存本地语言
 */
const saveLocalCodeStorage = function(value) {
    !value && (value = sessionStorage.getItem(appUtils.StorageKey.LOCALE_CODE_PDA))
    if(!value)return
    sessionStorage.setItem(appUtils.StorageKey.LOCALE_CODE_PDA, value)
    sessionStorage.setItem(appUtils.StorageKey.LOCALE_CODE, value)
}
/**
 * 设置本地语言：
 * 1.优先级最高：已保存的语言；
 * 2.浏览器本地语言；
 * 3.判断是否已启用，是则选中并保存；
 * 3.不是则显示英文。
 * 4.如果语言已启用，则语言输入框要选中。
 */
const initLocaleLanguage = function() {
    let targetLang = sessionStorage.getItem(appUtils.StorageKey.LOCALE_CODE_PDA)
    !targetLang && (targetLang = navigator.language || navigator.userLanguage)
    if (targetLang) {
        targetLang = targetLang.replace('-', '_')
        // 判断是否已启用，是则选中
        const index = languageObj.selectOption.columns.findIndex(item => item['name'] === targetLang)
        if (index === -1) {
            // 不是则显示英文
            targetLang = CoreColumnType.LocaleCode.EN_US
        }
    }
    // 判断是否已启用，是则选中
    const tIndex = languageObj.selectOption.columns.findIndex(item => item['name'] === targetLang)
    tIndex !== -1 && (languageObj.value = targetLang)
    // 保存本地语言
    sessionStorage.setItem(appUtils.StorageKey.LOCALE_CODE, targetLang)
    sessionStorage.setItem(appUtils.StorageKey.LOCALE_CODE_PDA, targetLang)
}
/************* 事件 *********** */
/**
 * 确认事件
 */
const confirmBack = function () {
    appUtils.setActiveEleFocus()
}

/**
 * 提交表单
 * @param {*} formData
 */
const onFormSubmit = function (formData) {
    appUtils.setActiveEleBlur()

    // V6.4.0新增
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    sessionStorage.setItem(appUtils.StorageKey.TIME_ZONE, localTimeZone)

    const params = new Params()
    const password = Utils.String2Base64UTF8(formData.password)
    params
        .setString('user_code', formData.user_code)
        .setString('pass', password)
        .setString('locale_code', languageObj.value)
        .setString('login', Constant.BooleanConstants.TRUE)
        .setString('platform_version', appUtils.version)
    // 发起ajax请求
    server.excuteParams('/system/authentication', params, { isLoading: false, confirmBack, useToken: false }).then(async (res) => {
        // 浏览器域名
        const pUKey = appUtils.getStorageKeyWithHost(appUtils.StorageKey.PDA_USER_CODE)
        const pPKey = appUtils.getStorageKeyWithHost(appUtils.StorageKey.PDA_PASSWORD)
        const rPUKey = appUtils.getStorageKeyWithHost(appUtils.StorageKey.REMEMBER_PDA_USER_CODE)
        const rPPKey = appUtils.getStorageKeyWithHost(appUtils.StorageKey.REMEMBER_PDA_PASSWORD)
        // 加密
        const userCode = Utils.encrypt(formData.user_code)
        const password = Utils.encrypt(formData.password)
        // 存储令牌
        sessionStorage.setItem(appUtils.StorageKey.ACCESS_TOKEN, res.getString('access_token'))
        sessionStorage.setItem(appUtils.StorageKey.REFRESH_TOKEN, res.getString('refresh_token'))
        saveLocalCodeStorage(res.getString('locale_code'))
        sessionStorage.setItem(appUtils.StorageKey.IS_LOGIN_PDA, '1')
        sessionStorage.setItem(appUtils.StorageKey.USER, JSON.stringify(res))
        sessionStorage.setItem(appUtils.StorageKey.CLIENT_NAME, res.getString('client_name'))
        // 存储用户名、密码、记住用户、记住密码
        sessionStorage.setItem(pUKey, userCode)
        sessionStorage.setItem(pPKey, password)
        remberFn(pUKey, userCode)
        remberFn(pPKey, password)
        remberFn(rPUKey, reactiveData.checkboxResult.includes('user_code') ? '1' : '0') // 记住记住用户标识
        remberFn(rPPKey, reactiveData.checkboxResult.includes('password') ? '1' : '0') // 记住记住用户标识
        // 存到缓存
        appUtils.triggerStoreEvent('user', 'refreshUser', res)
        // 路由跳转
        router.push({
            path: '/home'
        })
    })
}

/**
 * 初始化页面
 */
const initPage = function () {
    // 移除WEB端登录凭证
    sessionStorage.removeItem('is_login_web')
    // 回显用户名、密码
    const rPUKey = appUtils.getStorageKeyWithHost(appUtils.StorageKey.REMEMBER_PDA_USER_CODE)
    const rPPKey = appUtils.getStorageKeyWithHost(appUtils.StorageKey.REMEMBER_PDA_PASSWORD)
    const isRemberUser = Utils.getCookie(rPUKey)
    const isRemberPaw = Utils.getCookie(rPPKey)
    if (isRemberUser === '1') {
        const pUkey = appUtils.getStorageKeyWithHost(appUtils.StorageKey.PDA_USER_CODE)
        const userCode = Utils.decrypt(Utils.getCookie(pUkey))
        userCodeObj.value = userCode
        if (!reactiveData.checkboxResult.includes('user_code')) {
            reactiveData.checkboxResult.push('user_code')
        }
    } else {
        userCodeObj.value = null
        const index = reactiveData.checkboxResult.findIndex(item => item === 'user_code')
        if (index !== -1) {
            reactiveData.checkboxResult.splice(index, 1)
        }
    }
    if (isRemberPaw === '1') {
        const pPkey = appUtils.getStorageKeyWithHost(appUtils.StorageKey.PDA_PASSWORD)
        const password = Utils.decrypt(Utils.getCookie(pPkey))
        passwordObj.value = password
        if (!reactiveData.checkboxResult.includes('password')) {
            reactiveData.checkboxResult.push('password')
        }
    } else {
        passwordObj.value = null
        const index = reactiveData.checkboxResult.findIndex(item => item === 'password')
        if (index !== -1) {
            reactiveData.checkboxResult.splice(index, 1)
        }
    }
}

onBeforeMount(() => {
    emits('beforeMount', { instance: vm })
    appUtils.clearPdaStorage()
    appUtils.updatePagesHistory({})
    // 获取可用语言
    getAvailableLocaleReq()
})

onMounted(() => {
    emits('mounted', { instance: vm })
    // 初始化页面
    initPage()
    if (appUtils.isUseIndexedDb()) {
        appUtils.initIDBConfig()
    }
})
/************* 监听 *********** */
watch(
    () => languageObj.value,
    (newVal) => {
        saveLocalCodeStorage(newVal)
        messageHelper.localeCode = newVal
        Object.assign(i18nLabelObj, initI18nLabelFn())
        validateRules[0].message = i18nLabelObj.can_not_empty_label
    },
    {
        immediate: true,
        deep: true
    }
)
</script>
<style scoped lang="scss">
.pg-login-box {
    height: calc(100vh - 40px);
    padding: 20px;
    background: v-bind("backgroundImg");
    background-size: cover;
    overflow: hidden;
    display: flex;
    align-items: center;
    
    .pg-login-form {
        width: 100%;
        min-height: fit-content;
        max-height: 90%;
        overflow: hidden;
        overflow-y: auto;
        margin-top: 0;
        padding-top: 20px;
        background-color: #fff;
        border-radius: 5px;
        .pg-product-logo-box {
            text-align: center;
            height: 55px;
            overflow: hidden;
            & > img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .company-short-name,
        .platform-name {
            text-align: center;
            color: #333;
            font-weight: bold;
            margin-top: 15px;
            font-size: 20px;
        }
        .pg-form {
            width: 100%;
            margin-top: 15px;
        }
        .pg-checkbox-parent {
            padding: 0 var(--van-cell-horizontal-padding);
            :deep(.van-field__body) {
                border: none;
            }
            .van-field__control {
                justify-content: center;
            }
        }
        .pg-checkbox-group {
            justify-content: center;
            margin-top: 25px;
        }
        .pg-btn-box {
            padding: 30px 16px;
        }
    }

    .pg-copyright {
        position: fixed;
        bottom: 0;
        text-align: center;
        color: white;
        left: 0;
        right: 0;
        padding: 3px;
        font-size: 12px;
        background-color: rgba(0, 0, 0, 0.3);
    }

    // 将左右布局改成上下布局 start
    :deep(.pg-vertical-layout) {
        flex-direction: column;
        padding: 5px var(--van-cell-horizontal-padding);
        // deep嵌套无效，要独立放置，放到外面
        // :deep(.van-cell__value) {
        //     padding: 2px 5px;
        //     border: 1px solid #666;
        // }
    }
    :deep(.van-field__label) {
        width: 100%;
    }
    // 将左右布局改成上下布局 end
}
</style>
