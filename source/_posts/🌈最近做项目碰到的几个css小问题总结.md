---
title: "🌈最近做项目碰到的几个css小问题总结"
date: 2020-11-24
tags: 
- 开发日常
---
#1.display img变形

![image](https://upload-images.jianshu.io/upload_images/15312191-1fb2f5fe150894fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
<div>
    <img class='icon'/>
    <p>发票</p>
</div>
<style>
div {
  display:flex;
}
</style>
```
######原因：父元素，没设置 item-align 默认 sketch，导致图片被拉伸

在w3c上找到了解释：

If the cross size property of the flex item computes to auto, and neither of the cross-axis margins are auto, the flex item is stretched. Its used value is the length necessary to make the cross size of the item’s margin box as close to the same size as the line as possible, while still respecting the constraints imposed by min-height/min-width/max-height/max-width.

如果一个元素没设置 item-align属性，或者margin不为 auto,图片高度会覆盖交叉轴高度，同时仍然遵守最小高度/最小宽度/最大高度/最大宽度所施加的约束
######解决办法:
父元素设置 item-align: center
#2.子元素margin-top 父元素为什么掉下来
```
<style>
.bar {
    height: 5rem;
    background: #2b3cbf;
    position: relative
}
.bar img {
    width: 60%;
    margin-top: 1rem;
    height: 100%;
    margin-left: auto;
}
</style>
<div class="bar">
  <img src="/img/bar.6aa5b7d1.svg"/>
</div>
```
![image.png](https://upload-images.jianshu.io/upload_images/15312191-8e3f040a0117d6b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
######原因：
![image.png](https://upload-images.jianshu.io/upload_images/15312191-9ab4408b018de2ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
相邻元素之间没有border,margin,padding,并且在一个bfc里就会产生边距合并
######解决办法：
如上所说，给bar元素加上 border margin padding,或者让bar元素产生一个新的bfc，都可以解决问题
```
.bar{
    height: 5rem;
    background: #2b3cbf;
    position: relative;
    border-top: 1px solid #ddd; 设置一个上边距
}
```
![image.png](https://upload-images.jianshu.io/upload_images/15312191-6cd8a1273428c70e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
