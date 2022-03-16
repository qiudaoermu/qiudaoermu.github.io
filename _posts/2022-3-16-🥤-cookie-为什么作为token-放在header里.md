---
  layout: post
  tilte: "🥤-cookie-为什么作为token-放在header里.md"
  date: 2022-3-16-
  tags: 
    - 开发日常

---


* content
{:toc}


  ### 现象：
后端配置了cores跨域，前端直接请求，没有通过代理，这样如果设置cookie，只能设置到， localhost里，request header 无法带过去

手动设置header Access-Token 
```
header: {
  Access-Token: Cookies.get("Access-Token")
}
```
![image.png](https://upload-images.jianshu.io/upload_images/15312191-16f1b76d63a8bef9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


通过代理，携带在在request header中的cookie,cookie自动带入，无须设置
![image.png](https://upload-images.jianshu.io/upload_images/15312191-2ed53c85c6d48246.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 原因：
1.cores技术成熟，后端配置方便

2.前端开发涉及的范围越来越广，小程序、hybrid、electron这些都不是纯粹的web 开发，后端既要处理原生的http请求又要处理web的http请求原生不是browser这意味着原生请求没有cookie，那么如果web和原生共用同一个api，这就意味着后端需要两套解析token的机制，何不直接就全放在header里面用同一套逻辑处理呢。

3.主要还是cookie会被浏览器自动带上, 劫持了才容易攻击.

