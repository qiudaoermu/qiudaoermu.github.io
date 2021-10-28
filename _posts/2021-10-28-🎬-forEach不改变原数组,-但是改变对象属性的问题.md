#####  1.forEach(item, index, arr)，三个参数，如果直接用item=xxx是无法改变原数组的，但是如果用arr[index]就可以改变原数组。
```js
 
var s = [1, 2, 3, 4];
// 未改变原数组
s.forEach(item=>{
    item = 'a'
});
console.log(s); //  [1, 2, 3, 4] 
 
//  改变了原数组
s.forEach((item, index, arr)=>{
    arr[index] = 'b'
});
console.log(s); // ["b", "b", "b", "b"]

```
##### 2.数组里面的子元素是对象，那么是可以改变对应属性的
```js

// 未改变原数组
var s = [{a:1}, {a:1}];
s.forEach(item=>{
    item = null;
});
console.log(s); // [{a: 1} ,{a: 1}] 

// 改变的原数组里面的对象属性
s.forEach(item=>{
    item.a = 666;
});
console.log(s); // [{a: 666}, {a: 666}] 

```
