---
title: "☀️☀️设计模式在react项目中的落地"
date: 2021-09-07
tags: 
- 编程范式
---


![](https://upload-images.jianshu.io/upload_images/15312191-2f8f9332f549e364.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 1.订阅发布模式
一句话总结：**创造事件，等待一个事件的发生。**

比如小明（订阅者）去到报亭的大爷（发布者）那订了一份报纸，第二天报纸来了，大爷通知小明来取报纸。

众所周知，react中没有bus这个概念，如果遇到react中使用bus的情况，怎么办呢
首先 , 什么是bus, event Bus is only a Global Function Register;
```js

let Bus = function () {
  this.cache = [];
};
// register
Bus.prototype.$on = function (handleEvent, fn) {
  for (let i = 0; i < this.cache.length; i++) {
    let [first] = Object.keys(this.cache[i]);
    if (first === handleEvent) {
      return;
    }
  }
  this.cache.push({
    [handleEvent]: fn
  });
};
// trigger
Bus.prototype.$emit = function (handleEvent) {
  const [first, ...rest] = Array.from(arguments);
  for (let i = 0; i < this.cache.length; i++) {
    if (this.cache[i][handleEvent]) {
      this.cache[i][handleEvent](...rest);
    }
  }
};
// cancel register
Bus.prototype.$off = function (handleEvent) {
  for (let i = 0; i < this.cache.length; i++) {
    let [first] = Object.keys(this.cache[i]);
    if (first === handleEvent) {
      this.cache.splice(i, 1);
      i = i - 1;
    }
  }
};

```

Example：

```js

let bus = new Bus();
bus.$on("send",()=>{
  console.log("onSend")
})
bus.$emit("send") // onSend

```

相对而言，Vue就无脑多了，内部已经集成了。

```js
import Vue from "vue";
Vue.prototype.bus = new Vue();
```
```js

this.bus.$on('event',(record) => {
  // 返回参数
})

this.bus.$emit('event', param)
```
## 

#### 2.装饰器模式
js 本身没有装饰器 @语法糖，我们可以借助babel插件
```js

npm i @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -S

```
然后配置 babal-loader

```js
 {
    test: /\.(tsx?|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        sourceMaps: true,
        presets: [
          ["@babel/preset-typescript", { isTSX: true, allExtensions: true}]
        ],
        plugins: [
          [
            "@babel/plugin-proposal-decorators",
            {
              "legacy": true
            }
          ],
          [
            "@babel/plugin-proposal-class-properties",
            {
              "loose": true
            }
          ]
        ]
      }
    }
  };
```

cool，我们接下来可以愉快的使用装饰者了，

Example:
在软件开发中，我们经常碰到，连续点击导致问题的情况,此时我们可以采用debounce（防抖）和throttle（节流）的方式来减少调用频率，同时又不影响实际效果.
已 debounce为例：
App.jsx
```js

import debounce from "./debounce"
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  @debounce(500, false)
  handleOk() {
     this.post('xxx')
  }

  render() {
    return (
      <div className="App">
        <button onClick={handleOk.bind(this)}
        </button>
      </div>
    );
  }
}

```
debounce.js
```js

function _debounce(func, wait) {
  let timeout;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    } else {
      timeout = setTimeout(() => {
        func.apply(this);
      }, wait);
    }
  };
}

const debounce = wait => {
  return function handleDescriptor(target, key, descriptor) {
    const callback = descriptor.value;
    if (typeof callback !== "function") {
      throw new SyntaxError("Only functions can be debounced");
    }
    const fn = _debounce(callback, wait);
    return {
      ...descriptor,
      value() {
        fn.apply(this);
      }
    };
  };
};
export default debounce;

```
#### 3.代理模式
代理模式符合设计模式中单一原则，react HOC本身就是代理模式的变种。
作用：通过一个中间模块去调用别的模块，实现功能分离和组合。

Easy Example:

```js

        /**************** 计算乘积 *****************/
        var mult = function(){
            var a = 1;
            for ( var i = 0, l = arguments.length; i < l; i++ ){
              a = a * arguments[i];
            }
            return a;
        };

        /**************** 计算加和 *****************/
        var plus = function(){
            var a = 0;
            for ( var i = 0, l = arguments.length; i < l; i++ ){
              a = a + arguments[i];
            }
            return a;
        };

        /**************** 创建缓存代理的工厂 *****************/
        var createProxyFactory = function( fn ){
            var cache = {};
            return function(){
              var args = Array.prototype.join.call( arguments, ', ' );
              if ( args in cache ){
                  return cache[ args ];
              }
              return  cache[ args ] = fn.apply( this, arguments );
            }
        };

        var proxyMult = createProxyFactory( mult ),
        proxyPlus = createProxyFactory( plus );

        alert ( proxyMult( 1, 2, 3, 4 ) );    // 输出：24
        alert ( proxyMult( 1, 2, 3, 4 ) );    // 输出：24
        alert ( proxyPlus( 1, 2, 3, 4 ) );    // 输出：10
        alert ( proxyPlus( 1, 2, 3, 4 ) );    // 输出：10

```

React HOC Example:

在一个软件中，有许多表格类，网页，每个网页都有搜索栏，表格页码，联动，如果每个页面我们都要组合这些组件，写搜索逻辑，it's waste，应该把这部分重复的内容放在高阶组建里;

hotc.js

```js
import { getLocation } from "@haier/router";
const tableHotc = Hotc => {
  return class WrapComponet extends Hotc {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
        // 搜索参数
        fetchListParams: {},
        // 页码，数量，可选页码数
        pagination: {
          pageSizeOptions: ["20", "50", "100"],
          pageNum: 1,
          pageSize: 20,
          total: 0
        }
      };
    }
    componentDidMount() {
      this.fetchList();
    }
    // 搜索之前参数的操作
    recombineUrlParams() {
      const res = {};
      for (let i of mergeURls) {
        if (i in location.params) {
          res[i] = !isNaN(location.params[i]) && location.params[i] ? Number(location.params[i]) : location.params[i];
        }
      }
      return res;
    }
    // 列表接口
    fetchList(
      params,
      pagination = { pageNum: this.state.pagination.pageNum, pageSize: this.state.pagination.pageSize }
    ) {
      params = params || this.fetchListParams || {};
      params = { ...params, ...this.recombineUrlParams() };
      params = this.recombination && this.recombination(params);
      params["pageNum"] = pagination.pageNum;
      params["pageSize"] = pagination.pageSize;
      this.fetchListParams = params;
      this.fetchListApi(params).then(res => {
        // 请求成功之后，页码改变，数据分配
        if (res.success && res.data) {
          this.setState({
            data: res.data.list || res.data
          });
        }
        const total = res.data.total;
        const pageSize = pagination.pageSize;
        const obPagination = Object.assign({}, this.state.pagination, { total, pageSize });
        this.setState({
          pagination: obPagination
        });
      });
      this.fetchListCallback && this.fetchListCallback(params);
    }
    // 搜索动作
    handleChange(pagination) {
      const { current, pageSize } = pagination;
      const pageNum = current;
      const obPagination = Object.assign({}, this.state.pagination, { pageNum });
      this.setState({ pagination: obPagination });
      this.fetchList(this.fetchListParams, {
        pageNum: current,
        pageSize
      });
    }
    render() {
      return (
        <div>
          <Hotc
            {...this.props}
            state={this.state}
            fetchList={this.fetchList.bind(this)}
            handleChange={this.handleChange.bind(this)}
          />
        </div>
      );
    }
  };
};

export default tableHotc;
```

table.js

```js
import tableHotc from "~/hotc/tableHotc";
class Table extends React.Component {
  state = {
    loadingTable: false,
    selectedRowKeys: [],
    data: []
  };
  childRef = React.createRef();
  tableParam = {
    scroll: { x: 1500, y: 400 },
    bordered: true,
    columns: [
      {
        title: "商品SKU",
        dataIndex: "sku",
        key: "sku",
        width: 200,
        fixed: "left",
        ellipsis: {
          showTitle: true
        }
      },
      {
        title: "商品名称",
        dataIndex: "name",
        key: "name",
        width: 200,
        ellipsis: {
          showTitle: true
        }
      },
      {
        title: "规格",
        dataIndex: "spec",
        key: "spec",
        width: 100
      },
      {
        title: "重量",
        dataIndex: "weight",
        key: "weight",
        width: 100
      }
      }
    ]
  };

  fetchListApi = productList;
  recombination(params: Object) {
    params.state = "02,10";
    return params;
  }
  render() {
    const { data, pagination } = this.props.state;
    return (
      <div>
        <Card>
          <Table
            {...(this.tableParam as any)}
            dataSource={data}
            pagination={pagination}
            onChange={this.props.handleChange.bind(this)}
          />
        </Card>
      </div>
    );
  }
}

// 通过访问table， 调用tableHotc，实现功能代理。
export default tableHotc(Table);
```
table.js 通过**this.props.xxx**调用 hotc.js中的属性方法。
hotc.js 通过**this.xxx**调用 table.js中的属性方法。
