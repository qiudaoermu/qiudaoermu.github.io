**原始数据:**
```js

let Obj={
  parentid:"43323wsd2e2d2e33r3redad",
  head_img:"i am a url",
}

```
**想要的数据：**
```js

let newObj={
  ParentID:"43323wsd2e2d2e33r3redad",
  avator:"i am a url",
}

```


##### 第一种，正则替换，缺点，如果value等于key,会有问题
```js

/**
* @param {Object}  { parentid:"43323wsd2e2d2e33r3redad"}
* @param {Object}  { parentid: "ParentID"}
* @return {Object}  { ParentID:"43323wsd2e2d2e33r3redad"}
*/
const  renameKeys = (target, keys) => {
  const key = Object.keys(keys).reduce((pre, cur) => pre + "|" + cur)
  const reg = new RegExp(`${key}`, "ig")
  return JSON.parse(JSON.stringify(target).replace(reg, matched => keys[matched]))
}

```
##### 第二种，reduce产生新的对象，缺点，使用更大内存
```js

const renameKeys = (obj,keysMap) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );
const obj =  { parentid:"43323wsd2e2d2e33r3redad"};
renameKeys(obj, { parentid: "ParentID"})  // { ParentID:"43323wsd2e2d2e33r3redad"}

```
