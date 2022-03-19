---
  layout: post
  tilte: "🔐-编程范式----shell-子文件异步模式-VS--JS-async-await.md"
  date: 2021-01-11-
  tags: 
    - 编程范式

---


* content
{:toc}


![](https://upload-images.jianshu.io/upload_images/15312191-4eed4d9a728d558a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

问题：在 shell 下有 A、B、C、D 四个命令,
需要先执行 A
再执行 B、C 
最后执行 D

其中, B、C 耗时较多， 但是，互不干扰，可以同步执
针对以上情形，bash提供了一个内置的命令来帮助管理异步执行。
wait命令可以让父脚本暂停，直到指定的进程（比如子脚本）结束。
## shell子进程 和 wait
```
./A
./B &  # 设为子进程
./C &
pid=$1
wait (pid)
./D
```
## javascript async
js 中的 async await 设计类似shell 中的这种异步模式，区别是 await 需要new Promise 包裹起来
```
async AllProcess = () => {
  A();
  await B();
  await C();
  D();
}
```
在shell中本身是文件包裹，相当于一个Promise了
