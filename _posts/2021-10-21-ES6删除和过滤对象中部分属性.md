```
有对象如下：
let student={
    age: 20,
    name: 'maomao',
    sex: "男"
}
准备把‘age’属性，排除出去
let {age,...params} = student
console.log(params)  // {name: "maomao"，sex: "男"}
```
