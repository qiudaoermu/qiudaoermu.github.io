---
title: "🌈-CSS选择器中nth-child和nth-type-child的区别"
date: 2022-06-17
tags: 
- css
---
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
