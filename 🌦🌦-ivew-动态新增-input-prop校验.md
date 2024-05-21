---
title: "🌦🌦-ivew-动态新增-input-prop校验"
date: 2021-01-03
tags: 
- 开发日常
---
有这样的需求如下图：
1.下拉选择select 选择，
2.新增一组 input提交选项

![image.png](https://upload-images.jianshu.io/upload_images/15312191-adb95ea2dca9fa6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
新增input代码如下(只罗列了前两项)：
```
 <!-- 新增园区 -->
<div v-for="(item, index) in formData.areaList" v-if='formData.areaList.length >=1'>
          <div class="form-line">
            <FormItem label="联系人" :prop="'areaList.' + index + '.contactor'" :rules='rules.contactor'>
              <Input v-model="item.contactor" placeholder="请输入联系人" clearable :style="{width: '100%'}">
              </Input>
            </FormItem>
            <FormItem label="联系电话" :prop="'areaList.' + index + '.contactTel'" :rules='rules.contactTel'>
              <Input v-model="item.contactTel" placeholder="请输入联系电话" clearable :style="{width: '100%'}">
              </Input>
            </FormItem>
          </div>
</div>
```
prop这样写
```
 :prop = areaList.' + index + '.contactor
```
#####总结 ： 便利对象 + . + index + . + key
####需要注意的点
######1. prop现在是变量 前面加：
######2.便利的数组对象(areaList), 要在需要最后提交的formData里
######3.单独在新增的FormItem 加rules,比如 :rules='rules.contactor'
```
 rules: {
        contactor: [{
          required: true,
          message: '请输入联系人',
          trigger: 'blur'
        }],
        contactTel: [{
          required: true,
          message: '请输入联系电话',
          trigger: 'blur'
        },
```
######4.新增的数组里需要加入 对应的key
  如下:
```
   let o = {
        contactTel: '',
        contactor: ''
      }
      this.formData.areaList.push(o)
```

