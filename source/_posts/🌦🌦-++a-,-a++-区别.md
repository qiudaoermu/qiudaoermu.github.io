---
title: "ð¦ð¦-++A-,-A++-åºå«"
date: 2021-07-25
tags: 
- å¼åæ¥å¸¸
---
#### ç¸åç¹

a++ å ++açé½æ¯ç»a+1

#### ä¸åç¹

a++æ¯ååå ç¨åºçè¿è¡å+1ï¼
è++aåæ¯å+1ååå ç¨åºçè¿è¡ã

ä»¥ä¸çº¯å±åºè¯

ç»è¿åCè¯­æ±ç¼åæï¼å¨æ²¡æä¸­é´åéåä¸çæåµä¸ï¼æ±ç¼ä»£ç ä¸æ¸ä¸æ ·

å¦ææä¸­é´åéï¼æ¯å¦ b = a++ï¼ç¼è¯å¨ä¼åä¿å­ä¸ä¸ªå¼ï¼å++

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
	xorl	%eax, %eax // å¤è¿ä¸è¡ðððððð
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

#### Exampleï¼
```js

var a = 2ï¼  
var b = a++ï¼    
è¿è¡åï¼ b = 2ï¼a =3 ï¼      

```
```js

var a = 2ï¼  
var b = ++aï¼    
è¿è¡åï¼ b = 3ï¼a =3ï¼

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


#### for å¾ªç¯æ¯æä¹æ§è¡ç


```
for( var i = 0; i < 10; i++) {
  // do something
  console.log(i)
  // ææä¸è¥¿æ§è¡å®äºå+1
  // å¦æå¸æä»0 å¼å§ï¼i= 
}
console.log(i) // 10
```
ç­åäº

```
let i = 0;
while(i < 10) {
 // do something
  console.log(i)
  i++
}
console.log(i) // 10
```

>[Cè¯­è¨çµé­æ·é®ï¼++iä¸ºä½æ¯i++æ§è¡æçé«ï¼æä½åºå«ï¼](https://mp.weixin.qq.com/s/9UQ2xQ3tj7akN2Kwv7rLYg)
