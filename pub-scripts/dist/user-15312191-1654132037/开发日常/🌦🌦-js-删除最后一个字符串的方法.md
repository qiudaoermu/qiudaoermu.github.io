

`stringObject.substr(start, length)`

>用于返回一个从指定位置开始的指定长度的子字符串。
start（必需）：所需的子字符串的起始位置。字符串中的第一个字符的索引为 0。
length（可选）：在返回的子字符串中应包括的字符个数。

```
字符串
let basic = "abc,def,ghi,"; 
const newBasic = basic.substr(0, basic.length - 1);  // abc,def,ghi
console.log(basic) //  "abc,def,ghi,"; 
```
slice()、substring()、substr()

都不能改变原来的元素
