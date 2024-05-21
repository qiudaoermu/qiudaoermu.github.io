---
title: "🌈-flex布局--一行显示固定个数,强制换行且均匀分布"
date: 2021-03-05
tags: 
- css
---

![](https://upload-images.jianshu.io/upload_images/15312191-1024c1d63996d670.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
/* flex-direction 决定主轴的方向 row(默认)|row-reverse|column|column-reverse*/
/* flex-direction: row; */

/* flex-wrap决定当排列不下时是否换行以及换行的方式,nowrap(默认)|wrap|wrap-reverse */
/* flex-wrap:wrap; */
```
```
--html
  <ul class='upload-item'>
          <Form ref="formInline" :model="formInline"   :label-width='152'>
            <li v-for='(v, i) in formInline.testLists'>
              <FormItem  
                :label='v.name'  
                style='display:flex;'
              >
                <Upload
                  ref="uploadFoods"
                  :accept='accept'
                  :default-file-list="v.list"
                  :on-success="foodLicenceHandleSuccess.bind(null, {'index':i,'data':v})"
                  :on-error="handleError"
                  :max-size="2048 * 4"
                  :headers="fileHeader"
                  :before-upload="handleBeforeUpload"
                  action="/adminapi/file/upload"
                  >
                  <div style="display: flex; align-items:center;cursor: pointer;">
                    <img
                      class="upload-icon"
                      src="@/assets/images/register/add.png"
                      width="20" />
                    <p class="upload-box-action">上传文件</p>
                  </div>
                </Upload>
              </FormItem>
            </li>
          </Form>  
        </ul>
```
```
---css
.mycards{ // 大盒子
  width: 98%;
  display: flex;
  flex-wrap: wrap; // 换行
  justify-content: space-between;
}
.card_item{ // 每个item
    flex: 1;
    width: 33.3%;
    min-width: 33.3%; // 加入这两个后每个item的宽度就生效了
    max-width: 33.3%; // 加入这两个后每个item的宽度就生效了
    height: 350px;
  }

```
