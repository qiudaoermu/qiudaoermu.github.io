---
title: "🌦🌦-import---as-怎么用"
date: 2021-10-22
tags: 
- 开发日常
---
`lib.js`
```js
export var config = _config;
export var db = _db;
export var storage = _storage;

```
`main.js`
在 main.js中使用 lib.js
```
import {storage,db,config} from "./lib"
```

也可以写成

```
import * as lib from "./lib"
lib.db()
```
