---
title: "🦜🦜vue-对象的属性是数组-watch监听不了"
date: 2021-01-17
tags: 
- 开发日常
---
```
data() {
 formData: {
        areaId: 14,
        isNew: true,
        isDraft: false,
        cName: '',
        costRate: 0,
        price: 0,
        grammage: 0,
        pictureUri: '',
        testArr: [],
        materialListOrigin: []
      },
},
 watch: {
    "formData.materialListOrigin": {
      handler(v) {
        debugger
        let r = v.reduce((sum, item) => {
          sum += item.needWeight * item.unitPrice;
          return sum;
        }, 0);
        this.formData.price = fixedPoint(r, 2);
        let s  = v.reduce((sum, item) => {
          if (item.isWeight) {
            sum += item.productWeight;
          }
          return sum
        }, 0);
        if (this.dishesName === '小吃类') {
          this.formData.grammage = 0;
          return;
        }
        // 成品克数
        this.formData.grammage = fixedPoint(s, 0);
      },
      deep: true
    },
  },
methods() {
 // 新增菜品保存
    saveMateRiarl(name) {
      this.$refs[name].validate((valid) => {
        if (!valid) return;
   
        this.formData.materialListOrigin.push(this.formValidateMetarial);
      })
    },
}
```
问题， this.formData.materialListOrigin.push，watch 不会触发。
原因：对象下的属性是数组，watch不了
解决方法：直接监听对象
```
watch: {
    formData: {
      handler(w) {
       let v = w.materialListOrigin;
        let r = v.reduce((sum, item) => {
          sum += item.needWeight * item.unitPrice;
          return sum;
        }, 0);
        this.formData.price = fixedPoint(r, 2);
        let s  = v.reduce((sum, item) => {
          if (item.isWeight) {
            sum += item.productWeight;
          }
          return sum
        }, 0);
        if (this.dishesName === '小吃类') {
          this.formData.grammage = 0;
          return;
        }
        // 成品克数
        this.formData.grammage = fixedPoint(s, 0);
      },
      deep: true
    },
  },
```
