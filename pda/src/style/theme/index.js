import { themeMode, themeSize, themeType } from './ThemeOption'

const setProperty = (key, val) => {
    document.documentElement.style.setProperty(key, val)
}
const setImsFaTheme = ({ mode, size } = { mode: 'defaultMode', size: 'default' }) => {
    // 设置主题颜色
    if (mode && themeType.includes(mode)) {
        for (const key in themeMode) {
            if (themeMode[key][mode]) {
                setProperty(key, `var(${themeMode[key][mode]})`)
            }
        }
    }

    // 设置主题大小
    if (size && themeSize[size]) {
        for (const key in themeSize[size]) {
            setProperty(key, themeSize[size][key] + 'px')
        }
    }

    // 设置app状态栏颜色
    if (window.plus) {
        const color = getComputedStyle(document.documentElement).getPropertyValue('--van-nav-bar-background')
        window.plus.navigator.setStatusBarBackground(color)
        window.plus.navigator.setStatusBarStyle('linght')
    }
}

const getThemeStorage = () => {
    const themeMode = localStorage.getItem('themeMode')
    return themeMode ? JSON.parse(themeMode) : null
}
const setThemeStorage = ({ mode }) => {
    return localStorage.setItem('themeMode', JSON.stringify({ mode }))
}
export default {
    setImsFaTheme,
    getThemeStorage,
    setThemeStorage
}
