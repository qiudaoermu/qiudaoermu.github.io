---
  layout: post
  tilte: "🌦🌦-requestAnimationFrame-定时器.md"
  date: 2021-01-11-
  tags: 
    - 开发日常

---


* content
{:toc}


发现网上讲的太啰嗦
```js

var a = 0;
function step(){
    a++;
    console.log(a)
    var g =  requestAnimationFrame(step)
    if(a>=100){
        cancelAnimationFrame(g)
    }
}
step()

```
注意 

 cancelAnimationFrame(g)一定要放在后面
