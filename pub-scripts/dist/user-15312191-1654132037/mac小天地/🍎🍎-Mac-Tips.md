### Mac关闭指定端口
先执行如下命令
```
lsof -i:端口号
```
会有类似下面的结果：
![image.png](https://upload-images.jianshu.io/upload_images/15312191-c30f1e7e5dcc7cd3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
然后执行： 
```
kill -9 42624
```
结束进程就搞定了
###  Mac 终端开启和关闭代理的方法
假如你的代理机是你的本机（127.0.0.1），代理的端口为 7070，


开启代理很简单，就是用 export 命令设置全局变量 http_proxy 和 https_proxy：
```
export http_proxy="http://127.0.0.1:7070"
export https_proxy="http://127.0.0.1:7070"
```
关闭代理就是用 unset 命令把全局变量清空：

$ `unset http_proxy`

$ `unset ftp_proxy`

$ `unset all_proxy`

$ `unset https_proxy`

$ `unset no_proxy`

查看是否还存在代理
```
env | grep -i proxy
```
> ps : 清空代理需要重新打开 terminal
