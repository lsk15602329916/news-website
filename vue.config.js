// const path = require("path")
// const resolve = dir => path.join(_dirname, dir)

module.exports = {
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },
  devServer: {
    /* devServer.proxy: (跨域问题)如果前端应用和后端api服务器没有运行在同一主机上
        则需要在开发环境下将API请求代理到api服务器 */
    proxy: {
      // 配置跨域
      '/toutiao': {
        target: 'https://m.toutiao.com/',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/toutiao': ''
        }
      },
      
    }
  }
}