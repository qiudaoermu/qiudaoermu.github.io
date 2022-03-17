---
  layout: post
  tilte: "😄😁-读取后端验证码-（五）-chrome浏览器渲染图片,cross-plateform.md"
  date: 2022-03-16-
  tags: 
    - 开发日常

---


* content
{:toc}


## 问题：chrome怎么跨平台
chrome 在安卓，iOS，Mac,windows,linux都有安装包，chrome作为浏览器怎么做到兼容问题的呢。

## chrome渲染图像过程

`html => dom => skia `
`webGl => openGL`

![](https://upload-images.jianshu.io/upload_images/15312191-7e4f1719e8dc88b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 解决方案：skia 

 **Skia Graphics Library**（SGL）是一个由C++编写的开放源代码图形库
Skia主要的类别是SkCanvas，所有的绘图功能都是实现于此类别。以下是SGL简单的代码：

```c
SkCanvas* can = GraphicsJNI::getNativeCanvas(...);      
SkPaint paint;    
paint.setARGB(255, 0, 0, 255);
can->drawText("Hello, world", 12, 10, 10, paint);
```

>[一颗像素的诞生](https://mp.weixin.qq.com/s/QoFrdmxdRJG5ETQp5Ua3-A)\
[Life of a pixe](https://www.youtube.com/watch?v=m-J-tbAlFic)
> [skia简介](https://www.daimajiaoliu.com/daima/47da647f6900408)
