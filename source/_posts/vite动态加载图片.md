---
title: "vite动态加载图片"
date: 2025-04-25
tags: 
- 开发日常
---
### 获取国家对应的国旗图片（Vite 方式）
在 Vue.js 项目中，若你需要根据国家名称动态加载国旗图片，可以结合 Vite 的静态资源处理功能来实现这一需求。下面是一个实现方案。

#### 1. 模板部分
首先，我们需要在模板中显示国旗图片。假设我们有一个 demands 数组，每个对象中包含一个 countryDelivery 属性，表示国家名称。我们将通过 getCountryFlag 方法动态获取对应的国旗图片路径。
```
 <div
            class="demand-card"
            v-for="(demand, index) in demands"
            :key="index"
          >
            <div class="demand-item flex">
              <div class="country flex align-center" >
                <img :src="getCountryFlag(demand.countryDelivery)" alt="">
              </div>
           
            </div>
 

```
#### 2. JavaScript 部分
getCountryFlag 方法负责接收国家名称并返回对应的图片路径。在 Vite 中，我们可以使用 import.meta.url 来确保正确地处理相对路径。这里的逻辑是根据国家名称拼接出图片路径，如果找不到对应的图片，我们可以返回默认的国旗图片。
demand.countryDelivery 是国家名字，现在assest里有国家图片，国家图片和返回国家名字一致，

```
const getCountryFlag = (countryName) => {
  const countryCode = countryName.toLowerCase();  // 可选：转小写以统一命名规则
  try {
    // 构建动态路径，加载对应国家的国旗图片
    return new URL(`../../../assets/image/${countryCode}.png`, import.meta.url).href;
  } catch (e) {
    // 如果找不到图片，返回默认的国旗图片
    return new URL(`../../assets/image/default.png`, import.meta.url).href;
  }
};

```
