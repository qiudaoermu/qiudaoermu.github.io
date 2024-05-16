---
title: "🌦🌦神秘的sass-node"
date: 2023-04-21
tags: 
- 开发日常
---
在安装sass-loader过程中，经常会有版本问题，比如

![](https://upload-images.jianshu.io/upload_images/15312191-7955787d8d51eb6c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`sass-node`是 C++ 写的npm原生包，原因是sass之前一直是C++,而且C++编译更快。

1.在`webpack`加载`sass-loader`时，`sass-loader`调用`sass-node`去编译`.sass`文件。

2.`sass-node`作为`C++`模块，需要适配不同平台，这就需要编译。
    这就是`node-gyp`，在执行`npm install`安装包含native模块时，`node-gyp`会自动编译这些模块。
在sass-node下载过程中，`node-gyp`会把`sass-node`编程成对应平台的二进制文件。

3.不同的`sass-loader`需要不同的`node-gyp`和对应的node.api，所以才有版本问题了。

