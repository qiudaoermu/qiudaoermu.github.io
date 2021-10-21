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
