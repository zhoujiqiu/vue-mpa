var path = require('path')
var config = require('../config')
var cssLoaders = require('./css-loaders')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var glob = require('glob');
var entries = getEntry('./src/module/**/**/*.js'); // 获得入口js文件

// 配置（提取）项目公共的JS，并打包到指定的目录；
entries['static/common/vendors'] = ['vue','vue-resource','n-zepto','./src/assets/common.js'];
var chunks = Object.keys(entries);

// 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: 'static/chunks/[name].js?[chunkhash]' // 将不是入口文件的vue router单独打包；
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'vux-components': 'vux/src/components',
      'vue$': 'vue/dist/vue.js'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  externals: {// 引入高德地图，需要用script标签手动引入
    'AMap': 'window.AMap'
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel'
      },
      {
        test: /vue-scroller.src.*?js$/,
        loader: 'babel'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test   : /\.css$/,
        loader : ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, 
        {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 8192,
          name: 'static/images/[name].[hash:7].[ext]'
        }
      },
      //字体
      {
        test: /\.((ttf|eot|woff|svg)(\?t=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff|svg)\??.*$/,
        loader: 'url-loader?name=static/font/[name].[ext]'
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: {
      scss: ExtractTextPlugin.extract('vue-style-loader','css!sass'),
      less: ExtractTextPlugin.extract('vue-style-loader','css!less')
    }
  },
  plugins: [
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'static/common/vendors', // 公共模块的名称
      chunks: chunks,  // chunks是需要提取的模块
      minChunks: chunks.length
    }),
    // 配置提取出的样式文件
    new ExtractTextPlugin('[name].css',{allChunks: true})
  ]
}

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
  console.log(entries);
  return entries;
}