var path = require('path');
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var glob = require('glob');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
})

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    if(basename.indexOf('routers') !== -1 || entry.indexOf('vuex/') !== -1) return; //过滤vue routers.js
    // 原路径：‘./src/module/news/list/index.js’
    // 分解后：[news,list,index.js]
    tmp = entry.split('/').splice(-3);
    // * 输出js和html的路径
    pathname =  tmp.slice(0, 2).join('/') + '/' + basename;
    entries[pathname] = entry;
  });
  return entries;
}

var pages = getEntry('./src/module/**/**/*.html');

for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],   // 模板路径
    inject: true              // js插入位置
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ['static/common/vendors', pathname];
    conf.hash = true;
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
