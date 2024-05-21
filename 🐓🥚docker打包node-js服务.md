---
title: "🐓🥚docker打包node-js服务"
date: 2022-05-15
tags: 
- 实践堂
---
![](https://upload-images.jianshu.io/upload_images/15312191-03e1c7414cd9ad88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 背景：
把node.js服务放在linux上，每次都要搞一堆配置。
### 解决方法： 
使用docker打包
有当前node 项目，向前端展示某个文件下的文件
![](https://upload-images.jianshu.io/upload_images/15312191-956c3d0469a168fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
app.js 展示文件列表的小软件
```js
const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.static('public'));

const path = require('path');
let rootPath = path.resolve(__dirname, './public');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});


app.get('/file/getList',(req,res,next) => {
  var readDir = fs.readdirSync(rootPath);
  console.log(readDir);
  res.send({
    code: 200,
    data: readDir
  })
})

app.use(express.static('public'))
  .listen(3000);

```

#### 安装dokcer:
##### mac 
`$ brew install --cask --appdir=/Applications docker`
##### linux
Docker的自动化安装
Docker官方和国内daocloud都提供了一键安装的脚本，使得Docker的安装更加便捷。
官方的一键安装方式：
```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```
国内 daocloud一键安装命令：
```
curl -sSL https://get.daocloud.io/docker | sh
```
#### 设置镜像
阿里云有免费镜像，可以申请；
```
sudo mkdir -p /etc/docker // 创建文件夹
// tee 创建文件并输入内容
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://dxrbo5kv.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
#### 创建 Dockerfile 文件:
`touch Dockerfile`

```
FROM node:8-alpine 

# Create app directory
WORKDIR /app

COPY package.json app.js index.html ./
COPY public ./public

#  Install app dependencies
RUN npm install

CMD ["npm", "start"]
```
#### 构建docker镜像
`docker build  . -t chenxiaobei/node-alpine`  

docker的镜像会运行在容器上 --name [容器名], 不写默认镜像名

ps: 镜像名/前是docker hub你的用户名
#### 查看docker内文件是否完整
`docker run -it --entrypoint sh chenxiaobei/node-alpine`

#### 运行docker镜像
` docker run -p 3000:3000 -d chenxiaobei/node-alpine`

#### 发布镜像(也可以发布到阿里云私有镜像)
`docker push chenxiaobei/node-alpine`
在https://hub.docker.com/上查看
![](https://upload-images.jianshu.io/upload_images/15312191-4279ab9c9914f4cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### linux安装docker
`curl -sSL https://get.daocloud.io/docker | sh`
#### linux启动docker
`systemctl start docker`
#### 服务器拉取镜像
`docker pull chenxiaobei/node-alpine`
#### 服务器运行镜像

`docker run -d it   -p 3000:3000  chenxiaobei/node-alpine`
#### 查看容器
```
docker ps -a
```
#### 进入docker容器
```
dokcer exec -it [容器ID/容器name] bash
```

#### docker 文件映射

在创建Docker容器时，想要与本地路径进行映射共享文件，使用`docker run -v`指令，例如我需要将本地的的`/root/code`路径映射到容器内的`/data/code`路径，使用如下指令，冒号前为宿主机路径，冒号后为容器路径，其中xxx为镜像完整路径
```shell
docker run -it -v /root/code:/data/code -d -p 3000:3000  chenxiaobei/node-alpine
```

> [Requires: container-selinux >= 2.9 报错](https://blog.csdn.net/qq_43058911/article/details/105839136)
