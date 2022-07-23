---
title: "🌦🌦for-异步执行方案"
date: 2022-03-11
tags: 
- 开发日常
---
![](https://upload-images.jianshu.io/upload_images/15312191-a67f2b1a469d40b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### for + 异步请求同步执行问题
有个需求是循环请求一个接口获得数据，
问题是循环请求了但是接口是异步的，按顺序传过去的返回来的并`不一定`按顺序返回来。
##### 解法一——async await
```js
mounted() {
    this.queryNewFund();
  },
  methods: {
    async queryNewFund() {
      let that = this;
      let codeList = ["1", "2", "3"];
      for (let i = 0; i < codeList.length; i++) {
        let obj = await that.getData(codeList[i]);
        console.log(obj);
      }
    },
    getData(id) {
      return new Promise(resolve => {
        axios.get(id).then(result => {
          resolve(result);
        });
      });
    }
  },
```
##### 解法二——Promise.all
利用Promise.all 顺序返回的特性
```js
mounted() {
    this.queryNewFund();
  },
  methods: {
    async queryNewFund() {
      let that = this;
      let codeList = ["1", "2", "3"];
      for (let i = 0; i < codeList.length; i++) {
        this.asyncLists.push(this.getData(codeList[i]))
      }
      Promise.all(this.asyncLists).then((res) => {
        // 四个result 结果 顺序返回
      })
    },
    getData(id) {
      return new Promise(resolve => {
        axios.get(id).then(result => {
          resolve(result);
        });
      });
    }
  },
```
##### 解法三 ——递归
```js
 mounted() {
    this.queryNewFund();
  },
  methods: {
    queryNewFund() {
      let that = this;
      let codeList = ["1", "2", "3"];
      this.getData(codeList, 0);
    },
    getData(codeList,index) {
      if (i === codeList.length) {
        return;
      }
      axios.get(codeList[index]).then(result => {
          resolve(result);
          this.getData(codeList,index + 1);
      });
    }
  }
```

#### 间隔打印问题
要实现的功能：在for循环中写一个计时器，先隔2000毫秒打印1，再隔2000毫秒打印2….依次每间隔2000毫秒打印出0到9.

##### 基本思路
要实现分别输出数组中的所有值，通过简单的for循环就能实现。要实现间隔一段时间输出，则使用setTimeout函数。
先写一个基本循环
```js
function test(){
	for (var i = 0; i < 10; i++) {
		console.log(i);//分别输出i的值		
	}	
};
test();
```
可以在控制台看到紧跟着分别输出了小于10的i的值。
- 加上setTimeout
```diff js
function test(){
	for (var i = 0; i < 10; i++) {
+	  setTimeout(function(){
		console.log(i);//分别输出i的值
+	  },2000)			
	}	
};
test();
```
加上setTimeout函数后，因为js执行机制和作用域问题，控制台的内容却都变成了10。


##### 

##### 解决方案一 ——闭包
终于来到了本文中最重要的一部分。什么是闭包？！

闭包是指有权访问另一个函数作用域中的变量的函数。或者说，将函数作为参数或者返回值。创建闭包的常见方式，就是在一个函数内部创建另一个函数。以下面的代码为例。

```diff js
function test(){
    for (var i = 0; i < 10; i++) {
+    	(function(j){//闭包
    		setTimeout(function(){
-               console.log(i);//分别输出i的值
+    			console.log(j);//分别输出i的值
    		},4000)		
+   	})(i);//闭包
    };	
};
test();
```
##### 解决方案二——let
 如下面的代码所示，使用let替换var，也能输出0-9的值。这是因为，当for循环中的i是通过var定义的变量时，作用域是一整个封闭函数，是全局作用域；当i是通过let定义的变量时，作用域在代码块中，叫做块级作用域，在for循环这个子块中。
```
function test(){
	for (let i = 0; i < 10; i++) {
		setTimeout(function(){
			console.log(i);//分别输出i的值
		},2000)		
	};
};
test();
```

##### 最终方案：
- 闭包版本
 ```
function test(){
	for (var i = 0; i < 10; i++) {
		(function(j){//闭包
			setTimeout(function(){
				console.log(j);//分别输出i的值
			},2000*j)		
		})(i);//闭包
	};
};
test();
```

- let 版本
 ```
function test(){
	for (let i = 0; i < 10; i++) {
		setTimeout(function(){
			console.log(i);//分别输出i的值
		}, 2000 * i)		
	};
};
test();
```
- Promise版本
```
const Print = (i) => {
  return new Promise(resolve => {
      setTimeout(function(){
          resolve(i)
          console.log(i)
	  }, 2000 )	
  })
}

async function test (){
	for (var i = 0; i < 10; i++) {
        await Print(i)	
	};
};
test();
```

> [用setTimeout实现for循环中的计时器](https://miss-me.github.io/2018/09/01/%E7%94%A8setTimeout%E5%AE%9E%E7%8E%B0for%E5%BE%AA%E7%8E%AF%E4%B8%AD%E7%9A%84%E8%AE%A1%E6%97%B6%E5%99%A8/)
