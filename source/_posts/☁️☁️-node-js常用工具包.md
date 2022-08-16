---
title: "☁️☁️-node-js常用工具包"
date: 2021-10-18
tags: 
- 开发日常
---

![](https://upload-images.jianshu.io/upload_images/15312191-a2fc698a18d33959.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 进程版本管理
---
#### node 版本管理工具 --n
##### 安装:
`npm install -g n`

##### 列出可选择的 版本:
`$ n`
![](https://upload-images.jianshu.io/upload_images/15312191-91b5412616cf0d03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 安装某个 版本:
`$ n <version>`

#### npm 代理管理工具 -- nrm
##### 安装:
`npm install -g nrm`

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
#### [pm2](https://www.npmjs.com/package/pm2)
node.js 进程管理工具
![](https://upload-images.jianshu.io/upload_images/15312191-3b0c37857ad77a75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### [nodemon](https://www.npmjs.com/package/nodemon)
监测文件变化，神器
#### [yalc](https://www.npmjs.com/package/yalc)
代替 npm link，调试lib包，保证HRM

### Lib工具包
---
- [node-ssh](https://www.npmjs.com/package/node-ssh)
node端登录ssh登录工具

- [fs-extra](https://www.npmjs.com/package/fs-extra)
promise包裹的fs，便于同步操作
- [download](https://www.npmjs.com/package/download)
下载解析文件

- [needle](https://www.npmjs.com/package/needle)
The leanest and most handsome HTTP client in the Nodelands.
node http传输工具
 - [compressing](https://www.npmjs.com/package/compressing)
The missing compressing and uncompressing lib for node.
解压缩工具
- [multiparty](https://www.npmjs.com/package/multiparty)
multipart/form-data格式解析

- [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)
http代理转发
- [cross-env](https://www.npmjs.com/package/cross-env)
 With POSIX, you use: $ENV_VAR and on windows you use %ENV_VAR%.
跨平台变量设置
### CLI
---
- [figlet](https://www.npmjs.com/package/figlet)
控制台艺术字
```
___________.___  ________.__          __          __        
\_   _____/|   |/  _____/|  |   _____/  |_       |__| ______
 |    __)  |   /   \  ___|  | _/ __ \   __\      |  |/  ___/
 |     \   |   \    \_\  \  |_\  ___/|  |        |  |\___ \
 \___  /   |___|\______  /____/\___  >__| /\ /\__|  /____  >
     \/                \/          \/     \/ \______|    \/
```
- [chalk](https://www.npmjs.com/package/chalk)

   彩色字体打印

![](https://upload-images.jianshu.io/upload_images/15312191-56166ee55f0bc179.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- [inquirer](https://www.npmjs.com/package/inquirer)
控制台命令接口
```
? 请选择模板类型 (Use arrow keys)
❯ vue
  react
```
- [ora](https://www.npmjs.com/package/ora)
控制台loading
![](https://upload-images.jianshu.io/upload_images/15312191-c61215bfa11ad4a5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- [download-git-repo](https://www.npmjs.com/package/download-git-repo)
git仓库下载

