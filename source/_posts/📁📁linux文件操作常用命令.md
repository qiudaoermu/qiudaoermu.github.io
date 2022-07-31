---
title: "📁📁linux文件操作常用命令"
date: 2021-10-16
tags: 
- 开发日常
---
##### 文件夹重命名 mv，mv相当于剪切操作
mv命令既可以重命名，又可以移动文件或文件夹。
例子：将目录name重命名为naming
```
mv /path/filename /targetPath/filename
```
##### 复制

```
copy /path/filename /targetPath/filename
```

##### 创建文件夹
```
mkdir group
```

###### 删除文件夹

删除文件夹 group

```
rm -rf group
```

###### 删除文件夹所有文件和文件夹

```
rm -rf *
```

##### Linux查找文件、文件夹
查找目录：find /（查找范围） -name '查找关键字' -type d
查找文件：find /（查找范围） -name 查找关键字 -print
例1：查找tomcat7文件夹所在的位置

```
find / -name 'tomcat7' -type d 
```

例2：查找server.xml文件的位置
```
find / -name 'server.xml' -print
```

##### 上传本地文件到服务器
```
scp /path/filename.zip username@servername:/path   
```

##### 上传文件夹
```
scp -r /path/folder username@servername:/path   
```
