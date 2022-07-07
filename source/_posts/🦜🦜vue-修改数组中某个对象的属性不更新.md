---
title: "🦜🦜vue-修改数组中某个对象的属性不更新"
date: 2021-03-11
tags: 
- 开发日常
---
比如要有如下数组
```
data() {
  return {
    certificateData: [
      {
        name: 'xxx',
        type: '环境证书',
        imgs:[{url: 'xxxx.png']
      },
      {
        name: 'yyy',
        type: '安全证书',
        imgs:[{url: 'yyy.png'}]
      }
    ]
}
```
如果属性已经存在
修改对象中 imgs属性
```
/// index为索引
this.certificateData[index].imgs = [url: 'osodo.png'];
```
如果属性不存在
```
this.$set(this.certificateData, index, {
  ...this.certificateData[index],
  buff: 'bits'
})
```
