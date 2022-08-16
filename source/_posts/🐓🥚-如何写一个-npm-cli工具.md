---
title: "🐓🥚-如何写一个-npm-cli工具"
date: 2021-09-11
tags: 
- 开发日常
---
![](https://upload-images.jianshu.io/upload_images/15312191-95b4a2d210e8cf21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 前言
用过构建工具的亲们知道，通常通过全局安装一个 xxx-cli 的 npm 包，就能在命令行用命令进行构建。那么这个 npm 包如何变成一个可执行的命令呢？


### npm cli 运行原理


1.当全局安装 npm 包的时候，npm 会把 package.json 中 bin 配置的 command-name 添加到系统 *$PATH*中去。

拿 macOS 举例，npm 会在 /usr/local/bin 下创建一个以 keep 为名字的软链接，指向全局安装下来的 
/usr/local/lib/node_modules/my-cli 包下面的 js：keep。（/usr/local/bin 是在 $PATH 中的）

**如果全局安装keep-cli：**

**/usr/local/bin 目录**

![](https://upload-images.jianshu.io/upload_images/15312191-3c94e5717f0489c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**/usr/local/lib/node_modules 目录**
![](https://upload-images.jianshu.io/upload_images/15312191-330c359092014f3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



2.在命令行键入 keep 相当于执行了文本文件 keep。

3.在执行的时候碰到第一行 #!/usr/bin/env node，这是一个 shebang 行。这行告诉系统使用 node 去执行当前文件。（shebang 只有在Unix-like平台才有）

4.执行 js 文件。这里有一个问题：#! 并不是一个符合 js 语法的语句，理论上直接执行是会有 syntax error 的。但是 node 对 shebang 行做了例外处理，所以用 node 执行带 shebang 行的 js 文件是没有问题的。
### npm cli 开发步骤
使用 npm init 初始化一个项目目录 keep-cli，在 package.json 中添加或者编辑 bin 字段。
```
{
  "name": "keep-cli",
  ...,
  "bin": {
    "keep": "bin/keep",
    "keep-create": "bin/keep-create",
    "keep-list": "bin/keep-list"
  },
  ...
}
```



#### 使用 `commander` 输入命令
代码开发。必须在 keep文件的第一行写这行命令 #!/usr/bin/env node，譬如：

```js

#!/usr/bin/env node
const program = require('commander');

// 定义四个指令
program
  .version(require("../package").version)
  .usage("<command> [options]")
  .command("list", "list all the templates")
  .command("create", "generate a new project from a template");

program.parse(process.argv);

```
同理在文件夹新增两个文件
![](https://upload-images.jianshu.io/upload_images/15312191-57140c996d996352.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




#### 使用 `inquirer`控制台做询问选择

![](https://upload-images.jianshu.io/upload_images/15312191-8a602ddf2c881666.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

根据不同的选择下载不同的模板。
![](https://upload-images.jianshu.io/upload_images/15312191-715560d00aea4855.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

完成。。。。。
