const themeType = ['defaultMode', 'blueMode', 'nightMode']

// 主题颜色
const themeMode = {
    // 基础主题色
    '--van-primary-color': { defaultMode: '--pg-orange', blueMode: '--pg-blue', nightMode: '' },
    '--van-red': { defaultMode: '--pg-red', blueMode: '--pg-red', nightMode: '' },

    // nav
    '--van-nav-bar-background': { defaultMode: '--pg-gray-8', blueMode: '--pg-blue', nightMode: '' },
    '--van-nav-bar-title-text-color': { defaultMode: '--pg-white', blueMode: '--pg-white', nightMode: '' },
    '--van-nav-bar-text-color': { defaultMode: '--pg-white', blueMode: '--pg-white', nightMode: '' },
    '--van-nav-bar-icon-color': { defaultMode: '--pg-white', blueMode: '--pg-white', nightMode: '' },

    // menu
    '--pg-menu-name-background-color': { defaultMode: '--pg-gray-3', blueMode: '--pg-gray-3', nightMode: '' },
    '--pg-menu-second-background-color': { defaultMode: '--pg-gray-4', blueMode: '--pg-gray-3', nightMode: '' },
    '--pg-menu-third-background-color': { defaultMode: '--pg-gray-5', blueMode: '--pg-gray-3', nightMode: '' },
    '--pg-menu-forth-background-color': { defaultMode: '--pg-gray-6', blueMode: '--pg-gray-3', nightMode: '' },
    '--pg-menu-name-text': { defaultMode: '--pg-gray-7', blueMode: '--pg-gray-7', nightMode: '' },
    '--pg-menu-name-background-color-active': { defaultMode: '--pg-orange', blueMode: '--pg-blue', nightMode: '' },
    '--pg-menu-name-text-active': { defaultMode: '--pg-white', blueMode: '--pg-white', nightMode: '' },
    '--pg-menu-forth-floor-name-text-active': { defaultMode: '--pg-orange', blueMode: '--pg-blue', nightMode: '' },

    // tabbar
    '--van-tabbar-item-text-color': { defaultMode: '--pg-gray-6', blueMode: '--pg-gray-6', nightMode: '' },
    '--van-tabbar-item-active-color': { defaultMode: '--pg-black', blueMode: '--pg-blue', nightMode: '' },

    // button
    '--van-button-default-background-color': { defaultMode: '--pg-gray-9', blueMode: '--pg-gray-9', nightMode: '' },
    '--van-button-default-color': { defaultMode: '--pg-white', blueMode: '--pg-white', nightMode: '' },

    // grid
    '--pg-selected-background-color': {
        defaultMode: '--pg-orange-light-2',
        blueMode: '--pg-blue-light-2',
        nightMode: ''
    }
}

// 主题大小
const themeSize = {
    default: {
        padding: {
            '--pg-padding-base': 4
        },
        fontSize: {
            '--pg-font-size-xs': 10,
            '--pg-font-size-sm': 12,
            '--pg-font-size-md': 14,
            '--pg-font-size-lg': 16
        },
        lineHeight: {
            '--pg-line-height-xs': 14,
            '--pg-line-height-sm': 18,
            '--pg-line-height-md': 20,
            '--pg-line-height-lg': 22
        },
        border: {
            '--pg-border-width-base': 1,
            '--pg-border-radius-xs': 2,
            '--pg-border-radius-sm': 4,
            '--pg-border-radius-md': 8,
            '--pg-border-radius-lg': 999
        }
    },
    big: {
        padding: {
            '--pg-padding-base': 6
        },
        fontSize: {
            '--pg-font-size-xs': 12,
            '--pg-font-size-sm': 14,
            '--pg-font-size-md': 16,
            '--pg-font-size-lg': 18
        },
        lineHeight: {
            '--pg-line-height-xs': 18,
            '--pg-line-height-sm': 22,
            '--pg-line-height-md': 24,
            '--pg-line-height-lg': 26
        },
        border: {
            '--pg-border-width-base': 1,
            '--pg-border-radius-xs': 4,
            '--pg-border-radius-sm': 6,
            '--pg-border-radius-md': 10,
            '--pg-border-radius-lg': 999
        }
    },
    large: {
        // padding
        '--pg-padding-base': 8,

        // font-size
        '--pg-font-size-xs': 14,
        '--pg-font-size-sm': 16,
        '--pg-font-size-md': 18,
        '--pg-font-size-lg': 20,

        // line-height
        '--pg-line-height-xs': 22,
        '--pg-line-height-sm': 26,
        '--pg-line-height-md': 30,
        '--pg-line-height-lg': 34,

        // border
        '--pg-border-width-base': 2,
        '--pg-border-radius-xs': 6,
        '--pg-border-radius-sm': 8,
        '--pg-border-radius-md': 12,
        '--pg-border-radius-lg': 999
    }
}
export { themeType, themeMode, themeSize }
