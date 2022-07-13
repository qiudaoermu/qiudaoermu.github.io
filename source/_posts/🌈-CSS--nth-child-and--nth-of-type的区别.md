---
title: "🌈-CSS--nth-child-and--nth-of-type的区别"
date: 2022-06-17
tags: 
- css
---
#### nth-child and :nth-of-type 区别
如下demo
```
<section>
    <div>我是一个普通的div标签</div>
    <span>我是一个普通的span标签</span>
    <p>我是第1个p标签</p>
    <p>我是第2个p标签</p>  <!-- 希望这个变红 -->
</section>

```
p:nth-child(2)将不会选择任何元素。

而p:nth-of-type(2)表示父标签下的第二个p元素，显然，无论在div标签后面再插入个span标签，还是h1标签，都是第二个p标签中的文字变红。

这两者的差异用一个跟切合实际的情况比喻就是计划生育查人口：前者是如果是第二胎，且是女孩，罚款！后者是管他第几胎，第二个出身的女孩，罚款！

nth-of-type要比nth-child强大，常用，谁会遇到使用第二个，又是p元素的情况。

[w3c在线例子](https://www.w3schools.com/cssref/sel_nth-of-type.asp)

```
<!DOCTYPE html>
<html>
<head>
<style> 
/* Selects the second element of div siblings */
div:nth-of-type(2) p{
  color: red;
}


/* Selects every third element among any group of siblings */
:nth-of-type(3) {
  background: yellow;
}
</style>
</head>
<body>

<div>
<p>This is some text.</p>
</div>

<div>
<p>This is some text.</p>
<a>a</a>
</div>

<div>
<p>This is some text.</p>
</div>


</body>
</html>

```
![](https://upload-images.jianshu.io/upload_images/15312191-f7e8bd6a38d2b716.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 选择父元素下的第N个元素
```
<!DOCTYPE html>
<html>
<head>
<style>
ul > :nth-of-type(2){
  background:yellow;
}
</style>
</head>
<body>

<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Coca Cola</li>
</ul>

<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Coca Cola</li>
</ul>

</body>
</html>


```
![](https://upload-images.jianshu.io/upload_images/15312191-4b728113a92327dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

https://www.w3schools.com/cssref/tryit.asp?filename=trycss_sel_firstchild_more4
