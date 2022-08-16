---
title: "🗳🗳nginx转发小能手"
date: 2022-01-11
tags: 
- 开发日常
---
需要把前后端分离的项目部署到服务器,
前端静态资源通过nginx代理访问,接口请求代理到指定端口的服务上,先看配置:

```
server {
    listen       4040;
    server_name  127.0.0.1;
    // 静态目录设置
    location / {
       root   /opt/demo/static;
       index  index.html index.htm;
    }
    // 域名转发
    location ^~ / {
      proxy_pass   http://example.com:4041/;
    }
    // 目录映射
    location /image/ {
      root /;
      rewrite ^/image/(.*)$ /image_data/$1 break;
    }
}
```
##### 1.静态文件
nginx代理端口4040, 后台服务端口4041. 这个要注意了,nginx监听的端口不能与服务端口相同
`/根目录` --被代理到--> `/opt/demo/static`路径下
那么在static下的静态资源就可以直接被访问了,形式: [http://127.0.0.1:4040/index.html](http://127.0.0.1:4040/index.html)

##### 2.域名代理
访问某个域名会被代理到另一个域名下
比如：
`http:// 10.138.92.77:4040
被代理到--> `http://direct.com

**实战**

pack脚手架nginx项目配置，生产环境
```
resolver 10.138.92.77;
location ^~ / {
  set $entry index.html;
  set $prefix http://cdn.haier.net/assets/overlay/dts-fe/html-entries-prod;
  set $project_name suk-sys;
  proxy_pass $prefix/$project_name/$entry;
}
```
访问 服务器IP 就会转发到  http://cdn.haier.net/assets/overlay/dts-fe/html-entries-prod/suk-sys/index.html

##### 3.nginx做本地目录映射
　location /image/设置服务器拦截含有/image/的请求，实际上范围根据实际情况确定精确度

　　root /;设定作用的根目录，rewrite就是真正的跳转规则，设置以image为开头的请求跳转到/image_data开头的根目录，后面的参数原封不动的添加过去，这样就实现了目录的映射，

　　使用上面的规则可以很方便的映射到本地指定的多个用于静态访问的目录

比如想通过浏览器http://ip/image/2016/04/29/10/abc.jpg访问到系统目录/image_data/2016/04/29/10/abc.jpg





> [1] https://www.cnblogs.com/linyufeng/p/13361640.html
[2] https://www.jianshu.com/p/b010c9302cd0
[3] [nginx做本地目录映射](https://www.cnblogs.com/freeweb/p/5446632.html)
