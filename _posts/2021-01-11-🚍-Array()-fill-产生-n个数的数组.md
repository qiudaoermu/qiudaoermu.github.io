---
  layout: post
  tilte: "🚍-Array()-fill-产生-n个数的数组.md"
  date: 2021-01-11-
  tags: 
    - 开发日常

---


* content
{:toc}


> Array(length).fill(element) 

### 参数
length 填充长度
element   用来填充数组元素的值。
 ```js

 let codes = Array(26).fill(0).map((t,i) => i)
console.log(codes) // [0,1,2,3,4,5,6......25]

```
