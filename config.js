var path = require('path')

module.exports = {
  build: {
    projectName: 'webapp',
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: '/',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    port: 8089,
    proxyTable: {}
  }
}