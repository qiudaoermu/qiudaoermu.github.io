---
title: "🌦🌦-js小技巧"
date: 2021-08-12
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
let sum = arr.reduce((pre, cur) => pre + cur)  // 6
`
>PS 注意 空数组, 如果空元素 reduce 会报错

### 3.向数组指定位置插入元素
#### splice() 方法
> splice(startIndex,deleteNum,item)
startIndex: 插入位置
deleteNum: 删除数量
item:  插入元素

splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

##### 方法实例:

```js
// 在数组指定位置插入

var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");

//输出结果
//Banana, Orange, Lemon, Kiwi, Apple, Mango
//在 2 的位置删除0个，新增 "Lemon", "Kiwi"

```

### 4. 删除最后一个字符串的方法

`stringObject.substr(start, length)`

>用于返回一个从指定位置开始的指定长度的子字符串。
start（必需）：所需的子字符串的起始位置。字符串中的第一个字符的索引为 0。
length（可选）：在返回的子字符串中应包括的字符个数。

```
字符串
let basic = "abc,def,ghi,"; 
const newBasic = basic.substr(0, basic.length - 1);  // abc,def,ghi
console.log(basic) //  "abc,def,ghi,"; 
```
字符串方法 **slice()、substring()、substr()**

都不能改变原来的元素

### 5. ES6删除和过滤对象中部分属性
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
