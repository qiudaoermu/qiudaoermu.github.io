---
title: "🌦🌦-为什么-export-default-var-a-=-1-在ES6中不被允许-"
date: 2021-10-19
tags: 
- 开发日常
---
babel输入以下代码，异常显示

![](https://upload-images.jianshu.io/upload_images/15312191-eacf86a1250bac4c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Only expressions, functions or classes are allowed as the `default` export.
**export default 只能导处函数 表达式 和 class**

 `
export default function() {}
`
`
export defaut {}
`
`
let foo = () => {};
export default foo
`

为什么不能这样导出呢，
避免出现下面的情况,多个参数导致的混乱
`export default var a, b, c;  // Non-sensical`
