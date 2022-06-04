---
  layout: post
  tilte: "2021-11-07-⛵︎验证码（2）responseType、Mime.md"
  date: 2021-11-07-
  tags: 
    - 开发日常

---


* content
{:toc}





有些时候我们希望xhr.response返回的就是我们想要的数据类型。比如：响应返回的数据是纯JSON字符串，但我们期望最终通过xhr.response拿到的直接就是一个 js 对象，我们该怎么实现呢？
有2种方法可以实现，一个是level 1就提供的overrideMimeType()方法，另一个是level 2才提供的xhr.responseType属性。
##### xhr.overrideMimeType()
overrideMimeType是xhr level 1就有的方法
如果服务器没有指定一个`[Content-Type]` 头, [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 默认MIME类型为`"text/xml"`. 如果接受的数据不是有效的XML，将会出现格”格式不正确“的错误。你能够通过调用 `overrideMimeType()` 指定各种类型来避免这种情况。
```
// Interpret the received data as plain text

req = new XMLHttpRequest();
req.overrideMimeType("text/plain");
req.addEventListener("load", callback, false);
req.open("get", url);
req.send();

```


再举一个使用场景，我们都知道xhr level 1不支持直接传输blob二进制数据，那如果真要传输 blob 该怎么办呢？当时就是利用overrideMimeType方法来解决这个问题的。

下面是一个获取图片文件的代码示例：

 ```
var xhr = new XMLHttpRequest();
//向 server 端获取一张图片
xhr.open('GET', '/path/to/image.png', true);

// 这行是关键！
//将响应数据按照纯文本格式来解析，字符集替换为用户自己定义的字符集
xhr.overrideMimeType('text/plain; charset=x-user-defined');

xhr.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    //通过 responseText 来获取图片文件对应的二进制字符串
    var binStr = this.responseText;
    //然后自己再想方法将逐个字节还原为二进制数据
    // 文本转二机制
  }
};

xhr.send();
```
##### xhr.responseType
下面是同样是获取一张图片的代码示例，相比xhr.overrideMimeType,用xhr.response来实现简单得多。

```
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
//可以将`xhr.responseType`设置为`"blob"`也可以设置为`" arrayBuffer"`
//xhr.responseType = 'arrayBuffer';
xhr.responseType = 'blob';

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = this.response;
    ...
  }
};

xhr.send();
```
简单来说，responseType就是把文本转换成 二进制了，二进制和文本怎么转换呢,请看下文分解
