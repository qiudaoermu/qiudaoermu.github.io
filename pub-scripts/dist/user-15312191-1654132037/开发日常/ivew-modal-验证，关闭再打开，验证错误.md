ivew 里弹框存在表单验证时，再次打开出现校验问题；

![image.png](https://upload-images.jianshu.io/upload_images/15312191-f2a366b87632f04a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

1.
```
用 v-if 把modal内容包起来
```
2.把 visable放在 
```

this.formData = {
key: value,
.....
}
this.$nextTick(() => {
    this.visable = true;
})
```
