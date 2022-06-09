---
title: "⛵︎验证码---(9)--CPU多任务原理"
date: 2021-11-30
tags: 
- 开发日常
---
### CPU三项基本工作
就是这样去执行读出数据、处理数据和往内存写数据


### 并发和并行
![](https://upload-images.jianshu.io/upload_images/15312191-836bbb0c9a25165c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![](https://upload-images.jianshu.io/upload_images/15312191-44810c215abacbeb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/15312191-3c2965f978dce7a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 进程和线程
进程

进程是程序的一次执行过程，是一个动态概念，是程序在执行过程中分配和管理资源的基本单位，一个进程就是一个程序的运行实例。

线程

线程是CPU调度和分派的基本单位，它可与同属一个进程的其他的线程共享进程所拥有的全部资源。

联系
线程是进程的一部分，一个线程只能属于一个进程，而一个进程可以有多个线程，但至少有一个线程。

区别：理解它们的差别，从资源使用的角度出发。（所谓的资源就是计算机里的中央处理器，内存，文件，网络等等）

根本区别：进程是操作系统资源分配的基本单位，而线程是任务调度和执行的基本单位

### 单核cpu实现多任务原理
![](https://upload-images.jianshu.io/upload_images/15312191-86faa3679995eeee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
对于单cpu，多个进程在这个单cpu中是并发运行，根据时间片读取上下文+执行程序+保存上下文

> [进程，线程与多核，多cpu之间的关系 ](https://www.cnblogs.com/valjeanshaw/p/11469514.html)
[并发与并行的区别是什么](https://www.zhihu.com/question/33515481/answer/1559913485)
[Chrome架构：仅仅打开了1个页面，为什么有4个进程？](https://time.geekbang.org/column/article/113513)
[CPU工作原理揭秘](https://wenku.baidu.com/view/8ab7d51902768e9950e73821.html?re=view)

> 备注：1毫秒(ms) = 1000(微秒)us
