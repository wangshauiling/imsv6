/*
 * @Author: your name
 * @Date: 2022-02-18 15:28:17
 * @LastEditTime: 2023-02-22 14:06:54
 * @LastEditors: Please set LastEditors
 * @Description: 工具类
 * @FilePath: \imsfawebe:\UserData\Dev28\imsv6\source\trunk\app\webapp\src\utils\index.js
 */
import ImsFaWeb from 'ims-fa-web'
const Utils = ImsFaWeb.core.Utils
const _appUtils = {}
let utilsFn = require.context('./', true, /\.utils.js$/)
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