---
  layout: post
  tilte: "codePointAt-polly解疑.md"
  date: 2022-3-16-
  tags: 
    - 开发日常

---


* content
{:toc}


UTF-16 编码单元匹配能用一个 UTF-16 编码单元表示的 Unicode 码点。

如果 Unicode 码点不能用一个 UTF-16 编码单元表示（因为它的值大于`0xFFFF`），则所返回的编码单元会是这个码点代理对的第一个编码单元) 。

如果你想要整个码点的值，使用 [`codePointAt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)。


https://www.zhuyuntao.cn/js%E4%B8%ADarraybuffer%E4%B8%8Eblob%E7%9A%84%E5%8C%BA%E5%88%AB
