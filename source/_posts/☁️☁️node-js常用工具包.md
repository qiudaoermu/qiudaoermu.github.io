---
title: "☁️☁️node-js常用工具包"
date: 2021-10-18
tags: 
- 开发日常
---
### node 版本管理工具 --n
#### 安装:
`npm install -g n`
#### 使用
##### 列出可选择的 版本:
`$ n`
![](https://upload-images.jianshu.io/upload_images/15312191-91b5412616cf0d03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 安装某个 版本:
`$ n <version>`

### npm 代理管理工具 -- nrm
#### 安装:
`npm install -g nrm`
#### 使用
##### 列出可选择的源:
$ `nrm ls`

```js


  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
  
```
##### 切换使用的

$ `nrm use npm`
 
```            
   Registry has been set to: https://registry.npmjs.org/
```
