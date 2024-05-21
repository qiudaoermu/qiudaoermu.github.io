---
title: "-🌦🌦nodejs做服务器和服务代理"
date: 2023-12-12
tags: 
- 开发日常
---
最近遇到在 windows2008部署前端项目的问题，tomact 和 ng 都不太合适小项目，而且配置比较复杂，使用 node搞个服务器吧
把打包好的静态文件放在 dist 文件夹下,目录如下：
-dist
  --assets
  -- index.html
### 服务器 express
```js
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = 3001;

const STATIC = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC, 'index.html');

const app = express();
// Static content
app.use(express.static(STATIC));


// All GET request handled by INDEX file
app.get('*', function (req, res) {
  res.sendFile(INDEX);
});

// Start server
app.listen(PORT, function () {
  console.log('Server up and running on ', `http://localhost:${PORT}/`);
});

```
搞好服务器，后端小伙伴 cors 跨域也不会弄，只能自己代理了
### 代理工具 http-proxy-middleware
```
const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = 3001;

const STATIC = path.resolve(__dirname, 'dist');
const INDEX = path.resolve(STATIC, 'index.html');

const app = express();
// Static content
app.use(express.static(STATIC));
+ app.use(
+ '/userCode', // 请求 localhost:3001/userCode/login ->  
+ createProxyMiddleware({
+    target: 'http://10.1.81.45:9080/pf2/', //'http://10.1.81.45:9080/pf2//userCode/login
+   changeOrigin: true,
+  }),
+);


// All GET request handled by INDEX file
app.get('*', function (req, res) {
  res.sendFile(INDEX);
});

// Start server
app.listen(PORT, function () {
  console.log('Server up and running on ', `http://localhost:${PORT}/`);
});
```
