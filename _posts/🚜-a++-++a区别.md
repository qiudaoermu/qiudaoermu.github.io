
a++ 和 ++a的相同点都是给a+1，
不同点是
a++是先参加程序的运行再+1，
而++a则是先+1再参加程序的运行。
举个例子来说：
```
var a = 2；  
var b = a++；    
运行后： b = 2，a =3 ；      
```
``` 
var a = 2；  
var b = ++a；    
运行后： b = 3，a =3；
```
```
var a = 3;
var goos = function(){
  return a++;
} 
console.log(goos()); // 3

```
```
var a = 3;
var goos = function(){
  return ++a;
} 
console.log(goos()); // 4
```
