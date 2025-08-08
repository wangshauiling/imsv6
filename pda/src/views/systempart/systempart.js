// 引入ims-fa-pda库
import { systempartMap as _systempartMap } from 'ims-pda'
let systempartFiles = null
const systempartMap = { ..._systempartMap }

systempartFiles = require.context('./', true, /\.vue$/)
systempartFiles.keys().forEach((component) => {
    const systempart = systempartFiles(component).default
    if (systempartMap[systempart.name]) {
        console.warn(`存在同名页面${systempart.name}，同名页面会导致访问页面出错`)
    }
    systempartMap[systempart.name] = systempart
})
export default systempartMap