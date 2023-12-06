---
  layout: post
  tilte: "2023-11-29-🌦🌦-vite+vue3使用tailwindcss.md"
  date: 2023-11-29-
  tags: 
    - 开发日常

---


* content
{:toc}


由于最新官网的方案没效果。

### 1.安装tailwindcss

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```
### 2.创建tailwindcss的配置文件

```
npx tailwindcss init
```
这将会在您的项目根目录创建一个最小化的 tailwind.config.js 文件：
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {}
  },
  plugins: []
}

```
### 3.在入口中引入tailwind
```
// main.ts
import "tailwindcss/tailwind.css"
```

### 4.配置tailwind.config.js文件

```
content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
```

在 tailwind.config.js 文件中，配置 content 选项指定所有的 pages 和 components ，使得 Tailwind 可以在生产构建中，对未使用的样式进行tree-shaking。

### 5.配置vite.config选项
```
    css: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")]
      }
    }
```

使用postcss的tailwindcss和autoprefixer插件对，css进行处理
