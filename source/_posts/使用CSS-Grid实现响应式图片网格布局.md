---
title: "使用CSS-Grid实现响应式图片网格布局"
date: 2025-04-17
tags: 
- 开发日常
---
# 使用CSS Grid实现响应式图片网格布局

## 概述

在现代Web开发中，CSS Grid布局系统为我们提供了一种强大的方式来创建复杂的响应式布局。本文将介绍如何使用`display: grid`和相关属性来实现一个美观的图片网格布局。

## 核心API

```css
display: grid;
grid-template-columns: repeat(auto-fill, 179.72px);
column-gap: 82.03px;
row-gap: 20px;
```

## 实现细节

### 1. 网格容器设置

首先，我们为容器元素设置`display: grid`属性，将其转换为网格布局容器：

```css
.image-grid {
  display: grid;
  margin-top: 26px;
  grid-template-columns: repeat(auto-fill, 179.72px);
  column-gap: 82.03px;
  row-gap: 20px;
}
```

- `grid-template-columns: repeat(auto-fill, 179.72px)`：自动填充容器，每列宽度固定为179.72px
- `column-gap: 82.03px`：设置列间距为82.03px
- `row-gap: 20px`：设置行间距为20px

### 2. 网格项样式

每个网格项（图片卡片）的样式如下：

```css
.image-card {
  cursor: pointer;
  width: 179.72px;
  box-sizing: border-box;
  
  .image {
    width: 100%;
    height: 180px;
  }
  
  .image-title {
    /* 标题文本样式 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
    font-family: PingFangSC-Semibold;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
  }
  
  .image-price {
    /* 价格样式 */
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    font-size: 18px;
    color: #ff0000;
    
    span {
      margin-left: 4px;
    }
  }
  
  .image-description {
    /* 描述文本样式 */
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #666666;
    margin-top: 4px;
    width: 182px;
    height: 17px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
```

### 3. Vue组件实现

```html
<template>
  <div class="image-grid">
    <div
      v-for="(image, index) in imageData"
      :key="index"
      class="image-card"
      @click="handleClick(image)"
    >
      <img :src="image.coverImage" class="image" />
      <div class="image-title" :title="image.title">{{ image.title }}</div>
      <div class="image-price">
        <b>¥</b>
        <span>{{ image.price }}</span>
      </div>
      <div class="image-description" :title="image.description">
        {{
          image.description.length > 77
            ? image.description.slice(0, 77) + '...'
            : image.description
        }}
      </div>
    </div>
  </div>
</template>
```

## 效果展示

![网格布局效果图](https://upload-images.jianshu.io/upload_images/15312191-fcd404be0746e19b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 总结

通过CSS Grid布局，我们可以轻松实现响应式的图片网格展示。这种布局方式具有以下优点：

1. **响应式设计**：`auto-fill`属性使网格能够自动适应不同屏幕尺寸
2. **精确控制**：可以精确设置网格项的尺寸和间距
3. **简洁代码**：相比传统布局方式，代码更加简洁明了

这种布局方式特别适合产品展示、图片画廊等需要网格化展示内容的场景。
