---
title: "🌦🌦-js-二进制转字符串"
date: 2021-04-28
tags: 
- 开发日常
---
##### 十进制转二进制
```js
let num = 5;
num = num.toString(2) // "101"
```

#### 二进制转十进制
> parseInt(string, radix) 
radix：该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN

```js
let num = "101"
num = parseInt(num, 2); // 5
```
