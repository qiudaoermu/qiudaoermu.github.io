const fs = require("fs");
const path = require("path");
const url = path.join("../_posts");
const dayPrex = require("./dayPrex");
// 文件的绝对路径
const rename = (fileList) => {
  console.log(fileList, "fileList");
  fileList.forEach((item, index) => {
    let newName = item.replace(/\d{4}-\d{2}-\d{2}-/, dayPrex);
    item = item.replace("../_posts", "");
    newName = newName.replace("../_posts", "");
    fs.rename(url + item, url + newName, (err) => {
      throw err;
    });
  });
};

module.exports = rename;
