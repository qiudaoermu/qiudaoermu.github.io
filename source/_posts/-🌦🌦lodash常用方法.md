---
title: "-🌦🌦lodash常用方法"
date: 2019-12-05
tags: 
- 开发日常
---
1. 找数组中的相同key项的对象()

intersectionBy
```
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]
```
2. 去重
uniqBy
```
_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]
```
3. 返回符合元素的 index，否则返回 -1。
findIndex
```
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
```
4.深克隆
cloneDeep
```

var objects = [{ 'a': 1 }, { 'b': 2 }];

var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```
5.取差集
differenceBy
```
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```
