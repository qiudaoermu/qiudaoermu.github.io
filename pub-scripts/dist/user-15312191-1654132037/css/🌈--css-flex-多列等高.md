1.父元素设置display:flex
2.子元素设置 flex:1

```
#container{
	width:400px;
	margin:0 auto;
	background-color: #ddd;
	display:flex;
}
// 不要设置 align-items 属性
.left,
.right{
	display:1;
	width:200px;
	font-size: 16px;
	line-height:24px;
	color:#333;
}

.left{
	background-color: deeppink;
}
.right{
	background-color:yellowgreen;
}
```
https://codepen.io/qiudaoermu/pen/rNzPMPz
