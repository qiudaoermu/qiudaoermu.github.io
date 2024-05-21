---
title: "🐓🥚webSocket-socket-js"
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
    this.ws = new WebSocket(`ws://${process.env.VUE_APP_SOCKET_URL}/${url}`);
    // this.onSendMessage()
    this._onCatchErr();
    this._onClose();
  }
  onSendMessage(params = "") {
    if (this.ws.readyState === 1) {
      this.ws.send(params);
    } else {
      this.ws.addEventListener("open", (e) => {
        console.log(this.ws.readyState);
        this.ws.send(params);
      });
    }
  }
  _onCatchErr() {
    this.ws.addEventListener("error", function(event) {
      console.error("Error from server ", event.data);
    });
  }
  // 被动监听
  _onClose() {
    this.ws.addEventListener("close", (e) => {
      console.log(
        "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
      );
      console.log("Ws has closed");
    });
  }
  // 主动关闭
  close() {
    this.ws.close();
  }
}


export default Wsocket;

```

#### 使用：

```js
this.client = new Wsocket('socket/pushMessage')
// 发送信息
this.client.senMessage('message')
// 接受消息
this.client.ws.addEventListener('message', (event) => {
  // console.log(event.data)
})
// 断开连接
this.client.close()
```
> [websocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
