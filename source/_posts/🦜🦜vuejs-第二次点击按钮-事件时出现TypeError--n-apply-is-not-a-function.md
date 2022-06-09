---
title: "🦜🦜vuejs-第二次点击按钮-事件时出现TypeError--n-apply-is-not-a-function"
date: 2020-12-24
tags: 
- 开发日常
---
![image.png](https://upload-images.jianshu.io/upload_images/15312191-6ab605c0603018b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

add 是方法又是属性，
第一次点击之后，this.add = true 成为一个属性
第二点击，add 就会报错
