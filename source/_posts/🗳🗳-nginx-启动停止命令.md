---
title: "🗳🗳-nginx-启动停止命令"
date: 2021-09-15
tags: 
- 开发日常
---
#### 启动
```
$ ./nginx
```

#### 查看nginx 的状态 
ps -ef | grep nginx  出现master 则启动成功
![](https://upload-images.jianshu.io/upload_images/15312191-8458f03006e93406.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 关闭nginx

```
kill -9 9658(进程号 上面的) 
```

#### 停止 nginx 命令
```
./nginx -s stop
```
#### 重启nginx

 ```
$ ./nginx -s reload
```
#### 查找nginx 位置
```
$ whereis nginx
```
![](https://upload-images.jianshu.io/upload_images/15312191-7226fcbc8ff137c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 检测 nginx.config正确性

```
nginx -t
```
![](https://upload-images.jianshu.io/upload_images/15312191-8ed56dd863c03961.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
