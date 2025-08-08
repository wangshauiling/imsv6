/*
* IMS-V6
*
* 版权所有 (c) 2023-2023 广东盘古信息科技股份有限公司
*
* 2022-07-14 创建 - 夏丹新
*
*/
import ImsFaPda from 'ims-fa-pda'
const Utils = ImsFaPda.core.Utils
let utilsFn = null
const _appUtils = {}
utilsFn = require.context('./', true, /\.utils.js$/)
utilsFn.keys().forEach((fn) => {
    for (let key in utilsFn(fn).default) {
        if (Utils.typeJudgment(utilsFn(fn).default[key]) === 'FUNCTION') {
            _appUtils[key] = function () {
                return utilsFn(fn).default[key].call(_appUtils, ...arguments)
            }
        } else {
            _appUtils[key] = utilsFn(fn).default[key]
        }
    }
})

export { _appUtils }
