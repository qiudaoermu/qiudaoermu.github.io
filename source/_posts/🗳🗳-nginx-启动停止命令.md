---
title: "🗳🗳-nginx-启动停止命令"
date: 2021-09-15
tags: 
- 开发日常
---
#### 启动
`
$ ./nginx
`
#### 重启nginx

 `
$ ./nginx -s reload
`
#### 查找nginx 位置
`
$ whereis nginx
`
![](https://upload-images.jianshu.io/upload_images/15312191-7226fcbc8ff137c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 检测 nginx.config正确性

```
nginx -t
```
![](https://upload-images.jianshu.io/upload_images/15312191-8ed56dd863c03961.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
