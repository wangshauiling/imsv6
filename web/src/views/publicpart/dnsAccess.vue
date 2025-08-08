<template>
  <div
    class="pg-dns-access-container"
  >
    {{i18nLabelObj.tip}}
  </div>
</template>

<script>
 export default {
  name:'dnsAccess',
  inheritAttrs: false
 }
</script>
<script setup>
import { onBeforeMount, onMounted, getCurrentInstance, defineEmits, reactive } from 'vue'
const emits = defineEmits(['beforeMount', 'mounted', ])
const vm = getCurrentInstance()
const appUtils = vm.appContext.config.globalProperties.$appUtils
const messageHelper = appUtils.getStoreInfo('helper', 'messageHelper')
const imsFaCore = appUtils.imsfaweb.imsFaCore
const i18nLabelObj = reactive({
  tip: ''
})

//--------------------------------------------- 方法 start ---------------------------------------------------------
/**
 * 设置本地语言：
 * 1.优先级：已保存的语言>浏览器本地语言；
 * 2.判断是中文；
 * 3.不是则显示英文。
 */
const initLocaleLanguage = function() {
    let targetLang = navigator.language || navigator.userLanguage
      // 判断是中文
    if (targetLang?.startsWith("zh")) {
      targetLang = imsFaCore.CoreColumnType.LocaleCode.ZH_CN
    }else {
      targetLang = imsFaCore.CoreColumnType.LocaleCode.EN_US
    }
    // 更新助手类语言
    messageHelper.localeCode = targetLang
}
//--------------------------------------------- 方法 end ---------------------------------------------------------
//--------------------------------------------- 生命周期 start ---------------------------------------------------------
onBeforeMount(() => {
    emits('beforeMount', { instance: vm })
    initLocaleLanguage()
    i18nLabelObj.tip = messageHelper.get('common.ui.tip.allow.domain')
})
onMounted(() => {
    emits('mounted', { instance: vm })
})
//--------------------------------------------- 生命周期 end ---------------------------------------------------------

</script>
<style scoped lang='scss'>
.pg-dns-access-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  height: 100%;
  font-size: 28px;
  background-color: rgb(248, 215, 218); 
  color: rgb(114, 28, 36);
  word-break: break-word;
  text-align: left;
}
</style>