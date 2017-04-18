var path = require('path')

module.exports = {
  build: {
    projectName: 'webapp',
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: '/',
    assetsPublicPath: '../../', //生产环境下输出路径
    productionSourceMap: true
  },
  dev: {
    port: 8089,
    assetsPublicPath: '/', //开发环境下输出路径
    proxyTable: {}
  }
}