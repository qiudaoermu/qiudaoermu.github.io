---
title: "📁📁-rsync更改chmod-权限"
date: 2022-10-25
tags: 
- 开发日常
---
最近碰到一个问题，scp 文件上传到服务器没有权限。

### scp，rsync

scp 没有权限参数，使用另一个工具 ```rsync```,可以在上传中配置文件权限。

#### 复杂写法

```
rsync --perms --chmod=u+rwx ./testfile ./testfile2
rsync --perms --chmod=g+rwx ./testfile ./testfile2
rsync --perms --chmod=o+rwx ./testfile ./testfile2
```

.e. add (+) permissions for user (u), group (g) or other (o) respectively.
Also (a)=all is successful:

#### 简单写法
```
sudo rsync --perms --chmod=a+rwx ./testfile ./testfile2
```
or
```
sudo rsync --perms --chmod=ugo+rwx ./testfile ./testfile2
```
### 文件权限表

![](https://upload-images.jianshu.io/upload_images/15312191-5b64bf967c87d52e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 最高权限
```
chmod -R 777 dictionary/file
```
