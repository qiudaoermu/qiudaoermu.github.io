---
title: "🎨🎨-git-设置文件大小写敏感"
date: 2021-01-15
tags: 
- 开发日常
---
### 方法一

命令设置Git大小写敏感：
```
git config core.ignorecase false
```
### 方法二

找到项目的 .git 文件夹（window默认是隐藏的，设置显示隐藏的项目即可出现） 下的 config 文件打开，将

ignorecase = true 设置成 ignorecase = false

git文件大小写敏感导致的问题，在有些mac上，文件大小写是不敏感的。

### 比如两个同学，小a的电脑大小写不敏感，小b的电脑大小写敏感。
1.小a 提交了一个 文件 Out.vue, 路径/admin/out.vue

2.小b拉pull 代码，结果路径找不到文件。

3.小b找小a,让小a把Out.vue 改成 out.vue

4.小a 本地git 大小写不敏感，修改文件，发现git add 发现没有任何修改

5.设置git 大小写敏感，代码问题解决。

6.为了避免类似问题再次发生，小a需要把电脑设置为大小写敏感
> 设置mac 系统为大小写敏感(https://www.jianshu.com/p/24fd2a0ae493)  
