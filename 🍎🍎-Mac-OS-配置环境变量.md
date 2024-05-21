---
title: "🍎🍎-Mac-OS-配置环境变量"
date: 2021-09-19
tags: 
- mac小天地
---
### Mac端环境变量配置
Mac使用bash做为默认的shell

MAC OS X环境配置的加载顺序
```
# 系统级别
/etc/profile
/etc/paths 

# 用户级别
~/.zshrc
```
前两个是系统级别的环境变量，针对所有用户，后面四个带有~/用户级别的环境变量。
-前两个环境配置在系统启动时候就会加载。
- **~/.zshrc** 是zsh shell打开时候加载

ps: 
>老mac 是使用**bash** ，配置对应**.bash_profile**文件
新版本mac默认使用zsh，需要再配置.zshrc（新建.zshrc）
配置内容：
```
if [ -f ~/.bash_profile ]; then
source ~/.bash_profile
fi
```


一、shell中可执行文件的两种执行方式

（1）绝对路径

比如，打开电脑上安装的python3，使用绝对路径方式打开为：
```
/usr/local/bin/python3
```
（2）使用PATH
将python3的绝对路径添加到PATH中，直接输入可执行文件名称时：
shell会根据PATH中提供的路径查找相应的可执行文件。

PATH的全局属性是指将PATH导入系统配置文件/etc/profile中，PATH的局部属性是指将PATH导入在使用的shell的配置文件/etc/zprofile中，也可以在当前用户的主目录下新建自己的专属配置文件～/.zshrc。
查看系统所有PATH：
```
echo $PATH
```
输出结果如下：
```
usr/local/opt/llvm/bin:/usr/local/opt/ruby/bin:/Applications/CMake.app/Contents/bin/:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/usr/local/share/dotnet:~/.dotnet/tools:/Library/Frameworks/Mono.framework/Versions/Current/Commands::/Users/chen/.rvm/bin
```
如果要新增一个PATH，比如某个文件夹下的可执行文件,**crowbar**命令
在.zshrc中新增：
```
export PATH="/Users/chen/github/Hexagon/参考代码的回归/crowbar_book_0_1:$PATH" 

//解析 现在的PATH是  /Users/chen/github/Hexagon/参考代码的回归/crowbar_book_0_1 + PATH
```
再次查看系统所有PATH：
```
/Users/chen/github/Hexagon/参考代码的回归/crowbar_book_0_1:/usr/local/opt/llvm/bin:/usr/local/opt/ruby/bin:/Applications/CMake.app/Contents/bin/:/Users/chen/github/emsdk:/Users/chen/github/emsdk/upstream/emscripten:/Users/chen/github/emsdk/node/14.18.2_64bit/bin:/usr/local/opt/llvm/bin:/usr/local/opt/ruby/bin:/Applications/CMake.app/Contents/bin/:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/usr/local/share/dotnet:~/.dotnet/tools:/Library/Frameworks/Mono.framework/Versions/Current/Commands::/Users/chen/.rvm/bin::/Users/chen/.rvm/bin
```
全局运行 **crowbar**
```
$ crowbar
$ usage:crowbar filename%
```
成功！

### Linux环境变量配置方法

Linux默认bash

1. Linux环境变量配置方法一： export PATH
```
export PATH=/home/uusama/mysql/bin:$PATH

# 或者把PATH放在前面
export PATH=$PATH:/home/uusama/mysql/bin

```

注意事项：

- 生效时间：立即生效
- 生效期限：当前终端有效，窗口关闭后无效
- 生效范围：仅对当前用户有效
- 配置的环境变量中不要忘了加上原来的配置，即$PATH部分，避免覆盖原来配置

2.Linux环境变量配置方法二：vim ~/.bashrc
和Mac一样
```
vim ~/.bash_profile
```
# 在最后一行加上
```
export PATH=$PATH:/home/uusama/mysql/bin
```

注意事项：

- 生效时间：使用相同的用户打开新的终端时生效，或者手动source ~/.bash_profile生效
- 生效期限：永久有效
- 生效范围：仅对当前用户有效
- 如果没有~/.bash_profile文件，则可以编辑~/.profile文件或者新建一个
> [# shell有哪些？Zsh和Bash的区别是什么？](https://www.jianshu.com/p/a891af6f87e0)
