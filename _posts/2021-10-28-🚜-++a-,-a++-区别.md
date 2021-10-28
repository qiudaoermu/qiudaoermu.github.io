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
