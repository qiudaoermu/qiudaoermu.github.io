vuex action 是全局事件触发的执行函数，
定义
```js
const actions  = {
  login(state) {
    axios('login').then(res ={
      state.login = true
    })
  }
}

// 执行
this.dispatch("login").then(res => {
  
})
```
相交于一般 muitition具有异步执行的功能😺,
具体是包了一层Promise.resolve,其实完全可以用muitition,commit实现，只要`return new Promise`
```js
const mutations = {
  login (state) {
    return new Promise(resolve => {
      axios('login').then(res ={
        resolve(res)
        state.login = true
      })
    })
  }
 }
// 执行
this.$store.commit("login").then(res => {})
```
