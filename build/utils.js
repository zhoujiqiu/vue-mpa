var path = require('path')
var glob = require('glob')

// 获取入口文件路径
exports.getEntry = function(globPath){
  var entries = {},
      basename, 
      tmp, 
      pathname;
  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));

    //过滤非入口文件的vuex和routers.js
    if(basename.indexOf('routers') !== -1 || entry.indexOf('vuex/') !== -1) return; 

    // 原路径：‘./src/module/mulit/list/index.js’
    // 分解后：[multi,list,index.js]
    tmp = entry.split('/').splice(-3); 

    // * 输出js和html的路径
    pathname =  tmp.slice(0, 2).join('/') + '/' + basename;
    entries[pathname] = entry;
  });
  console.log(entries);
  return entries;
}