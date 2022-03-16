---
  layout: post
  tilte: "🔥-Python-+-JavaScript-=-🔥🔥🔥.md"
  date: 2022-3-16-
  tags: 
    - 开发日常

---


* content
{:toc}


  ![](https://upload-images.jianshu.io/upload_images/15312191-4f619d39eb0b8eff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




当涉及到 web开发时，javascript是无人能及的存在，但是有的时候我们需高要求的工作，比如解析一大堆数据，这样pyhton就是个更好的选择，但这仅仅是我们网站的一个功能而已，仅因为这个我们就需要转到python吗，也许不用。
##### 如果我们可以大部分使用 Node JS, 在必要情况下使用python呢？
碉堡了, 对吧，如有需要，我们可以使用`child process` 去运行一个python脚本
```js

const spawn = require('child_process').spawn
app.get("process_data", (req, res) => {
    spawn('python3', ['script.py'])
})

```
```python
# script.py
doSometing()
```
我们也可以传参
```js

const spawn = require('child_process').spawn
app.get("process_data", (req, res) => {
    const msg = "Hello"
    spawn('python3', ['script.py', msg])
})

```
在 python中我们必须通过 **import the sys** 才能接收数据
```python

import sys, json

def main():
    msg = sys.argv[1]
    doSometing(msg)

if __name__ == '__main__':
    main()

```
我们也可以通过stream代替 生成python进程传参
```js

const spawn = require('child_process').spawn,
const py = spawn('python3', ['script.py'])
const data = {
    msg: "Hello"
}

py.stdin.write(JSON.stringify(data)) //we have to send data as a string, so we are using JSON.stringify
py.stdin.end()

```
```python
import sys, json

def main():
    lines = sys.stdin.readlines()
    data = json.loads(lines)
    doSometing(data['msg'])

if __name__ == '__main__':
    main()
```

最后通过python 回调函数把数据传到node
```js
const spawn = require('child_process').spawn
const py = spawn('python3', ['cscript.py'])

py.stdout.on('data', function(res){
   let data = JSON.parse(res.toString())
   console.log(data)
})
```
```python
import sys

# You will have your own implementation of get data. In this case lets assume it returns a dict/json
res = getData()
print(json.dumps(data))

sys.stdout.flush()
```
> 翻译自 https://dev.to/0shuvo0/python-javascript--1nd6
