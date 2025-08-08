<!--
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-04-16 创建 - 陈栋升
 *
-->
<template>
    <PgBaseTemplate
        ref="pgBaseTemplateRef"
        :url="url"
        @init="initTemplate"></PgBaseTemplate>
</template>
<script>
export default {
    // 质量状态变更-按物料
    name: 'demo/demoPdaChangeQltyByMtrl'
}
</script>
<script setup>
import { getCurrentInstance } from 'vue'
const vm = getCurrentInstance()
const appUtils = vm.appContext.config.globalProperties.$appUtils
const imsFaPda = appUtils.imsFaPda
const imsFaCore = imsFaPda.imsFaCore
const ConditionGroup = imsFaCore.ConditionGroup
const ColumnCondition = imsFaCore.ColumnCondition
const Constant = imsFaCore.Constant
const Params = imsFaCore.Params

/**
 * 模板初始化事件
 * @param {*} obj
 */
const initTemplate = function (obj) {
    // 页面模板实例
    const _this = obj.instance.exposed

    //页面渲染前置事件
    _this.interceptFn.beforeRenderPageEvent = function (pdaHtmlVo) {
        //元素配置
        const elementOptions = [
            {
                dataField: 'org_code', 
                clearContactDataField: ['store_code'],
                selectParams: function () {
                    return new ConditionGroup({
                        conditions: [
                            new ColumnCondition({ columnCode: 'is_valid', value: Constant.BooleanConstants.TRUE })
                        ]
                    })
                },
                // 设置参数
                selfValidateParams: function ({ validateParams, value }) {
                    validateParams.setObject('check_type', [
                        Constant.ParamCheckType.EXISTS,
                        Constant.ParamCheckType.IS_VALID
                    ])
                    validateParams.setString('model_code', 'ims_org')
                    validateParams.setString('org_code', value)
                }
            },
            // 仓库编码
            {
                dataField: 'store_code',
                preContactDataField: ['org_code'],
                fixParams: function () {
                    const params = new Params()
                    params.setString('org_code', _this.getFormData()['org_code'])
                    params.setString(Constant.Def.APPLY_USER_STORE_POWER, Constant.BooleanConstants.TRUE)
                    return params
                },
                selectParams: function () {
                    return new ConditionGroup({
                        conditions: [
                            new ColumnCondition({ columnCode: 'org_code', value: _this.getFormData()['org_code'] }),
                            new ColumnCondition({ columnCode: 'is_valid', value: Constant.BooleanConstants.TRUE }),
                            new ColumnCondition({ columnCode: 'is_virtual', value: Constant.BooleanConstants.FALSE }),
                            new ColumnCondition({ columnCode: 'ppt_type', value: appUtils.BsColumnType.PptType.MTRL })
                        ]
                    })
                },
                selfValidateParams: function ({ validateParams, value }) {
                    validateParams.setObject('check_type', [
                        Constant.ParamCheckType.EXISTS,
                        Constant.ParamCheckType.IS_VALID,
                        appUtils.BsCheckType.BsStore.NOT_VIRTUAL,
                        appUtils.BsCheckType.BsStore.PPT_TYPE_IS_MTRL,
                        appUtils.BsCheckType.BsStore.CHECK_USER_STORE_POWER
                    ])
                    validateParams.setString('model_code', 'bs_store')
                    validateParams.setString('org_code', _this.getFormData()['org_code'])
                    validateParams.setString('store_code', value)
                }
            }
        ]
        return elementOptions
    }
}

/*********** 初始化数据 ********* */
const url = 'demo/demoDevManage/pdaChangeQlty/saveByMtrl'
</script>
