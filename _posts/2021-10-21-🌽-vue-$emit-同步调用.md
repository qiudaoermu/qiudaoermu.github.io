标题换一种说法：vue $emit 调用父组件异步方法，执行完毕后再执行子组件的某方法
使用回调的形式
```
// 组件的html中添加事件 @getData="getData"
methods : {
	getData(params, callback) {
		console.log("子组件的传递到父组件的参数", params);
		console.log("模拟发送后台异步请求，延迟3s...");
		setTimeout(() => {
			console.log("异步请求结束，执行回调函数");
			callback("父组件传到子组件的文本666")
		}, 3000)
	}
} 

```
子组件
```
// 通过 $emit 触发父组件的方法
// 参数：触发的事件名称、事件参数，事件参数
// 把方法当做事件参数传递到父组件，由父组件调用执行。
this.$emit('getData', 10, (res)=> {
	console.log("父组件的返回结果：", res); //由父组件调用
})

```
