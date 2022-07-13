---
title: "🌦🌦-++A-,-A++-区别"
date: 2021-07-25
tags: 
- 开发日常
---
#### 相同点

a++ 和 ++a的都是给a+1

#### 不同点

a++是先参加程序的运行再+1，
而++a则是先+1再参加程序的运行。

以上纯属废话

经过和C语汇编分析，在没有中间变量参与的情况下，汇编代码一摸一样

如果有中间变量，比如 b = a++，编译器会先保存一个值，再++

++i
```
	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 10, 15	sdk_version 10, 15
	.globl	_main                   ## -- Begin function main
	.p2align	4, 0x90
_main:                                  ## @main
	.cfi_startproc
## %bb.0:
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register %rbp
	xorl	%eax, %eax // 多这一行😁😁😁😁😁😁
	movl	$0, -4(%rbp)
	movl	$0, -8(%rbp)
	movl	-8(%rbp), %ecx
	addl	$1, %ecx
	movl	%ecx, -8(%rbp)
	movl	%ecx, -4(%rbp)
	popq	%rbp
	retq
	.cfi_endproc
                                        ## -- End function

.subsections_via_symbols

```
i++
```
	.section	__TEXT,__text,regular,pure_instructions
	.build_version macos, 10, 15	sdk_version 10, 15
	.globl	_main                   ## -- Begin function main
	.p2align	4, 0x90
_main:                                  ## @main
	.cfi_startproc
## %bb.0:
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register %rbp
	xorl	%eax, %eax
	movl	$0, -4(%rbp)
	movl	$0, -8(%rbp)
	movl	-8(%rbp), %ecx
	movl	%ecx, %edx
	addl	$1, %edx
	movl	%edx, -8(%rbp)
	movl	%ecx, -4(%rbp)
	popq	%rbp
	retq
	.cfi_endproc
                                        ## -- End function

.subsections_via_symbols

```

#### Example：
```js

var a = 2；  
var b = a++；    
运行后： b = 2，a =3 ；      

```
```js

var a = 2；  
var b = ++a；    
运行后： b = 3，a =3；

```
```js

var a = 3;
var goos = function(){
  return a++;
} 
console.log(goos()); // 3

```
```js

var a = 3;
var goos = function(){
  return ++a;
} 
console.log(goos()); // 4

```


#### for 循环是怎么执行的


```
for( var i = 0; i < 10; i++) {
  // do something
  console.log(i)
  // 所有东西执行完了再+1
  // 如果希望从0 开始，i= 
}
console.log(i) // 10
```
等同于

```
let i = 0;
while(i < 10) {
 // do something
  console.log(i)
  i++
}
console.log(i) // 10
```

>[C语言灵魂拷问：++i为何比i++执行效率高！有何区别？](https://mp.weixin.qq.com/s/9UQ2xQ3tj7akN2Kwv7rLYg)
