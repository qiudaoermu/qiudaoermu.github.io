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
修改对象中 imgs属性
```
/// index为索引
this.$set(this.certificateData, index, {
    ...this.certificateData[index],
    imgs: [{url:'zzz.png;}]
});
```
