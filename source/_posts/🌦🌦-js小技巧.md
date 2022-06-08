---
title: "🌦🌦-js小技巧"
date: 2021-01-11
tags: 
- 开发日常
---
### 1.Array().fill 产生 n个数的数组
> Array(length).fill(element) 

### 参数
length 填充长度
element   用来填充数组元素的值。
 ```js

 let codes = Array(26).fill(0).map((t,i) => i)
console.log(codes) // [0,1,2,3,4,5,6......25]

```

### 2.reduce 求和
`
let arr = [1, 2, 3]
`
`
let sum = arr.reduce((pre, cur) => pre + cur, 0)  // 6
`
>PS 注意 空数组, 如果空元素 reduce 会报错
