---
title: "ivew-动态新增-input--v-model绑定"
date: 2021-01-11
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
            <FormItem label="联系人" >
              <Input v-model="item.contactor" placeholder="请输入联系人" clearable :style="{width: '100%'}">
              </Input>
            </FormItem>
            <FormItem label="联系电话" >
              <Input v-model="item.contactTel" placeholder="请输入联系电话" clearable :style="{width: '100%'}">
              </Input>
            </FormItem>
          </div>
</div>
```
v-model
```
v-model ="item.contactor"
```
#####总结 ：item. + key

