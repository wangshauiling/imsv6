<template>
  <PgHomeTemplate></PgHomeTemplate>
</template>

<script>
 export default {
  name:'home'
 }
</script>
<script setup>
import { onBeforeMount, onMounted, getCurrentInstance, defineEmits, } from 'vue'
const emits = defineEmits(['beforeMount', 'mounted', ])
const vm = getCurrentInstance()

//--------------------------------------------- 生命周期 start ---------------------------------------------------------
onBeforeMount(() => {
  emits('beforeMount', { instance: vm })
})
onMounted(() => {
  emits('mounted', { instance: vm })
})
//--------------------------------------------- 生命周期 end ---------------------------------------------------------

</script>
<style scoped lang='scss'>
</style>