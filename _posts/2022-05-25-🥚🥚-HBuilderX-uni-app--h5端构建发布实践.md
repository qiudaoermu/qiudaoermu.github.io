---
  layout: post
  tilte: "2022-05-25-🥚🥚-HBuilderX-uni-app--h5端构建发布实践.md"
  date: 2022-05-25-
  tags: 
    - 实践堂

---


* content
{:toc}


![](https://upload-images.jianshu.io/upload_images/15312191-b2e062b309c1d9c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 背景：
uni-app h5端，需要打包成文件上传到服务器，由于系统隔离原因，代码平台无法使用自身的构建工具，只能自己写一套了。
### 流程图
![](https://upload-images.jianshu.io/upload_images/15312191-dc8db027532072fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 架构图
![](https://upload-images.jianshu.io/upload_images/15312191-cad90345f278310a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

uni-app提供了两套机制，HBuilderX，GUI方式和vue-cli，团队选择了GUI。
可视化的方式比较简单，HBuilderX内置相关环境，开箱即用，无需配置nodejs。
### 客户端
#### 项目文件夹
![](https://upload-images.jianshu.io/upload_images/15312191-cc0ab2f10e4aff1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### HBuilderX本地静态资源构建
HBuilderX可以在界面构建也可以使用命令行构建方式:

`$ cli publish --platform h5 --project <projectName>`

打包文件夹地址 
`/unpackage/dist/build/h5/`

#### 压缩静态文件
安装 compressing
```
$ npm i  compressing -s
```
使用compressing对静态文件压缩，生成h5.zip
`compressDir.js`
```js
var compressing = require("compressing");
let fs = require("fs");

const options = {
  targetPath: "/unpackage/dist/build/h5/",
  outPut: "/unpackage/dist/build/h5.zip",
};

let pathout = process.cwd() + options.targetPath;
let outPath = process.cwd() + "/" + options.outPut;

compressing.zip
  .compressDir(pathout, outPath)
  .then(() => {
    console.log("compress h5 folder done...");
  })
  .catch((err) => {
    console.error("unzip");
  });

```

#### 上传到服务器

##### 上传静态资源h5.zip
安装 needle
```
$ npm i needle -S
```
服务端,needle上传到服务器
`needle.js`
```js
const needle = require("needle");
const fs = require("fs");
var colors = require("colors");

colors.setTheme({
  custom: ["white", "bgGreen"],
  error: ["white", "bgBlue"],
});
let pwd = process.cwd();
const buffer = fs.readFileSync(pwd + "/unpackage/dist/build/h5.zip");

// 服务器地址两个
let url = [
  "http://xxx/file/uploading",
  "http://xxx/file/uploading",
];
const data = {
  file: {
    buffer: buffer,
    filename: "mypackage.zip",
    content_type: "application/octet-stream",
  },
};

// the callback is optional, and needle returns a `readableStream` object
// that triggers a 'done' event when the request/response process is complete.
url.forEach((item) => {
  const site = item.replace("/file/uploading", "");
  console.log(`service ${site} uploading...`.error);

  needle.post(item, data, { multipart: true }, function (err, resp, body) {
    err && console.error(err);
    console.log(`service ${site} upload done...`.custom);
  });
});
```
### 服务端
在服务器上部署node服务传输文件
`app.js`，在linux上，1000端口起一个服务
```js
const express = require('express');
const compressing = require("compressing");
const app = express();
const multiparty = require('multiparty');
const fs = require('fs');


const path = require('path');
const rootPath = path.resolve(__dirname, './public');


/* 上传接口 */
app.post('/file/uploading', (req, res, next) => {
  /* 生成multiparty对象，并配置上传目标路径 */
  const form = new multiparty.Form();
  /* 设置编辑 */
  form.encoding = 'utf-8';
  // 设置文件存储路劲
  form.uploadDir = rootPath;
  // 设置文件大小限制

  // form.maxFields = 1000;   //设置所有文件的大小总和//上传后处理
  form.parse(req, (err, fields, files) => {
  
      const inputFile = files.file[0];
      const uploadedPath = inputFile.path;
    // nginx 静态资源指向目录
      const dstPath = rootPath + '/' + inputFile.originalFilename; 
      // 重命名为真实文件名
      fs.rename(uploadedPath, dstPath, (err) => {
        if (err) {
          console.log('rename error:' + err);
        } else {
          console.log('rename ok');
        }
      });
    }
    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
    res.write('200');
    res.end();
  });
});
app.listen(1000);

```

#### 一键发布
最后命令放在package.json中

```js
 "scripts": {
    "pub:prod": "cli publish --platform h5 --project xxx && npm run compress && npm run uploadToService",
    "compress": "node ./upload-script/compressDir.js",
    "uploadToService": "node ./upload-script/needle.js "
  },
```
```
$ npm run pub:prod
```
