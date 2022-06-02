---
  layout: post
  tilte: "2022-05-15-🐓🥚docker打包node-js服务.md"
  date: 2022-05-15-
  tags: 
    - 实践堂

---


* content
{:toc}


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
`$ brew install --cask --appdir=/Applications docker`
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
ps: 镜像名/前是docker hub你的用户名
#### 查看docker内文件是否完整
`docker run -it --entrypoint sh chenxiaobei/node-alpine`
#### 运行docker镜像
` docker run -p 3000:3000 -d chenxiaobei/node-alpine`
#### 发布镜像
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

`docker run -dit   -p 3000:3000  chenxiaobei/node-alpine`
