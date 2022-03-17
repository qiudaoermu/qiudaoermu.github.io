---
  layout: post
  tilte: "🍟-js-splice-向数组指定位置添加插入元素.md"
  date: 2022-3-16-
  tags: 
    - 开发日常

---


* content
{:toc}


##### splice() 方法
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
