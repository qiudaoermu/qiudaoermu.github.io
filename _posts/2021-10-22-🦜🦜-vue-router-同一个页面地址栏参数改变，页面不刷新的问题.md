---
  layout: post
  tilte: "2021-10-22-🦜🦜-vue-router-同一个页面地址栏参数改变，页面不刷新的问题.md"
  date: 2021-10-22-
  tags: 
    - 开发日常

---


* content
{:toc}


vue-router  同一个页面地址栏参数改变（比如文章的发布和编辑是同一个页面），不会触发vue的created或者mounted钩子，所以数据不会重新渲染。

解决办法有两种：

1：监听地址栏变化（watch）,这是vue-router官方给出的解决办法。
监听路由变化，把初始化的方法重新写到监听的方法里面执行
```js
watch: {
    '$route' (to, from) {
        this.getData(this.$route.query.id)
    }
}
 
methods: {
    async getData (id) {
      // 按照id获取数据
      const { data: { result } } = await this.$http.get('getShowList', {
        params: { id }
      })
      this.dataList = result
    }
}
```
2、给router-view加个唯一的key，来保证路由切换时都会重新渲染触发钩子了
```

<template>
    <div id="main" class="app-main">
        <transition :name="transitionName">
            <router-view class="router-box" :key="key"></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        computed:{
            key() {
               return this.$route.name?this.$route.name+ +new Date():this.$route+ +new Date()
            }
        }
    };
</script>

```
> 第二种方法，页面每次切换都会跑到顶部，需要配合 scroll处理
