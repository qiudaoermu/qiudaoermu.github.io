---
title: "🌦🌦webpack&esbuild--两者可以兼得"
date: 2022-05-12
tags: 
- 开发日常
---
![](https://upload-images.jianshu.io/upload_images/15312191-95090f655ae229f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


esbuild打包速度碾压webpack,其优势我在另一篇文章中写过，请见[为什么esbuild更快](https://www.jianshu.com/p/b45c020aa368) 

下面介绍将webpack和esbuild结合的工具: esbuild-loader
#### install
`$ npm i -D esbuild-loader`
#### Quick Setup
 ```
  module.exports = {
    module: {
      rules: [
-       {
-         test: /\.js$/,
-         use: 'babel-loader',
-       },
+       {
+         test: /\.js$/,
+         loader: 'esbuild-loader',
+         options: {
+           loader: 'jsx',  // Remove this if you're not using JSX
+           target: 'es2015'  // Syntax to compile to (see options below for possible values)
+         }
+       },

        ...
      ],
    },
  }
```
原理
1.esbulder-loader 调用 esbulid 去打包js 代码。
2.esbuild是go写的，可以打包成二进制文件，不用再安装go相关环境。

#### 速度对比
Before:
![](https://upload-images.jianshu.io/upload_images/15312191-4de927aca2f3f44d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
After:
![](https://upload-images.jianshu.io/upload_images/15312191-bbc28ee5237260a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

结论：速度快了1/3左右，esbuilder-loader只能取代babal-loader的左右，像png,css等资源无法提供支持。
