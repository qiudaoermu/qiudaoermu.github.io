---
title: "🐓🥚npm-link-Hot-Module-Replacement-方案"
date: 2022-08-02
tags: 
- 实践堂
---
假如你在开发一个vue第三方包，假定命名package，我们使用npm link方式，这样可以，在主要项目project引用时，**package**可以独立快速开发，不和**project**耦合。

### npm link
1.进入package执行
```
npm link
```
2.进入project 中执行
```
npm link package
```
这样就可以愉快的开发了。

### 问题：npm link 无法使用热更新。
由于npm link利用的是操作系统的 **ln -s source target** 软连接，无法热更新，这就没搞头了了，没有热更新我还 link毛线呢。没关系，大胆发挥创新能力，我们可以利用**yalc**和**webpack plugin**搞事情。
### 方案：webpack hook
yalc 和 npm link 差不多，但是不会创立软连接，而是把文件映射到node_modules，和主项目共用npm包。

![](https://upload-images.jianshu.io/upload_images/15312191-05a389b031eeae91.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

实现link包更新功能主要利用**yalc push**特性。如果不熟悉yalc可以先看看这个工具的文档。


安装
```
npm install yalc
```

进入package根目录，执行
```
yale publish
```

进入project根目录，执行
```
yale add package
npm i
```

现在重新进入package根目录
安装webpack插件 `yalc-watch-webpack-plugin`，这个插件的作用就是利用webpack hook:**watchRun**，在更新时调用`yalc push`
```js
npm i yalc-watch-webpack-plugin
```
在vue.config 配置下这个插件
```
 // vue.config.js
const yalcpushwatchplugin = require('yalcpushwatchplugin');
module.exports = {
  ...
  configureWebpack: {
    plugins: [
      new yalcpushwatchplugin({
        watchPushAction: true,
        linkName: "logicflow-vue",
      }),
    ],
  },
};
```

启动你的package项目

```
npm start
```

这样当你修改package文件后，就会自动执行，**yalc push**, project的依赖link也会自动更新。
除了上面的方案，
也可以利用 **nodemon** 文件监控功能，监听 package 的改动，在 package目录下执行 **npm run watch**；不过相对于webpack tap钩子性能相对差。
```
"scripts": {
    "watch": "nodemon --ignore dist/ --ignore node_modules/ --watch src/ -C -e ts,tsx,less --debug -x 'npx rollup -c rollup.config.js --silent && yalc push'",
 },
```
