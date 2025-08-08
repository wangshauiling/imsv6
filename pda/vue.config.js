/*
 * @Author: 夏丹新
 * @Date: 2022-06-09 20:23:34
 * @LastEditTime: 2023-02-25 10:34:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \imsfapdae:\UserData\Dev28\imsv6\source\trunk\app\frontend\imspda\vue.config.js
 */
const { defineConfig } = require("@vue/cli-service");
const path = require('path')
const resolve = dir => path.join(__dirname,dir)

// 增加自由变量
const customConfig = require('./public/js/customConfig.js')
process.env.VUE_APP_CONFIG = JSON.stringify(customConfig)
const isProduction = process.env.NODE_ENV === 'production'

module.exports = defineConfig({
  lintOnSave: false,//'error':报错信息显示在页面；true：报错信息显示在命令行
  publicPath: isProduction ? customConfig.baseDir + '/pda' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: !isProduction,
  devServer:{
    port: 8088,
    client: {
      progress: false,
      overlay: false
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('~', resolve('public'))
    // thread-loader 开启多线程加快打包速度
    config.module.rule('js').use('thread-loader').loader('thread-loader').options({
      workers: require('os').cpus().length - 1
    })
    // 删除 commonChunk
    config.optimization.delete('splitChunks')

    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: isProduction ? 'true' : 'false',
      })
      return definitions
    })
  },
  configureWebpack: config => {
    const plugins = []
    if (isProduction) {
        // 开启分离js
        config.optimization = {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 1000 * 60,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            let name = 'vendor'
                            const package = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
                            if(package && package.length > 1){
                              name = `npm.${package[1].replace('@', '')}`
                            }
                            return name
                        }
                    }
                }
            },
        }
        // 取消webpack 警告的性能提示
        config.performance = {
            hints: 'warning',
            // 入口起点的最大体积
            maxEntrypointSize: 80 * 1024 * 1024,
            // 生成文件的最大体积
            maxAssetSize: 3000 * 30000,
            // 只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js')
            }
        }
    }
    // config.module.rules.push(
    //     {
    //         test: /\.js$/,
    //         enforce: 'pre',
    //         exclude: /(node_modules|bower_components|\.spec\.js)/,
    //         use: [
    //             {
    //                 loader: 'webpack-remove-blocks',
    //                 options: {
    //                     blocks: [
    //                         'develblock',
    //                         {
    //                             block: 'develblock',
    //                             start: '//'
    //                         }
    //                     ]
    //                 }
    //             }
    //         ]
    //     },
    // )
    return {
        plugins
    }
  },

})


