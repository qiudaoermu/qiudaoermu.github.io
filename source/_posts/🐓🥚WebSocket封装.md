---
title: "🐓🥚WebSocket封装"
date: 2022-07-04
tags: 
- 实践堂
---
websocket 解决了服务端主动向客户端，传递消息的问题。
为方便使用，下面封装了主要方法
#### 封装：
```js
class Wsocket {
  constructor(url) {
    this.ws = new WebSocket(`ws:/${url}`);
    this._onCatchErr()
    this._onClose()
  }
// 发送消息
  onSendMessage(params = '') {
    this.ws.sendMessage = (params) => {
      if (this.ws.readyState === 1) {
        this.ws.send(params);
      } else {
        this.ws.addEventListener("open", (e) => {
          console.log(this.ws.readyState);
          this.ws.send(params);
        });
      }
    };
  }
// 错误捕获
  _onCatchErr() {
    this.ws.addEventListener("error", function (event) {
      console.error( "Error from server ", event.data);
    });
  }
// 断开检测
  _onClose() {
    this.ws.addEventListener("close", (e) => {
      console.log(
        "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
      );
      console.log("Ws has closed");
    });
  }
}

export default Wsocket;

```

#### 使用：

```js
this.client = new Wsocket('socket/pushMessage')
// 接受消息
this.client.ws.addEventListener('message', (event) => {
  // console.log(event.data)
})
```
