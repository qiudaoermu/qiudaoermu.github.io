---
  layout: post
  tilte: "什么情况下非要用encodeURI方法？.md"
  date: 2021-10-21-
  tags: 
    - 开发日常
---
  ## [语法]()

> encodeURI(URI)
decodeURI(URI)

example:
```
encodeURI("陈振飞")  //'%E9%99%88%E6%8C%AF%E9%A3%9E'
decodeURI('%E9%99%88%E6%8C%AF%E9%A3%9E') // 陈振飞
```


##### 编码原因:

因为当字符串数据以url的形式传递给web服务器时,字符串中是不允许出现空格和特殊字符的



1.因为当字符串数据以url的形式传递给web服务器时,字符串中是不允许出现空格和特殊字符的
比如说 传递邮箱这个字符串的时候 hehe@163.com url中是不允许出现@字符的，转义之后会变成 hehe%40163.com

2.在标准的url规范中**[中文]()**和很多的字符是不允许出现在url中的
