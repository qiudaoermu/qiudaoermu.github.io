---
layout: mypost
title: vue中使provide中的数据变为响应式
categories: [vue]
---

### 正常使用 provide 的方式：

```
// 父组件中：
provide:{
　　for: 'demo'
}
```

这样子组件中无论多深的子组件都可以使用：

```
// 子组件
inject:['for'],
data(){
　　return{
　　　　demo: this.for
　　}
}
```

但是上面的写法有一定的问题，
比如父组件中 for 变量的值如果我们是在 mounted 方法中请求后台数据再更改 provide 中 for 的值，
那么在子组件中获取不到更改后的 for 的值。

### 这时候就需要换一种写法：

```
// 父组件中：
data () {
  return {
    for: {}
  }
},
provide() {
    return {
      provObj: this.for
    };
  },
 mounted() {
   setTimeout(() => {
      this.for.fp= 'demo';
   }, 2000);
}
```

```
// 子组件中：
inject:['provObj'],
data(){
　　return{
　　　　demo: this.provObj.fp
　　}
}
```

---

[provide 源码](@previous)
使用 defineReactive, 让 provide 变为响应式的, 所以根元素属性 `this.for` 无效，必须监听下一级属性 ` this.for.fp`

```
export function initInjections (vm: Component) {
const result = resolveInject(vm.$options.inject, vm)
if (result) {
  observerState.shouldConvert = false
  Object.keys(result).forEach(key => {
    `defineReactive(vm, key, result[key])` // defineReactive
  })
  observerState.shouldConvert = true
  }
}

```

[inject 源码](@previous)

---

```
export function resolveInject (inject: any, vm: Component): ?Object {
  if (inject) {
  // inject 是 :any 类型因为流没有智能到能够指出缓存
    const result = Object.create(null)
    // 获取 inject 选项的 key 数组
    const keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(key => {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const provideKey = inject[key].from
      let source = vm
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey]
          break
        }
        source = source.$parent
      }
      if (!source) {
        if ('default' in inject[key]) {
          const provideDefault = inject[key].default
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault
        } else if (process.env.NODE_ENV !== 'production') {
          warn(`Injection "${key}" not found`, vm)
        }
      }
    }
    return result
  }
}
```
