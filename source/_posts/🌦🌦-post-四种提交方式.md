---
title: "🌦🌦-post-四种提交方式"
date: 2021-10-23
tags: 
- 开发日常
---
#### post提交数据的四种编码方式

##### 1.application/x-www-form-urlencoded
这应该是最常见的post编码方式，一般的表单提交默认以此方式提交。大部分服务器语言对这种方式都有很好的支持。在PHP中，可以用$_POST[“key”]的方式获取到key的值，在node中我们可以使用querystring中间件对参数进行分离。

请求类似于下面这样:
```js

this.$axios({
    method:"post",
    url:"/server",
    headers:{
        'Content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
}).then((res)=>{
    console.log(res.data);
})

```

首先，Content-Type 被指定为 application/x-www-form-urlencoded；其次，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。

```js
app.post("/server",function(req,res){
    req.on("data",function(data){
        let key=querystring.parse(decodeURIComponent(data)).key;
        console.log("querystring:"+key)
    });
});
```

```
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

##### 2.multipart/form-data
这也是一种比较常见的post数据格式，我们用表单上传文件时，必须使form表单的enctype属性或者ajax的contentType参数等于multipart/form-data。使用这种编码格式时发送到后台的数据长得像这样子

```
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

##### 3.application/json
axios默认提交就是使用这种格式。如果使用这种编码方式，那么传递到后台的将是序列化后的json字符串。

例如下面这段代码：
```js
this.$axios({
    method:"post",
    url:"/api/haveUser",
    data:{
        name:this.name,
        password:this.password
    }
}).then((res)=>{
    console.log(res.data);
})
```
最终发送的请求是：
```
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```
##### 4.text/xml
它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范。典型的 XML-RPC 请求是这样的：

```
POST http://www.example.com HTTP/1.1 
Content-Type: text/xml

<?xml version="1.0"?>
<methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
        <param>
            <value><i4>41</i4></value>
        </param>
    </params>
</methodCall>
```
XML-RPC 协议简单、功能够用，各种语言的实现都有。它的使用也很广泛，如 WordPress 的 [XML-RPC Api](http://codex.wordpress.org/XML-RPC_WordPress_API)，搜索引擎的 [ping 服务](http://help.baidu.com/question?prod_en=master&class=476&id=1000423)等等。JavaScript 中，也有[现成的库](http://plugins.jquery.com/xmlrpc/)支持以这种方式进行数据交互，能很好的支持已有的 XML-RPC 服务。不过，我个人觉得 XML 结构还是过于臃肿，一般场景用 JSON 会更灵活方便。


#### qs使用
---
  ` A querystring parsing and stringifying library with some added security.`

##### 1.qs.parse()将URL解析成对象的形式
```js

const Qs = require('qs');
let url = 'method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0';
Qs.parse(url);
console.log(Qs.parse(url));
/*
{
  method: "query_sql_dataset_data",
  projectId: 85,
  appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0
}
*/
```
##### 2. qs.stringify()将对象 序列化成URL的形式，以&进行拼接

```js

const Qs = require('qs');
let obj= {
     method: "query_sql_dataset_data",
     projectId: "85",
     appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0",
     datasetId: " 12564701"
   };
Qs.stringify(obj);
console.log(Qs.stringify(obj)); 


/*
 method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0&datasetId=%2012564701
*/
```


##### post请求处理

当post 请求报文格式为
application/x-www-form-urlencoded

>POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8
>title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3

需要对参数进行转化，固定格式 `key=value&key1=value1`

在axios中应用,对参数进行处理

```js
let params = {
  password: 123456,
  name: star
}

this.$axios.post({
  url:"/admin/login",
  params: qs.stringfy(params)
}).then(res => console.log(res))

// password=123456&name=star

```

>[都 2019 年了，还问 GET 和 POST 的区别](https://blog.fundebug.com/2019/02/22/compare-http-method-get-and-post/)
 [https://www.jianshu.com/p/62546d82f380](https://www.jianshu.com/p/62546d82f380)
[四种常见的 POST 提交数据方式](https://imququ.com/post/four-ways-to-post-data-in-http.html)
> [Vue 之 qs.parse()、qs.stringify()使用方法](https://blog.csdn.net/qq_43290288/article/details/106683304)
> [axios用post提交的数据格式](https://blog.csdn.net/wopelo/article/details/78783442)
