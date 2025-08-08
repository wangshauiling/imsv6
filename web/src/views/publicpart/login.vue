<!--
 * @Author: 庄集贵
 * @Date: 2022-01-20 15:56:51
 * @LastEditTime: 2023-04-03 09:28:14
 * @LastEditors: Please set LastEditors
 * @Description: 登录页面
 * @FilePath: \myproject\testapp\src\views\Home.vue
-->
<template>
  <div id="login">
    <!-- <div class="logo" v-if="!isCustomBackgroundImg">
      <img :src="pangusLogo" alt="pangusLogo" />
    </div>-->
    <!-- <div class="concact" v-if="!isCustomBackgroundImg">
      <div class="concact-phone">
        <span class="pg-icon pg-icon-phone3 concact-phone-font"></span>
        <span>400-880-2050</span>
      </div>
      <div class="concact-email">
        <span class="pg-icon pg-icon-email1 concact-email-font"></span>
        <span>pangus@pangus-ims.com</span>
      </div>
    </div>-->
    <div class="form">
      <div class="form-name form-tip-logo">
        <img :src="pangusTipLogo" alt="pangusTipLogo" />
      </div>
      <!-- <div class="form-name form-tip">{{ languageVariable.company_short_name }}</div> -->
      <div class="form-tittle form-tip">{{ languageVariable.platform_name }}</div>
      <!-- 表单 -->
      <form action="#" @submit="submitToggle">
        <DxForm class="form-body" :form-data="formData" styling-mode="underlined" ref="loginForm">
          <dx-item v-bind="configData['user_code']"></dx-item>
          <dx-item v-bind="configData['pass']"></dx-item>
          <dx-item v-bind="configData['locale_code']"></dx-item>
          <dx-item>
            <div class="forget">
              <div class="forget-pwd" @click="forgetPass">{{ languageVariable.forget_pass }}</div>
              <div class="remember-people">
                <pg-check-box
                  :text="languageVariable.remember_user"
                  v-model:value="remberUserCode"
                  class="remember-check"
                ></pg-check-box>
                <pg-check-box
                  :text="languageVariable.remember_pass"
                  v-model:value="remberPass"
                  class="remember-check"
                ></pg-check-box>
              </div>
            </div>
          </dx-item>
          <dx-item>
            <DxButton v-bind="buttonOptionsObj" :disabled="visible">
              <DxLoadIndicator
                :visible="visible"
                width="18px"
                height="18px"
                class="button-indicator"
              />
              <span class="button-indicator">{{ buttonOptionsObj.text }}</span>
            </DxButton>
          </dx-item>
        </DxForm>
      </form>
    </div>
    <div class="footer">
      <div class="footer-concact">
        <span>{{ companyWebsite }}</span>
        <span class="footer-concact-phone">{{ companyPhone }}</span>
      </div>
      <div class="footer-version">{{ copyright }}</div>
      <!-- 备案号 -->
      <div class="main-icps">
        <a
          v-for="(icpItem,icpIndex) in icps"
          :href="icpItem.href"
          :key="icpIndex"
          target="_blank"
          class="main-icp-item"
          :title="icpItem.text"
        >{{ icpItem.text }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
}
</script>
<script setup>
import { DxForm, DxItem } from 'devextreme-vue/form'
import { reactive, ref, getCurrentInstance, onBeforeMount, onMounted, watch, computed, nextTick } from 'vue'
import { DxLoadIndicator } from 'devextreme-vue/load-indicator'
import { DxButton } from 'devextreme-vue/button'
// import { DxTextBox,  } from 'devextreme-vue/button'
const vm = getCurrentInstance()
const server = vm.appContext.config.globalProperties.$server
const appUtils = vm.appContext.config.globalProperties.$appUtils
// const pangusLogo = appUtils.requireFile('img/pangus-logo.png')
const pangusTipLogo = computed(() => {
  if (window.selfServiceConfig && window.selfServiceConfig.homeLogo) {
    return window.selfServiceConfig.homeLogo
  } else {
    return appUtils.requireFile('img/ims.png')
  }
})
// 备案号
const icps = computed(() => {
  if (window.selfServiceConfig && window.selfServiceConfig.icps) {
    return window.selfServiceConfig.icps
  } else {
    return null
  }
})
const imsfaweb = appUtils.imsfaweb
const imsFaCore = imsfaweb.imsFaCore
const Constant = imsFaCore.Constant
const Service = imsFaCore.Service
const Utils = imsFaCore.Utils
const Params = imsFaCore.Params
const messageBox = imsfaweb.messageBox
// const MessageHelper = imsFaCore.MessageHelper
const messageHelper = appUtils.getStoreInfo('helper', 'messageHelper')
const router = appUtils.getRouter()
// 获取vue 实例
// 初始化语言包变量
const languageVariable = reactive({})
const initLanguageVariable = function () {
  const languageObj = {}
  languageObj.company_short_name = messageHelper.get('common.ui.company.short.name')
  languageObj.platform_name = messageHelper.get('common.ui.platform.name')
  languageObj.forget_pass = messageHelper.get('common.ui.forget.pass')
  languageObj.remember_user = messageHelper.get('common.ui.remember.user')
  languageObj.remember_pass = messageHelper.get('common.ui.remember.pass')
  languageObj.user = messageHelper.get('common.ui.user')
  languageObj.pass = messageHelper.get('common.ui.pass')
  languageObj.is_empty = messageHelper.get('common.ui.not.empty')
  languageObj.language = messageHelper.get('common.ui.language')
  languageObj.button_login = messageHelper.get('common.ui.button.login')
  return languageObj
}
// checkBox 标识
const remberUserCode = ref(true)
const remberPass = ref(true)
// 表单数据
const formData = reactive({
  user_code: '',
  pass: '',
  locale_code: ''
})
// 表单配置数据
const configData = reactive({})
// 初始化表格配置
const initConfigData = function () {
  return {
    user_code: {
      label: {
        text: languageVariable.user,
        showColon: false
      },
      validationRules: [
        {
          type: 'required',
          message: languageVariable.is_empty
        }
      ],
      dataField: 'user_code'
    },
    pass: {
      label: {
        text: languageVariable.pass,
        showColon: false
      },
      validationRules: [
        {
          type: 'required',
          message: languageVariable.is_empty
        }
      ],
      dataField: 'pass',
      editorOptions: {
        mode: 'password',
        buttons: [{
          location: 'after',
          name: 'password',
          options: {
            icon: 'pg-icon pg-icon-xianshimima',
            stylingMode: 'text',
            onClick: function () {
              let mode = (configData.pass.editorOptions.mode === 'password') ? 'text' : 'password'
              configData.pass.editorOptions = Object.assign({}, configData.pass.editorOptions, { mode })
            }
          }
        }]
      },
    },
    locale_code: {
      label: {
        text: languageVariable.language,
        showColon: false
      },
      validationRules: [
        {
          type: 'required',
          message: languageVariable.is_empty
        }
      ],
      editorType: "dxSelectBox",
      editorOptions: {
      },
      dataField: 'locale_code'
    }
  }
}
// 按钮数据
const buttonOptionsObj = reactive(
  {
    text: languageVariable.button_login,
    type: 'default',
    useSubmitBehavior: true,
    width: '100%',
    height: 45,
    elementAttr: {
      class: 'pangus-button'
    }
  }
)
// 监听locale_code
watch(() => formData.locale_code, (value) => {
  if (appUtils.isNotNull(value)) {
    sessionStorage.setItem('locale_code', value)
  }
  if (appUtils.isNotNull(value)) {
    const host = Utils.encrypt(location.port) //浏览器域名
  }

  messageHelper.localeCode = value
  Object.assign(languageVariable, initLanguageVariable())
  Object.assign(configData, initConfigData())
  Object.assign(buttonOptionsObj, { text: languageVariable.button_login })
}, {
  immediate: true
})

/**
 * @description:设置cookie操作
 * @param {*}
 * @return {*}
 */
const remberFn = function (name, value, expr = 30) {
  // 设置cookie 30天过期
  Utils.setCookie(name, value, expr)
}
// 忘记密码
const forgetPass = function () {
  messageBox.alert({
    message: messageHelper.get('common.ui.please.call.admin')
  })
}
/**
 * @description: 移除cookie操作
 * @param {*}
 * @return {*}
 */
// const removeFn = function (name) {
//   if (Utils.checkCookie(name)) {
//     Utils.removeCookie(name)
//   }
// }
/**
 * @description: 触发表单
 * @param {*}
 * @return {*}
 */
const visible = ref(false)
const loginForm = ref(null)
const submitToggle = function (e) {
  e.preventDefault()
  const loginResult = loginForm.value.instance.validate()
  if (loginResult.isValid) {
    visible.value = true
    // 加密
    const userCode = Utils.encrypt(formData.user_code)
    const pass = Utils.encrypt(formData.pass)
    // 操作用户cookie
    const host = Utils.encrypt(location.port) //浏览器域名
    remberFn('wU:' + host, userCode) // 默默存储用户的信息
    // 操作密码cookie
    remberFn('wP:' + host, pass) // 默默存储用户的信息

    remberFn('rWU:' + host, remberUserCode.value ? '1' : '0') // 记住记住用户标识
    remberFn('rWP:' + host, remberPass.value ? '1' : '0') // 记住记住用户标识
    // Params 工具类处理数据
    const params = new Params()
    const pwd = Utils.String2Base64UTF8(formData.pass)
    params.setString('user_code', formData.user_code).setString('pass', pwd).setString('locale_code', formData.locale_code).setString('login', imsFaCore.Constant.BooleanConstants.TRUE).setString('platform_version', appUtils.version)

    // 发起ajax请求
    server.excuteParams('/system/authentication', params, { isLoading: false, useToken: false, useMenuCode: false }).then(res => {
      if (res) {
        // 修正国际化
        server.loadingInstance = Service.GETLOADING()

        visible.value = false
        // 存住用户与密码
        sessionStorage.setItem('wU:' + host, userCode)
        sessionStorage.setItem('wP:' + host, pass)
        // 个人信息
        sessionStorage.setItem('user', JSON.stringify(res))
        sessionStorage.setItem('access_token', res.getString('access_token'))
        sessionStorage.setItem('client_name', res.getString('client_name'))
        sessionStorage.setItem('refresh_token', res.getString('refresh_token'))
        sessionStorage.setItem('locale_code', res.getString('locale_code'))
        sessionStorage.setItem('is_login_web', '1')
        sessionStorage.setItem('current_login_time', new Date().getTime())
        //存到缓存
        appUtils.triggerStoreEvent('user', 'refreshUser', res)
        // 路由跳转
        router.push({
          path: '/home'
        })
      }
    }).catch((err) => {
      console.log(err)
      visible.value = false
    })
  }
}

const backgroundImg = computed(() => {
  if ((window.selfServiceConfig && window.selfServiceConfig.homeBg)) {
    return `url( ${window.selfServiceConfig.homeBg}) no-repeat center top`
  }
  return `url( ${appUtils.requireFile('img/pangus-bg.png')}) no-repeat center top`
})

// const isCustomBackgroundImg = computed(() => {
//   return (window.selfServiceConfig && window.selfServiceConfig.homeBg)
// })
// 网址
const companyWebsite = computed(() => {
  if (window.selfServiceConfig && window.selfServiceConfig.companyWebsite) {
    return window.selfServiceConfig.companyWebsite
  } else {
    return 'pangus@pangus-ims.com'
  }
})
// 电话
const companyPhone = computed(() => {
  if (window.selfServiceConfig && window.selfServiceConfig.companyPhone) {
    return window.selfServiceConfig.companyPhone
  } else {
    return '400-880-2050'
  }
})
// 版权
const copyright = computed(() => {
  if (window.selfServiceConfig && window.selfServiceConfig.copyright) {
    return window.selfServiceConfig.copyright
  } else {
    return messageHelper.getAsFormat('common.ui.about.copyright', appUtils.year_version)
  }
})


// 生命周期函数
onBeforeMount(() => {
  const host = Utils.encrypt(location.port) //浏览器域名
  const userCode = Utils.decrypt(Utils.getCookie('wU:' + host))
  const pass = Utils.decrypt(Utils.getCookie('wP:' + host))

  const isRemberU = Utils.getCookie('rWU:' + host)
  const isRemberP = Utils.getCookie('rWP:' + host)
  remberUserCode.value = isRemberU === '1'
  remberPass.value = isRemberP === '1'
  formData.user_code = remberUserCode.value ? userCode : null
  formData.pass = remberPass.value ? pass : null

  // 获取可用语言
  const params = new Params()
  server.excuteDataTable('/system/getAvailableLocale', params, { isLoading: false, useToken: false, useMenuCode: false }).then(res => {
    if (res) {
      const ext = res.getExt()
      if (ext) {
        const imsMessageDataTable = ext.getValue('ims_message')
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

        Object.assign(languageVariable, initLanguageVariable())
        Object.assign(configData, initConfigData())
        Object.assign(buttonOptionsObj, { text: languageVariable.button_login })
      }
      // 给配置赋值
      const _rows = res.getRows()
      configData.locale_code.editorOptions = {
        dataSource: _rows,
        displayValue: 'locale_name',
        displayExpr: 'locale_name',
        valueExpr: 'locale_code'
      }

      nextTick(() => {
        // rows 长度
        if (_rows && _rows.length > 0) {
          const wLlocaleCode = sessionStorage.getItem('locale_code')
          if (wLlocaleCode) {
            const _index = _rows.findIndex(item => item.locale_code === wLlocaleCode)
            if (_index !== -1) {
              formData.locale_code = wLlocaleCode
              messageHelper.localeCode = wLlocaleCode
              Object.assign(languageVariable, initLanguageVariable())
              Object.assign(configData, initConfigData())
              Object.assign(buttonOptionsObj, { text: languageVariable.button_login })

              return false
            }
          }
          // 浏览器语言
          if (navigator.language) {
            if (navigator.language === 'zh-CN') {
              const naviIndex = _rows.findIndex(item => item.locale_code === 'zh_CN')
              if (naviIndex !== -1) {
                formData.locale_code = 'zh_CN'
                messageHelper.localeCode = 'zh_CN'
                Object.assign(languageVariable, initLanguageVariable())
                Object.assign(configData, initConfigData())
                Object.assign(buttonOptionsObj, { text: languageVariable.button_login })
              } else {
                const naviIndex_e = _rows.findIndex(item => item.locale_code === 'en_US')
                if (naviIndex_e !== -1) {
                  formData.locale_code = 'en_US'
                } else {
                  formData.locale_code = null
                }
                messageHelper.localeCode = 'en_US'
                Object.assign(languageVariable, initLanguageVariable())
                Object.assign(configData, initConfigData())
                Object.assign(buttonOptionsObj, { text: languageVariable.button_login })
              }
            }
          }
        }
      })
    }
  })
})
onMounted(() => {
  sessionStorage.setItem(Constant.Def.TIME_ZONE, Intl.DateTimeFormat().resolvedOptions().timeZone)
})
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  background: v-bind("backgroundImg");
  background-size: cover;
  position: relative;
  .logo {
    position: absolute;
    width: 180px;
    top: 50px;
    right: 5%;
    img {
      width: 100%;
      height: auto;
    }
  }
  .concact {
    position: absolute;
    padding: 5px 10px;
    top: 50px;
    right: 5%;
    width: 260px;
    height: 70px;
    background: linear-gradient(
      90deg,
      rgba(247, 248, 248, 0),
      rgba(255, 255, 255, 0.5),
      rgba(247, 248, 248, 0)
    );
    .concact-phone {
      span.concact-phone-font {
        margin-right: 15px;
      }
      span {
        color: #fff;
        font-size: 16px;
        line-height: 30px;
      }
    }
    .concact-email {
      span.concact-email-font {
        margin-right: 15px;
        font-size: 14px;
      }
      span {
        color: #fff;
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
  .form {
    width: 480px;
    // height: 420px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
    padding: 30px 20px;
    border-radius: 5px;
    .form-tip-logo {
      height: 60px;
      text-align: center;
      margin-bottom: 15px;
      img {
        height: 100%;
        width: auto;
      }
    }
    .form-tip {
      text-align: center;
      font-size: 28px;
      color: #212121;
      line-height: 50px;
    }
    :deep(.form-body) {
      margin-top: 30px;
      .dx-layout-manager .dx-field-item:not(.dx-first-row) {
        padding-top: 15px;
      }
      .dx-field-item-label {
        vertical-align: middle;
      }
      .dx-field-item-label-text {
        color: #333;
        font-size: 14px;
      }
      .dx-field-item-required-mark {
        display: none;
      }
      .pangus-button {
        // background-color: #dd722c;
        margin-top: 20px;
      }
      // .pangus-button.dx-state-hover {
      //   background-color: #d8671e;
      // }
      // .pangus-input.dx-state-focused {
      //   border-color: #dd722c;
      // }
      // .pangus-input.dx-state-focused .dx-texteditor-label {
      //   color: #dd722c;
      // }
      .button-indicator {
        color: #fff;
        vertical-align: middle;
        .dx-loadindicator-icon .dx-loadindicator-segment {
          background: #fff;
        }
      }
      .forget {
        display: flex;
        padding-top: 10px;
        .forget-pwd {
          color: #7a7a7a;
          font-size: 12px;
          cursor: pointer;
          line-height: 24px;
          &:hover {
            @include get_class("color", "theme-color");
          }
        }
        .remember-people {
          margin-left: auto;
          display: flex;
          .remember-check {
            margin-left: 12px;
          }
        }
      }
    }
  }
}
.footer {
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 12px;
  line-height: 24px;
  // height: 24px;
  .footer-concact {
    position: absolute;
    left: 10px;
    .footer-concact-phone {
      margin-left: 16px;
    }
  }
  .footer-version {
    text-align: center;
  }
  .main-icps {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    a.main-icp-item {
      margin-right: 5px;
      &:hover {
        @include get_class("color", "theme-color");
      }
    }
  }
}
</style>