const fs = require("fs");
const path = require("path");
// const url = path.join("../../../Downloads/user-15312191-1635151308/日记本/");
// 文件的绝对路径

const convert = (url) => {
  fs.readdir(url, "utf8", (err, fileList) => {
    if (err) throw err;
    fileList.forEach((item, index) => {
      // 获取文件后缀名
      let oldName = item;

      // 新名称,根据需求修改名称，可以使用正则等等
      // 后缀可用之前的type 也可统一自定义

      let reg = /2021-10-21-/;
      if (!reg.test(oldName)) {
        let newName = "2021-10-21-" + oldName;
        fs.rename(url + oldName, url + newName, (err) => {
          if (err) {
            throw err;
          }
          fs.copyFile(url + newName, `../_posts/${newName}`, (err) => {
            if (err) {
              console.error(err);
              throw err;
            }
          });
        });
      }
    });
  });
};

module.exports = convert;
