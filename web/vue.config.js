const fs = require('fs')
const webpack = require('webpack')
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
try {
  //读取iconfont.css文件内容
  process.env.VUE_APP_ICON_FONT_CSS = fs.readFileSync('./src/assets/font/iconfont.css', 'utf-8')
} catch (error) {
  console.log(error);
}
// 增加自由变量
const customConfig = require('./public/js/customConfig.js')
process.env.VUE_APP_CONFIG = JSON.stringify(customConfig)
const isProduction = process.env.NODE_ENV === 'production'

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  parallel: true,
  publicPath: isProduction ? customConfig.baseDir + '/web' : './',
  transpileDependencies: false,
  lintOnSave: isProduction ? false : true,
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8987,
    client:{
      overlay:false
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('~', resolve('public'))

    // 使用 thread-loader 可以开启多线程并行处理来加快打包速度，特别适用于大型项目。
    config.module
      .rule('js')
      .use('thread-loader')
      .loader('thread-loader')
      .options({
        workers: require('os').cpus().length - 1
      })

    // 引入全局scss变量
    config.module.rule('scss').oneOfs.store.forEach(item => {
      item.use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/style/handle.scss',
        })
    })

  },
  configureWebpack: config => {
    const plugins = [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)  // 这里可以设置为 true 或 false
      }),
    ]
    if (isProduction) {
      // 取消webpack 警告的性能提示
      config.performance = {
        hints: 'warning',
        // 入口起点的最大体积
        maxEntrypointSize: 1000 * 50000 * 2,
        // 生成文件的最大体积
        maxAssetSize: 3000 * 30000,
        // 只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js')
        }
      }
    }
    return {
      plugins
    }
  },
})
