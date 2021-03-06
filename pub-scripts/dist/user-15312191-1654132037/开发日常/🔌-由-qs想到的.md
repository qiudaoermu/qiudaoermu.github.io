![](https://upload-images.jianshu.io/upload_images/15312191-f625287aecc1b313.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## qs使用
---
  ` A querystring parsing and stringifying library with some added security.`

##### 1.qs.parse()将URL解析成对象的形式
```js

const Qs = require('qs');
let url = 'method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0';
Qs.parse(url);
console.log(Qs.parse(url));

```
```
{
  method: "query_sql_dataset_data",
  projectId: 85,
  appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0
}
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

```
```

 method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0&datasetId=%2012564701

```
## usage
---
### http请求处理

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
>参考:
 [https://blog.fundebug.com/2019/02/22/compare-http-method-get-and-post/](https://blog.fundebug.com/2019/02/22/compare-http-method-get-and-post/)
 [https://www.jianshu.com/p/62546d82f380](https://www.jianshu.com/p/62546d82f380)
[https://imququ.com/post/four-ways-to-post-data-in-http.html](https://imququ.com/post/four-ways-to-post-data-in-http.html)
> [https://blog.csdn.net/qq_43290288/article/details/106683304](https://blog.csdn.net/qq_43290288/article/details/106683304)

