---
title: "🎨🎨-git-Tips"
date: 2021-02-02
tags: 
- 开发日常
---
### 忽略文件
##### 对于未入库的文件

`touch .gitignore`

在文件中写入需要忽略的文件（如：*.diff  ……具体见链接），或者不遵循忽略原则的特例（文件前加“！”）

（注：只对untracked files有效）


##### 对于已入库的文件
`git update-index --assume-unchanged    $path + $file`

若以后不想忽略该文件的修改，则输入命令：
`git update-index --no-assume-unchanged $path + $file  `
### stash 单个文件
`$ git stash push -m "message" file_path`
