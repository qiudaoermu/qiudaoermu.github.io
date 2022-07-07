---
title: "🌦🌦js前后端数字返回不一致"
date: 2022-04-01
tags: 
- 开发日常
---
场景：后端向前端通过一个接口返回一系列商品ID，前端通过商品ID去获取商品信息。
问题：前端请求，但是没有这个商品的信息
原因：后端返回的商品ID ，和前端获取的不一致，js数字采用64位双浮点数。
范围 -(2^53 ) <= number <= 2^53 
所以当后端返回数字不在这一区间时，前端会丢失。
比如：
![](https://upload-images.jianshu.io/upload_images/15312191-a62d13274a7b796a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
解决方法：后端转成字符串。

总结：js 简单弱类语言，这是设计不严谨的地方，导致很多混乱，
> [Javascript的10个设计缺陷](http://www.ruanyifeng.com/blog/2011/06/10_design_defects_in_javascript.html)
[C语言中关于float、double、long double精度及数值范围理解 ](http://blog.sina.com.cn/s/blog_6ebd49350101gdgo.html)
[Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
