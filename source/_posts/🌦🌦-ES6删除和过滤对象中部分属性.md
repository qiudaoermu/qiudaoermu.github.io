---
title: "🌦🌦-ES6删除和过滤对象中部分属性"
date: 2021-01-11
tags: 
- 开发日常
---
原始数据
```js

let student={
    age: 20,
    name: 'maomao',
    sex: "男"
}

```
排除"age"属性
```js

let { age, ...params } = student
console.log(params)  // {name: "maomao"，sex: "男"}

```
