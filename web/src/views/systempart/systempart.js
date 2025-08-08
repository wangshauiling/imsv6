/*
 * @Author: your name
 * @Date: 2022-01-26 15:47:59
 * @LastEditTime: 2023-04-01 10:22:30
 * @LastEditors: Please set LastEditors
 * @Description: 导入systempart文件夹内的组件
 * @FilePath: \myproject\webapp\src\views\systempart\systempart.js
 */
// 引入ims-fa-web库
import { systempartMap as _systempartMap } from 'ims-web'
const systempartMap = { ..._systempartMap }

let systempartFiles = require.context('./', true, /\.vue$/)
systempartFiles.keys().forEach((component) => {
  const systempart = systempartFiles(component).default
  console.log(systempart, 'systempart')
  if (systempartMap[systempart.name]) {
    console.warn(`存在同名页面${systempart.name}，同名页面会导致访问页面出错`)
  }
  systempartMap[systempart.name] = systempart
})
export default systempartMap