---
  layout: post
  tilte: "2021-08-15-🥚🥚npm发布，package-json,-版本自动控制.md"
  date: 2021-08-15-
  tags: 
    - 实践堂

---


* content
{:toc}




###痛点
npm 发包每次都手动改 version，好烦。。🤣



### 解决办法：Semantic versioning
#### npm version Patch
在我们的package.json里面有一个version字段。


那么，怎么在项目不断构建的过程中调整版本呢？

npm有一套自己的版本控制标准——Semantic versioning（语义化版本）


具体体现为：

版本格式：**主版本号** **次版本号**  **修订号**，版本号递增规则如下：

主版本号：patch，当你做了不兼容的 API 修改，
次版本号：minor，当你做了向下兼容的功能性新增，
修订号：major，当你做了向下兼容的问题修正。



自动改变版本

$ `npm version <update_type>`
#### [参数](update_type)

##### update_type: `patch(补丁)`, `minor(小改)`, `major(大改)`

例如：我原本的项目是1.0.0版本的话

patch => 1.0.1

mino => 1.1.0


major => 2.0.0


#### npm hook
`npm publish`之后会调用 `prepare`命令，我们可以利用这个hook搞事情🤔

package.json:
```
"scripts": {
    "build": "NODE_ENV=production webpack --progress",
    "prepare": "npm run build && npm --no-git-tag-version version patch"
  },
```

