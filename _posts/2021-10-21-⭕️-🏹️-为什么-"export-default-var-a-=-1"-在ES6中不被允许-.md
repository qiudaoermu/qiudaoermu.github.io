babel 输入以下代码，异常显示

![image.png](https://upload-images.jianshu.io/upload_images/15312191-eacf86a1250bac4c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Only expressions, functions or classes are allowed as the `default` export.
**export default 只能导处函数 表达式 和 class**

`export default function() {}`
`export defaut {}`
`let foo = () => {}; export default foo`

为什么不能这样导出呢，
避免出现下面的情况,多个参数导致的混乱
`export default var a, b, c; // Non-sensical`

---

layout: post
title: "⛓-vue 中使 provide 中的数据变为响应式"
subtitle: ' "Hello World, Hello Blog"'
date: 2015-01-29 12:00:00
author: "Hux"
header-img: "img/post-bg-2015.jpg"
catalog: true
tags:

- 生活
- Meta

---
