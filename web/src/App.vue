<!--
 * @Author: your name
 * @Date: 2022-01-20 15:56:51
 * @LastEditTime: 2024-07-04 10:38:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \myproject\testapp\src\App.vue
-->
<template>
  <div id="pg-app">
    <component :is="$route.meta.layout">
      <div class="app-content">
        <router-view />
      </div>
    </component>
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  min-width: 1200px;
  overflow-x: auto;
}
#pg-app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  @include get_font_class("height", "content-height");
  @include get_font_class("max-height", "content-height");
}
.app-content {
  height: 100%;
}
.b-color {
  @include get_class("color", "theme-color");
}
.rightIco,
.otherIco {
  @include get_class("color", "theme-color");
}

.dx-tab-selected .dx-item-content {
  @include get_class("color", "theme-color");
}
.dx-tab-selected .dx-item-content .dx-tab-text {
  .dx-icon {
    @include get_class("color", "theme-color");
  }
  @include get_class("color", "theme-color");
}
// 去除筛选的值
.dx-datagrid-headers {
  td {
    .dx-header-filter.dx-header-filter-empty {
      display: none !important;
    }
    &:hover .dx-header-filter {
      display: inline-block !important;
      &:focus {
        display: inline-block !important;
      }
      &:visited {
        display: inline-block !important;
      }
    }
  }
}
</style>
<script setup>
// 引入样式
// import './style/pangus_base.css'
import { onBeforeMount, onMounted, getCurrentInstance, onUnmounted } from 'vue'
const vm = getCurrentInstance()
const appUtils = vm.appContext.config.globalProperties.$appUtils
const route = appUtils.getRouter()
onBeforeMount(() => {
  // 监听复制事件 去掉复制前后空格
  document.addEventListener('click', function () {
    const menuDOm = document.querySelectorAll("[data-menumark = pg-fun-menu]")
    for (let index = 0; index < menuDOm.length; index++) {
      menuDOm[index].remove()
    }
  })
  // 监听复制事件 去掉复制前后空格
  document.addEventListener('copy', function (e) {
    let clipboardData = e.clipboardData || window.clipboardData
    if (!clipboardData) return

    let text = window.getSelection().toString()
    if (text) {
      e.preventDefault()
      clipboardData.setData('text/plain', text.trim())
    }
  })
  // 设置皮肤样式
  const theme = localStorage.getItem('theme') || 'orange'
  const font = localStorage.getItem('font') || 'small'
  window.document.documentElement.setAttribute('data-theme', theme)
  window.document.documentElement.setAttribute('data-font', font)
  appUtils.triggerStoreEvent('user', 'updateTheme', theme)
  appUtils.triggerStoreEvent('user', 'updateFont', font)
  // 切换组件库样式
  const styleLink = document.querySelector('link[data-style=true]')
  if (styleLink) {
    styleLink.remove()
  }

  const isProduction = process.env.NODE_ENV === 'production'
  let bserUrl = isProduction ? JSON.parse(process.env.VUE_APP_CONFIG).baseDir + '/web' : '.'

  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('data-style', true)
  link.setAttribute('href', `${bserUrl}/devstyle/dx.generic.custom-${theme}.css`)

  document.body.appendChild(link)

})
const setViewportScale = function () {
  const devicWidth = document.documentElement.clientWidth
  let metaViewport = document.querySelector('meta[name="viewport"]')

  if (appUtils.isTV()) {
    if (!metaViewport) {
      metaViewport = document.createElement('meta')
      metaViewport.setAttribute('name', 'viewport')
      document.head.appendChild(metaViewport)
    }
    let scale = devicWidth / 1920
    metaViewport.setAttribute('content', `width=device-width,height=device-height,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},use-scalable=no`)
  } else {
    metaViewport.setAttribute('content', `width=device-width,height=device-height,initial-scale=1,maximum-scale=1,minimum-scale=1,use-scalable=no`)
  }

}

document.addEventListener('plusready',function() {
  setViewportScale()
},false)

onMounted(() => {
  // 更新document meta标签
  setViewportScale()
  // 控制浏览器返回不给用
  window.addEventListener('popstate', function (e) {
    const cacheRouter = appUtils.getStoreInfo('router', 'cacheRouter')
    if (cacheRouter && cacheRouter['_value_']) {
      if (e.state) {
        const index = cacheRouter['_value_'].findIndex(item => item.path === e.state.forward)
        if (e.state.forward && index !== -1) {
          route.push({ path: e.state.forward })
        }
      }
    }
  })
  // 注册表单回车事件
  appUtils.enterFocusEvent()

  // 注册热键键盘事件
  appUtils.registerHotKeyHandler()

  // 自定义浏览器图标
  var link = document.createElement('link')
  link.rel = 'icon'
  if (window.selfServiceConfig && window.selfServiceConfig.browserLogo) {
    link.href = window.selfServiceConfig.browserLogo
  } else {
    link.href = appUtils.getIframeUrl('favicon.ico')
  }
  document.head.appendChild(link)

})

onUnmounted(() => {
  // 移除热键键盘事件
  appUtils.removeHotKeyHandler()
  // 移除表单回车事件
  appUtils.removeEnterFocusEvent()
})
</script> 