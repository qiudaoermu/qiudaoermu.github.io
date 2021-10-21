#####空值合并操作符（??）
　只有当左侧为null和undefined和空时，才会返回右侧的数,否则返回左侧的
    重点: 0 除外
　
```
let a = ""
let result = a ?? "target"
console.log(result) // ''
```
```
判断数组长度慎用
let a = []
let result = a.length === 0 ?? "target"
console.log(result)  true
```
```
let number = 0;
let result = number ?? 1
console.log(result) // 0
```
