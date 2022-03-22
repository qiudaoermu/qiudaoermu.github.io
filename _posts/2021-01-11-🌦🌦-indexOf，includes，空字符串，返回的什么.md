---
  layout: post
  tilte: "🌦🌦-indexOf，includes，空字符串，返回的什么.md"
  date: 2021-01-11-
  tags: 
    - 开发日常

---


* content
{:toc}


最近刷letcode碰到的小问题

## indexOf

```js
let str = "string"
str.indexOf("") // 0
```
mdn解释
The index of the first occurrence of `searchValue`, or **`-1`** if not found.

An empty string `searchValue` produces strange results. With no `fromIndex` value, or any `fromIndex` value lower than the string's `length`, the returned value is the same as the `fromIndex` value:

```
'hello world'.indexOf('') // returns 0
'hello world'.indexOf('', 0) // returns 0
'hello world'.indexOf('', 3) // returns 3
'hello world'.indexOf('', 8) // returns 8
```

如果是空的，返回传入的序列，再往下需要查看js编译器源码了

## includes
传入空字符串，返回true

```js
let str = "string"
str.includes("") // true
```
includes，polyfill，目测includes也是通过indexOf实现的

```js
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
     'use strict';
     if (search instanceof RegExp) {
      throw TypeError('first argument must not be a RegExp');
    }
    if (start === undefined) { start = 0; }
    return this.indexOf(search, start) !== -1;
  };
}
```
