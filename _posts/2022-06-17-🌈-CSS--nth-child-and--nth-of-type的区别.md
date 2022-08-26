---
  layout: post
  tilte: "2022-06-17-🌈-CSS--nth-child-and--nth-of-type的区别.md"
  date: 2022-06-17-
  tags: 
    - css

---


* content
{:toc}


![](https://upload-images.jianshu.io/upload_images/15312191-278db726a1c680d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### nth-child and :nth-of-type 区别
在写网页的时候，有时候需要对子元素区分，比如只修改第N个元素。
![](https://upload-images.jianshu.io/upload_images/15312191-506c6075bd730280.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
比如上面的四个li,不同的li设置不同的颜色，这就需要用到CSS伪类选择器**:nth-of-type**。
```
 li {
    &:nth-of-type(1) {
                h4 {
                  color: red;
                }
    }
    &:nth-of-type(2) {
                h4 {
                  color: #14dd9f;
                }
      }
     &:nth-of-type(3) {
                h4 {
                  color: #fc8b7f;
                }
      }
     &:nth-of-type(4) {
                h4 {
                  color: #2bb9ff;
                }
              }
     }
```

子选择器还有 :nth-child，两者区别如下demo：

```
<style>
p:nth-child(2){
  color:green;
}
p:nth-of-type(2) {
  color:red;
}
</style>
<section>
    <div>我是一个普通的div标签</div>
    <span>我是一个普通的span标签</span>
    <p>我是第1个p标签</p>
    <p>我是第2个p标签</p>  <!-- 希望改变这个颜色 -->
</section>

```
p:nth-child(2)将不会选择任何元素。

而p:nth-of-type(2)表示父标签下的第二个p元素，显然，无论在div标签后面再插入个span标签，还是h1标签，都是第二个p标签中的文字变红。

这两者的差异用一个跟切合实际的情况比喻就是计划生育查人口：前者是如果是第二胎，且是女孩，罚款！后者是管他第几胎，第二个出身的女孩，罚款！

nth-of-type要比nth-child强大，常用，谁会遇到使用第二个，又是p元素的情况。



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
