---
## vue2+webpack 多页应用框架【可集成单页应用】
  update: 2017-03-10 | author: zhoujiqiu

### 更新说明
  1、vue-mpa默认已经升级到了vue2版本；
  2、如果想继续用vue1版本，请切换到vue1-mpa分支；

### 使用方法
``` bash
# 安装
npm install

# 调试环境 serve with hot reload at http://localhost:8089/
npm run dev

# 生产环境 build for production with minification
npm run build

```

### 运行
``` bash
# 多页demo地址
http://localhost:8089/multi/list/index.html

# 单页demo地址
http://localhost:8089/single/home/index.html
```
本地默认访问端口为8089，需要更改的童鞋请到项目根目录文件`config.js`修改。


### 目录结构
``` bash
vue-mpa
    |---build webpack配置文件
    |---dist 生产环境打包
    |---src  开发目录
        |---assets 静态资源
            |---common.css  公共css
            |---common.js  公共js
            |---font/  字体图标
            |---img/   公共图片
        |---components 组件库
              |---toast.vue  消息组件
              |---dialog.vue 弹框组件
        |---module 所有业务模块
              |---multi 多页应用模块
                  |--- list 列表页
                        |--- app.vue
                        |--- index.html
                        |--- index.js
                  |--- detail 详情页
                        |--- app.vue
                        |--- index.html
                        |--- index.js
              |---single 单页应用模块
                  |--- home 
                        |--- app.vue
                        |--- index.html
                        |--- index.js
                        |--- detail.vue
                        |--- list.vue


```

`注意：`请保持module下的各模块的目录结构一致；



### webpack主要配置说明
1、在webpack中配置项目公用的JS文件，并提取打包到指定目录；
由于是多页应用，必然会有多个入口，本架构会将`module`下的所有js文件作为入口文件；所以公共文件的提取需要在入口文件处单独处理，配置如下：
``` bash
# 入口文件
var entries = getEntry('./src/module/**/**/*.js');

# 指定公共JS资源，并打包到指定的目录
entries['static/common/vendors'] = ['vue','vue-resource','n-zepto','./src/assets/common.js'];

```

2、配置js(html)输出路径
如下文件输出路径请根据项目结构需要做相应修改。
``` bash
# 输出路径
glob.sync(globPath).forEach(function (entry) {
  basename = path.basename(entry, path.extname(entry));
  //过滤非入口文件的JS：routers.js和vuex/*.js
  if(basename.indexOf('routers') !== -1 || entry.indexOf('vuex/') !== -1) return; 
  // 原路径：entry = ‘src/module/multi/list/index.js’
  tmp = entry.split('/').splice(-3);
  // 分解后：tmp = [multi,list,index.js]
  pathname =  tmp.slice(0, 2).join('/') + '/' + basename; 
  // 正确输出js和html的路径: pathname = 'multi/list/index'
  entries[pathname] = entry;
});
```