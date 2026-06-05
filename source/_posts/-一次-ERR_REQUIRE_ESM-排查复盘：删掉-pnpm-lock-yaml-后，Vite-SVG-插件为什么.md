---
title: "-一次-ERR_REQUIRE_ESM-排查复盘：删掉-pnpm-lock-yaml-后，Vite-SVG-插件为什么"
date: 2026-06-04
tags: 
- 开发日常
---
![image.png](https://upload-images.jianshu.io/upload_images/15312191-a9c83d05c83f1acc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 前言

最近项目启动时突然遇到一个经典报错：

```bash
Error [ERR_REQUIRE_ESM]:
require() of ES Module
.../node_modules/svg-icon-baker/...
from
.../node_modules/vite-plugin-svg-icons-ng/dist/index.cjs
```

奇怪的是：

* 业务代码没改
* Vite配置没改
* package.json没改

唯一做过的事情只有：

```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

本以为是一次简单的依赖重装，没想到最后一路追查到了：

* pnpm锁文件
* SemVer版本规则
* 间接依赖升级
* Pure ESM
* Node20兼容机制

最终定位出了真正原因。

本文记录完整排查过程。

---

# 问题现象

执行：

```bash
pnpm dev
```

项目启动失败：

```bash
Error [ERR_REQUIRE_ESM]:
require() of ES Module
xxx/node_modules/svg-icon-baker/...
from
xxx/node_modules/vite-plugin-svg-icons-ng/dist/index.cjs
```

错误信息中最重要的是：

```text
from
vite-plugin-svg-icons-ng/dist/index.cjs
```

说明问题并不在业务代码。

而是在第三方依赖链。

---

# 第一步：顺着错误栈找调用链

打开：

```text
node_modules/vite-plugin-svg-icons-ng/dist/index.cjs
```

发现：

```js
'use strict';

const svgIconBaker = require('svg-icon-baker');
```

调用链立即变得清晰：

```text
我的项目
↓
Vite
↓
vite-plugin-svg-icons-ng
↓
dist/index.cjs
↓
require('svg-icon-baker')
```

问题变成：

> svg-icon-baker 到底是什么格式？

---

# 第二步：如何判断一个包是不是 Pure ESM？

很多人遇到 ERR_REQUIRE_ESM 时第一反应是：

```text
加 type:module
改 import
改 require
```

其实第一件事应该是：

```text
打开 package.json
```

直接查看目标包的元数据。

---

## 查看 svg-icon-baker

package.json：

```json
{
  "type": "module"
}
```

说明：

```text
默认按 ESM 解析
```

但仅凭这一项还不能完全确定。

---

继续查看 exports：

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "default": "./dist/index.mjs"
    }
  }
}
```

注意：

这里只有：

```text
import
default
```

没有：

```text
require
```

入口。

---

再看：

```json
{
  "main": "./dist/index.mjs"
}
```

直接指向：

```text
index.mjs
```

而不是：

```text
index.cjs
```

---

至此可以确定：

```text
svg-icon-baker
=
Pure ESM Package
```

即：

```text
纯 ESM 包
```

---

# 如何快速判断一个包是不是 Pure ESM？

以后拿到任何陌生包。

直接检查三处：

---

## 第一看 type

```json
{
  "type": "module"
}
```

---

## 第二看 exports

如果只有：

```json
{
  "import": "./dist/index.mjs"
}
```

或者：

```json
{
  "import": "./dist/index.mjs",
  "default": "./dist/index.mjs"
}
```

没有：

```json
{
  "require": "./dist/index.cjs"
}
```

大概率就是 Pure ESM。

---

## 第三看 main

如果：

```json
{
  "main": "./dist/index.mjs"
}
```

而不是：

```json
{
  "main": "./dist/index.cjs"
}
```

基本可以确认作者已经放弃 CommonJS 支持。

---

# 对比：什么叫 Dual Package？

再看 vite-plugin-svg-icons-ng：

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

同时存在：

```text
import
require
```

入口。

说明：

```text
vite-plugin-svg-icons-ng
=
Dual Package
```

即：

```text
同时支持 ESM 和 CommonJS
```

---

# 第三步：为什么会报 ERR_REQUIRE_ESM？

现在调用链已经完整：

```text
vite-plugin-svg-icons-ng
↓
index.cjs
↓
require('svg-icon-baker')
↓
svg-icon-baker(Pure ESM)
```

问题本质：

```text
CommonJS
↓ require
ESM
```

---

在 Node20.18 及以下：

```js
require('svg-icon-baker')
```

执行后：

```text
ERR_REQUIRE_ESM
```

直接报错。

---

# 第四步：我一开始为什么怀疑是 pnpm 缓存？

这是这次排查最大的误区。

项目 package.json 中写的是：

```json
{
  "vite-plugin-svg-icons-ng": "^1.3.0"
}
```

但每次安装后都是：

```text
vite-plugin-svg-icons-ng@1.9.1
```

于是我开始怀疑：

```text
pnpm store
pnpm cache
全局缓存
```

是不是缓存没有清理干净。

后来发现完全不是。

---

# pnpm Store 到底负责什么？

很多开发者容易误解。

pnpm Store：

```text
负责保存包文件
```

例如：

```text
vite-plugin-svg-icons-ng@1.9.1
```

下载后存到：

```text
~/.pnpm-store
```

供多个项目复用。

---

但它不负责决定：

```text
安装哪个版本
```

真正决定版本的是：

```text
package.json
+
pnpm-lock.yaml
```

---

# 真正的问题：SemVer + 删除锁文件

我的 package.json：

```json
{
  "vite-plugin-svg-icons-ng": "^1.3.0"
}
```

很多人会误认为：

```text
安装1.3版本
```

其实不是。

---

`^1.3.0` 的真实含义：

```text
>=1.3.0
<2.0.0
```

也就是说：

```text
1.3.0 ✔
1.4.0 ✔
1.5.0 ✔
1.8.0 ✔
1.9.1 ✔
```

全部合法。

---

# 为什么以前一直是1.3？

因为存在：

```text
pnpm-lock.yaml
```

锁文件。

例如：

```yaml
vite-plugin-svg-icons-ng:
  version: 1.3.2
```

无论仓库后来发布：

```text
1.4
1.5
1.6
1.7
1.8
1.9
```

项目始终安装：

```text
1.3.2
```

---

# 删除锁文件后发生了什么？

执行：

```bash
rm pnpm-lock.yaml
```

然后：

```bash
pnpm install
```

pnpm开始重新解析依赖树。

发现：

```text
^1.3.0
```

允许安装：

```text
<2.0.0
```

范围内的所有版本。

于是自动选择：

```text
1.9.1
```

即：

```text
当前满足条件的最新版本
```

---

# 真正的事故链

至此所有问题全部串起来了：

```text
删除 pnpm-lock.yaml
↓
失去版本锁定
↓
重新解析依赖树
↓
^1.3.0 被解析为 1.9.1
↓
vite-plugin-svg-icons-ng@1.9.1
↓
依赖 svg-icon-baker@2.x
↓
svg-icon-baker 变成 Pure ESM
↓
index.cjs 中 require(svg-icon-baker)
↓
Node20.18 以下无法兼容
↓
ERR_REQUIRE_ESM
```

---

# Node20.19 为什么能解决？

很多文章喜欢说：

```text
Node20 已经兼容 ESM
```

实际上并不准确。

真正重要的是：

```text
Node20.19+
```

之后。

---

Node20.18：

```text
require()
↓
发现目标是 ESM
↓
ERR_REQUIRE_ESM
```

---

Node20.19+：

```text
require()
↓
发现目标是 ESM
↓
调用 ESM Loader
↓
执行模块
↓
返回 Module Namespace Object
```

因此：

```js
require('svg-icon-baker')
```

不再直接报错。

---

# 最终解决方案

方案一：

升级 Node：

```text
>=20.19.0
```

推荐。

---

方案二：

恢复历史 lock 文件。

---

方案三：

固定依赖版本：

```json
{
  "vite-plugin-svg-icons-ng": "1.3.0"
}
```

避免未来版本漂移。

---

# 复盘总结

这次事故表面上是：

```text
ERR_REQUIRE_ESM
```

实际上根因是：

```text
删除 pnpm-lock.yaml
+
SemVer版本范围
+
依赖树漂移
```

最终触发：

```text
Pure ESM
+
旧版Node
```

兼容问题。

最大的收获不是学会了升级 Node。

而是掌握了一套排查思路：

看到 ERR_REQUIRE_ESM 时：

第一步看错误栈。

第二步找是谁在 require。

第三步打开目标包 package.json。

第四步判断它是不是 Pure ESM。

第五步检查依赖树是否发生漂移。

很多时候问题根本不在业务代码，而是在依赖链。


