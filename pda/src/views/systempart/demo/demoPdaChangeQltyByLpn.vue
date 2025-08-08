<!--
* IMS-V6
*
* 版权所有 (c) 2023-2023 广东盘古信息科技股份有限公司
*
* 2023-05-30 创建 - 冯健川
*
-->
<template>
    <PgBaseTemplate
        ref="pgBaseTemplateRef"
        :url="'bs/bsAgvManage/pdaAgvCommonTransport/transport'"
        @init="initTemplate"
    ></PgBaseTemplate>
</template>
<script>
export default {
    name: 'demo/demoPdaChangeQltyByLpn' // 质量状态变更-按LPN
}
</script>
<script setup>
import { getCurrentInstance } from 'vue'
const vm = getCurrentInstance()
const appUtils = vm.appContext.config.globalProperties.$appUtils
const imsFaPda = appUtils.imsFaPda
const imsFaCore = imsFaPda.imsFaCore
const PdaConstant = imsFaCore.PdaConstant
const ConditionGroup = imsFaCore.ConditionGroup
const ColumnCondition = imsFaCore.ColumnCondition
const Constant = imsFaCore.Constant
const Params = imsFaCore.Params
const DateUtils = imsFaCore.DateUtils
const messageHelper = appUtils.getStoreInfo('helper', 'messageHelper')




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
                contactDataField: ['org_name'],
                clearContactDataField: [],
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
            {
                dataField: 'scene_code',
                contactDataField: ['scene_name'],
                clearContactDataField: [],
                selectParams: function () {
                    return new ConditionGroup({
                        conditions: []
                    })
                },
                // sql 查询参数
                fixParams: async function () {
                    const params = new Params()
                    const formData = _this.getFormData()
                    params.setString('org_code', formData['org_code'])
                    return params
                },
                // 设置参数
                selfValidateParams: function ({ validateParams, value }) {
                    validateParams.setObject('check_type', [
                        Constant.ParamCheckType.EXISTS
                    ])
                    validateParams.setString('model_code', 'bs_agv_scene')
                    validateParams.setString('org_code', _this.getFormData().org_code)
                    validateParams.setString('scene_code', value)
                },
                selfValidateSuccess: function () {
                    _this.setOption('scene_name', 'hide', Constant.BooleanConstants.FALSE)
                },
                // 校验失败
                selfValidateError: function () {
                    _this.setOption('scene_name', 'hide', Constant.BooleanConstants.TRUE)
                },
                // 值清空事件
                selfClearValue: function () {
                    _this.setOption('scene_name', 'hide', Constant.BooleanConstants.TRUE)
                }
            },
            {
                dataField: 'agv_point_type',
                selfValueChanged: function ({ value, item }) {
                    if (appUtils.BsColumnType.AgvPointType.EMPTY == value) {
                        _this.setOption('is_collect_site_lpn', 'hide', Constant.BooleanConstants.TRUE)
                        _this.setOption('is_collect_site_lpn', 'readOnly', Constant.BooleanConstants.TRUE)
                        _this.setFormData({ 'is_collect_site_lpn': [] })
                    } else {
                        _this.setOption('is_collect_site_lpn', 'hide', Constant.BooleanConstants.FALSE)
                        _this.setOption('is_collect_site_lpn', 'readOnly', Constant.BooleanConstants.FALSE)
                    }
                }
            },
            {
                dataField: 'site_point_code',
                contactDataField: [],
                clearContactDataField: [],
                selectParams: function () {
                    return new ConditionGroup({
                        conditions: []
                    })
                },
                fixParams: function () {
                    const params = new Params()
                    const pdaData = appUtils.getPdaData()
                    const beforeDate = DateUtils.shiftDate(new Date(), -180)
                    const agv_point_code_list = []
                    agv_point_code_list.push(pdaData.value['bof_point_code'])
                    const site_point_data = pdaData.value['site_point_data_pda']
                    if (site_point_data) {
                        site_point_data.split(',').forEach(function (data) {
                            agv_point_code_list.push(data)
                        })
                    }
                    params.setString('org_code', pdaData.value['org_code'])
                    params.setString('agv_rcs_code', pdaData.value['agv_rcs_code'])
                    params.setInt('agv_type', pdaData.value['agv_type'])
                    params.setString('building', pdaData.value['building'])
                    params.setString('lpn_md_code', pdaData.value['lpn_md_code'])
                    params.setDate('before_date', beforeDate)
                    params.setObject('agv_point_code_list', agv_point_code_list)
                    return params
                },
                // 设置参数
                selfValidateParams: function ({ validateParams, value }) {
                    const pdaData = appUtils.getPdaData()
                    validateParams.setString('org_code', pdaData.value['org_code'])
                    validateParams.setObject('check_type', [appUtils.BsCheckType.BsAgvRcsTask.CHECK_SITE_POINT_CODE])
                    validateParams.setString('bof_point_code', pdaData.value['bof_point_code'])
                    validateParams.setString('site_point_code', value)
                },
                validateUrl: 'bs/bsAgvManage/pdaAgvCommonTransport/checkData'
            },
            {
                dataField: 'site_area_code',
                contactDataField: [],
                clearContactDataField: [],
                selectParams: function () {
                    return new ConditionGroup({ conditions: [] })
                },
                fixParams: function () {
                    const params = new Params()
                    const pdaData = appUtils.getPdaData()
                    const beforeDate = DateUtils.shiftDate(new Date(), -180)
                    const agv_area_code_list = []
                    agv_area_code_list.push(pdaData.value['bof_point_code'])
                    const site_point_data = pdaData.value['site_point_data_pda']
                    if (site_point_data) {
                        site_point_data.split(',').forEach(function (data) {
                            agv_area_code_list.push(data)
                        })
                    }
                    params.setDate('before_date', beforeDate)
                    params.setString('org_code', pdaData.value['org_code'])
                    params.setString('agv_rcs_code', pdaData.value['agv_rcs_code'])
                    params.setInt('agv_type', pdaData.value['agv_type'])
                    params.setString('building', pdaData.value['building'])
                    params.setString('lpn_md_code', pdaData.value['lpn_md_code'])
                    params.setObject('agv_area_code_list', agv_area_code_list)
                    return params
                },
                // 设置参数
                selfValidateParams: function ({ validateParams, value }) {
                    const pdaData = appUtils.getPdaData()
                    validateParams.setString('org_code', pdaData.value['org_code'])
                    validateParams.setObject('check_type', [appUtils.BsCheckType.BsAgvRcsTask.CHECK_SITE_AREA_CODE])
                    validateParams.setString('main_lpn', pdaData.value['main_lpn'])
                    validateParams.setString('bof_point_code', pdaData.value['bof_point_code'])
                    validateParams.setString('site_area_code', value)
                },
                validateUrl: 'bs/bsAgvManage/pdaAgvCommonTransport/checkData'
            },
            {
                dataField: 'lift_code',
                contactDataField: [],
                clearContactDataField: [],
                selectParams: function () {
                    return new ConditionGroup({ conditions: [] })
                },
                fixParams: function () {
                    const params = new Params()
                    const pdaData = appUtils.getPdaData()
                    params.setString('org_code', pdaData.value['org_code'])
                    return params
                },
                // 设置参数
                selfValidateParams: function ({ validateParams, value }) {
                    const pdaData = appUtils.getPdaData()
                    validateParams.setObject('check_type', [appUtils.BsCheckType.BsAgvRcsTask.CHECK_LIFT_CODE])
                    validateParams.setString('model_code', 'bs_agv_lift')
                    validateParams.setString('org_code', pdaData.value['org_code'])
                    validateParams.setString('lift_code', value)
                }
            }
        ]
        return elementOptions
    }
    // 选择站点（地标/区域）按钮重写
    _this.rewriteToolBtnFn.select_site_point = function () {
        const pdaData = appUtils.getPdaData()
        let siteLpn = pdaData.value['site_lpn']
        // 必须先输入站点容器LPN，否则报错提示：{0} 不允许为空。
        if (siteLpn == null || siteLpn == '' || siteLpn == undefined) {
            _this.setScanTip(messageHelper.getAsFormat('bs.msg.0412',
                messageHelper.get(Constant.Def.COLUMN_PREFIX + 'site_lpn')), false)
            return false
        }
        const outParams = new Params()
        outParams.setString(PdaConstant.PdaKey.NEXT_STEP, 'select_site_point')
        _this.submitNextStep({ outParams, notAddFormDataFlag: false })
        return true
    }
    // 配送按钮重写
    _this.rewriteToolBtnFn.transport = function () {
        const pdaData = appUtils.getPdaData()
        // 当前步骤是点击新站点按钮进入扫描站点容器LPN的操作、忽略校验方法直接配送
        if (pdaData.value[PdaConstant.PdaKey.CURRENT_STEP].indexOf('scan_site_lpn') >= 0) {
            const outParams = new Params()
            outParams.setString(PdaConstant.PdaKey.NEXT_STEP, 'select_lift_code')
            _this.submitNextStep({ outParams, notAddFormDataFlag: false })
        } else {
            _this.validateForm().then(res => {
                if (res) {
                    const outParams = new Params()
                    outParams.setString(PdaConstant.PdaKey.NEXT_STEP, 'select_lift_code')
                    _this.submitNextStep({ outParams, notAddFormDataFlag: false })
                }
            })
        }
        return true
    }
    // 新站点按钮重写
    _this.rewriteToolBtnFn.new_site = function () {
        _this.validateForm().then(res => {
            if (res) {
                const outParams = new Params()
                outParams.setString(PdaConstant.PdaKey.NEXT_STEP, 'scan_site_lpn')
                _this.submitNextStep({ outParams, notAddFormDataFlag: false })
            }
        })
        return true
    }
    //页面渲染后置事件
    _this.interceptFn.afterRenderPageEvent = function () {
        _this.setOption('scene_code', 'isRequired', Constant.BooleanConstants.TRUE)
        _this.validateForm('scene_code')
    }
}
</script>
