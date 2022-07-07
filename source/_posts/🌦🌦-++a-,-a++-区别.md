---
title: "🌦🌦-++A-,-A++-区别"
date: 2021-07-25
tags: 
- 开发日常
---
##### 相同点

a++ 和 ++a的都是给a+1

##### 不同点

a++是先参加程序的运行再+1，
而++a则是先+1再参加程序的运行。

##### Example：
```js

var a = 2；  
var b = a++；    
运行后： b = 2，a =3 ；      

```
```js

var a = 2；  
var b = ++a；    
运行后： b = 3，a =3；

```
```js

var a = 3;
var goos = function(){
  return a++;
} 
console.log(goos()); // 3

```
```js

var a = 3;
var goos = function(){
  return ++a;
} 
console.log(goos()); // 4

```


#### for 循环是怎么执行的

```
for( var i = 0; i < 10; i++) {
  // do something
  console.log(i)
  // 所有东西执行完了再+1
  // 如果希望从0 开始，i= 
}
console.log(i) // 10
```
等同于

```
let i = 0;
while(i < 10) {
 // do something
  console.log(i)
  i++
}
console.log(i) // 10
```
