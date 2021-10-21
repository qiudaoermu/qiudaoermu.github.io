**原始数据:**
```
let Obj={
  parentid:"43323wsd2e2d2e33r3redad",
  head_img:"i am a url",
}
```
**想要的数据：**
```
let newObj={
  ParentID:"43323wsd2e2d2e33r3redad",
  avator:"i am a url",
}
```
**实现方法：**
```

let Obj = {
  parentid:"43323wsd2e2d2e33r3redad",
  head_img:"i am a url",
}
let mapObj = {
    parentid: "ParentID",
    head_img: "avator"
};
// 使用正则变量 
let keys = Object.keys(mapObj).reduce((pre, cur) => pre + "|" +cur) // /parentid｜head_img/

let reg = new RegExp(`${keys}`,'ig')
const newObj=JSON.parse(JSON.stringify(Obj).replace(reg,matched => mapObj[matched]))

/*
newObj = {
  ParentID:"43323wsd2e2d2e33r3redad",
  avator:"i am a url",
}
*/

```
封装成工具函数
```
/**
* @param {Object}  { parentid:"43323wsd2e2d2e33r3redad"}
* @param {Object}  { parentid: "ParentID"}
* @param {Object}  { ParentID:"43323wsd2e2d2e33r3redad"}
*/
const  renameKeys = (target, keys) => {
  const key = Object.keys(keys).reduce((pre, cur) => pre + "|" + cur)
  const reg = new RegExp(`${key}`, "ig")
  return JSON.parse(JSON.stringify(target).replace(reg, matched => keys[matched]))
}
```
