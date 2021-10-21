发现网上讲的太啰嗦
```


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
