原始数据
```js

let student={
    age: 20,
    name: 'maomao',
    sex: "男"
}

```
排除"age"属性
```js

let { age, ...params } = student
console.log(params)  // {name: "maomao"，sex: "男"}

```
