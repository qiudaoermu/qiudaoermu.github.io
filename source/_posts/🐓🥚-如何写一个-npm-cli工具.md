---
title: "🐓🥚-如何写一个-npm-cli工具"
date: 2021-09-11
tags: 
- 开发日常
---
![](https://upload-images.jianshu.io/upload_images/15312191-95b4a2d210e8cf21.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 前言
用过构建工具的亲们知道，通常通过全局安装一个 xxx-cli 的 npm 包，就能在命令行用命令进行构建。那么这个 npm 包如何变成一个可执行的命令呢？
### npm cli 开发步骤
#### 1. 使用 npm init 初始化一个项目目录 keep-cli。
#### 2. 在 package.json 中添加或者编辑 bin 字段：
```
{
  "name": "keep-cli",
  ...,
  "bin": {
    "command-name": "jsfile" // path of jsfile relative to package.json
  },
  ...
}
```

commandName 就是命令的名字，jsfile 就是当用户键入命令时的处理程序。

#### 3.代码开发。必须在 jsfile 文件的第一行写这行命令 #!/usr/bin/env node，譬如：
```js

#!/usr/bin/env node
const program = require('commander');
const packageJson = require('../package');

let defaultJsProcessors = [ 'react' ];
let defaultStyleProcessors = [ 'sasslike' ];
let defaultWebpackVersion = '4';

function parseListArgv( val ) {
  if ( val ) {
    return val.split( ',' );
  } else {
    return [];
  }
}

program
  .version( packageJson.version, '-v, --version' )
  .option( '-u, --use-version <version-number>', 'Webpack version' )
  .option( '-j, --js-processors <processors>', 'Specify javascript processors', parseListArgv )
  .option( '-s, --style-processors <processors>', 'Specify style(css,image,fonts) processors', parseListArgv )
  .option( '--no-install', 'Do not install devDependncies package' )
  .parse( process.argv );


let jsProcessors = program.jsProcessors || defaultJsProcessors;
let styleProcessors = program.styleProcessors || defaultStyleProcessors;
let webpackVersion = program.useVersion || defaultWebpackVersion;

if ( webpackVersion=='4' ) {
  // code
} else {
  // code
}

```
### npm cli 运行原理
#### Unix-like 平台

1.当全局安装 npm 包的时候，npm 会把 package.json 中 bin 配置的 command-name 添加到系统 *$PATH*中去。

拿 macOS 举例，npm 会在 /usr/local/bin 下创建一个以 command-name 为名字的软链接，指向全局安装下来的 
/usr/local/lib/node_modules/my-cli 包下面的 js：jsfile。（/usr/local/bin 是在 $PATH 中的）

**如果全局安装keep-cli：**

**/usr/local/bin 目录**

![](https://upload-images.jianshu.io/upload_images/15312191-3c94e5717f0489c8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**/usr/local/lib/node_modules 目录**
![](https://upload-images.jianshu.io/upload_images/15312191-330c359092014f3b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



2.在命令行键入 command-name 相当于执行了文本文件 jsfile。

3.在执行的时候碰到第一行 #!/usr/bin/env node，这是一个 shebang 行。这行告诉系统使用 node 去执行当前文件。（shebang 只有在Unix-like平台才有）

4.执行 js 文件。这里有一个问题：#! 并不是一个符合 js 语法的语句，理论上直接执行是会有 syntax error 的。但是 node 对 shebang 行做了例外处理，所以用 node 执行带 shebang 行的 js 文件是没有问题的。

#### Windows 平台
1.全局安装会把包安装到 C:\Users\username\AppData\Roaming\npm\node_modules下面，然后在 C:\Users\username\AppData\Roaming\npm 生成一个以 command-name 为名字的 cmd 文件：command-name.cmd。（C:\Users\username\AppData\Roaming\npm 在安装 npm 时被加入到 %PATH% 中）

2.在 Windows 平台运行 cmd 文件是不需要后缀名的，所以当在命令行键入 command-name 相当于执行 C:\Users\username\AppData\Roaming\npm\command-name.cmd。

3.为什么有这个 cmd 文件，因为 windows 平台没有 shebang，那么 command-name.cmd 就模拟了 #!/usr/bin/env node 的功能，调用 C:\Users\username\AppData\Roaming\npm\node_modules\my-cli\ jsfile
