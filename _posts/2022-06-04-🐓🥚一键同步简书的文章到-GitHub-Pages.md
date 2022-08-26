---
  layout: post
  tilte: "2022-06-04-🐓🥚一键同步简书的文章到-GitHub-Pages.md"
  date: 2022-06-04-
  tags: 
    - 实践堂

---


* content
{:toc}


![](https://upload-images.jianshu.io/upload_images/15312191-780274cb6f0ef886.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

简书的文章写完后，想同步到github的博客，这样你的博客有可能送到北极也说不定呢🥳🥳。

首先你要有一个github Page，现在有ruby和node.js版的，我用的这个[模版](https://github.com/Huxpro/huxpro.github.io)，jekyll，免费快速搭建博客模版，你也可以选择其它的。
#### 1.创建github Page

##### 1.1 新增仓库 **userName.github.io**，让后就可以打开这个https://userName.github.io

##### 1.2 下载仓库代码 **https://github.com/Huxpro/huxpro.github.io**到你的仓库

#### 2.利用脚本下载简书文章

下载userName.github.io仓库代码，在项目根目录中建立如下文件夹
![](https://upload-images.jianshu.io/upload_images/15312191-cd7b966ad6e65360.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
新建 setUp.js,这里只展示主要代码，详细信息可查看[github仓库](https://github.com/qiudaoermu/qiudaoermu.github.io.git)

#####   2.1下载简书文章

简书有一键下载功能，
![](https://upload-images.jianshu.io/upload_images/15312191-5a27fb2fd4e2739f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接口：`https://www.jianshu.com/backup/download`
我写了一个脚本，可以直接下载到本地
```diff
(async () => {
 await download(
  config.downloadUrl, // 下载连接 https://www.jianshu.com/backup/download
  config.downloadPath,  // 下载后的文件路径
{
    headers: {
      Cookie: config.cookie, // 你的简书cookie，很好找的
    },
  });
})()
```

##### 2.2 解压下载文章压缩包

删除上次解压的文件夹，找到最新的压缩文件，加压到**output**文件夹

```
unCompress() {
    this.deleteUnrarDir();
    const inputRarPath = this.newestRar();
    exec(
      `unar  ${inputRarPath}  -o ${this.unRarPath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        // 简书文章分为不同累不，解压到不同文件夹
        let childDirs = fs.readdirSync(this.unCompressPath());
        childDirs.forEach((item) => {
          file.addTags(this.unCompressPath() + "/" + item + "/");
        });
        if (stderr) console.error(`stderr: ${stderr}`);
      }
    );
  }
```
##### 2.3 为文章打Tag

jekyll要根据文件头的Tag，生成文章信息，标题，日期，文章分类。格式如下

```
---
  layout: post
  tilte: "2018-12-08-🦕🦕---React-如何阻止事件冒泡？.md"
  date: 2018-12-08-
  tags: 
    - 开发日常
---

```

output里的文章打Tag后，复制到_post(默认文件夹)里，文章头如果没有日期，自动加上

```js
  addTags(unarTagPath) {
    // unarTagPath ...output


    fs.readdir(unarTagPath, "utf8", (err, fileList) => {
      if (err) throw err;
      fileList.forEach((excludeDatePrexFile) => {
        // 获取文件后缀名
        const filePath = unarTagPath + excludeDatePrexFile;
        const postContent = this.readFile(
          filePath,
          excludeDatePrexFile,
          this.prex
        );
        this.addTagsOnHeader(filePath, postContent);

        this.renameFileByAddDatePrexInUnarTagPath(
          unarTagPath,
          this.prex,
          excludeDatePrexFile
        );
      });
    });
  }
```


#### 3.提交到github

github会自动构建你发布的文章



#### 遇到的问题，集中在：
1.了解http协议 （request，response）
2.如何处理不同场景下的响应体 （response， body）
3.响应头中的 content-type 与响应数据对应的关系
4.简书markdown，解析和jekyll不太一样，可能会样式错乱


