---
  layout: post
  tilte: "🍿-npm发布，package-json,-版本自动控制.md"
  date: 2021-10-21-
  tags: 
    - 开发日常
---
  npm 发包每次都手动改 version，好烦。。🤣
我们可以构建自己的workflow。

在我们的package.json里面有一个version字段。
那么，怎么在项目不断构建的过程中调整版本呢？
npm有一套自己的版本控制标准——Semantic versioning（语义化版本）

具体体现为：

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

主版本号：patch，当你做了不兼容的 API 修改，
次版本号：minor，当你做了向下兼容的功能性新增，
修订号：major，当你做了向下兼容的问题修正。

例如：我原本的项目是1.0.0版本的话
patch，变为1.0.1
minor，变为1.1.0
major，变为2.0.0

通过npm version <update_type>自动改变版本
update_type为patch, minor, or major其中之一，分别表示补丁，小改，大改。

npm publish之后会调用 prepare命令，我们可以利用这个hook搞事情🤔，在package.json这样配置
```
"scripts": {
    "build": "NODE_ENV=production webpack --progress",
    "prepare": "npm run build && npm --no-git-tag-version version patch"
  },
```

