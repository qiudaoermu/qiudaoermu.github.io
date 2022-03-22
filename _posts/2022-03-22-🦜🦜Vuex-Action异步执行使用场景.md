---
  layout: post
  tilte: "2022-03-22-🦜🦜Vuex-Action异步执行使用场景.md"
  date: 2022-03-22-
  tags: 
    - 开发日常

---


* content
{:toc}


vuex action 是全局事件触发的执行函数，
定义
```
const actions  = {
  login(state) {
    axios('login').then(res ={
      
    })
  }
}
```
执行
```
this.dispatch("login").then(res => {
  
})
```
相交于一般 muitition具有异步执行的功能😺
