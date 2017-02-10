var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanPlugin = require('clean-webpack-plugin')//webpack插件，用于清除目录文件
var glob = require('glob');

module.exports = merge(baseWebpackConfig, {
  //devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: 'static/chunks/[name].js?[chunkhash]'
    // chunkFilename: path.join(config.build.assetsSubDirectory, '[id].js')
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CleanPlugin(['../dist']), //清空生成目录
    new webpack.optimize.OccurenceOrderPlugin(),
  ]
})

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    if(basename.indexOf('routers') !== -1 || entry.indexOf('vuex/') !== -1) return; //过滤vue routers.js
    // 原路径：‘./src/module/news/list/index.js’
    // 分解后：tmp = [news,list,index.js]
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
