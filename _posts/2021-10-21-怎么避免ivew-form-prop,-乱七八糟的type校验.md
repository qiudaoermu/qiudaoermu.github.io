---
  layout: post
  tilte: "怎么避免ivew-form-prop,-乱七八糟的type校验.md"
  date: 2021-10-21-
  tags: 
    - 开发日常

---

ivew 在参考(其实就是抄袭，api都一样)element的过程中，设置了一些独有的api
比如，在form input校验中，设置了type,比如
```
 <Form
  :model="formValidate" 
  :rules="ruleValidate" >
  <DatePicker type="date" placeholder="Select date" v-    
   model="formValidate.date">
  </DatePicker>
</Form>
```
![image.png](https://upload-images.jianshu.io/upload_images/15312191-385922c598666c54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
一个很简单的日期填写校验，rules如下
```
ruleValidate: {
    date: [{ 
      required: true,
      type: 'date', 
      message: 'Please select the date',
      trigger: 'change' 
    }]  
 }
```
type:'data'是什么意思，这个组件选择之后肯定是个data，这样的校验有什么意义呢。
对于这种类型的校验，统一处理方法
pattern: /.+/ ,  代替 tpye:'data'
```
   date: [{ 
      required: true,
      pattern: /.+/ ,
      message: 'Please select the date',
      trigger: 'change' 
    }]  
```
最后希望这个框架早点下架吧，这种反人性的UI框架对开发者来说就是灾难。
有这功夫去做点有意义的事更划算。
