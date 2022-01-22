---
  layout: post
  tilte: "🙅🏻♂️-什么情况下非要用encodeURI方法？.md"
  date: 2021-10-21-
  tags: 
    - 开发日常

---

## [语法]()

> encodeURI(URI)
>
>decodeURI(URI)

example:

```js
encodeURI("陈振飞")  //'%E9%99%88%E6%8C%AF%E9%A3%9E'
decodeURI('%E9%99%88%E6%8C%AF%E9%A3%9E') // 陈振飞
```


##### 编码原因:

因为当字符串数据以url的形式传递给web服务器时,字符串中是不允许出现空格和特殊字符的



1.因为当字符串数据以url的形式传递给web服务器时,字符串中是不允许出现空格和特殊字符的
比如说 传递邮箱这个字符串的时候 hehe@163.com url中是不允许出现@字符的，转义之后会变成 hehe%40163.com

2.在标准的url规范中**[中文]()**和很多的字符是不允许出现在url中的

## [decode](https://so.csdn.net/so/search?q=decode)URI与decodeURIComponent区别
>encodeURI()不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；
而encodeURIComponent则会对它发现的任何非标准字符进行编码。

来看下面的例子：
```
var uri="http://www.jxbh.cn/illegal value.htm#start";
//”http://www.jxbh.cn/illegal%20value.htm#start”
alert(encodeURI (uri)):
//”http%3A%2F%2Fwww.jxbh.cn%2Fillegal%20value.htm%23start”
alert( encodaURIComponent (uri));
```
>使用encodeURI()编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了%20。
而encodeURIComponent()方法则会使用对应的编码替换所有非字母数字字符。
