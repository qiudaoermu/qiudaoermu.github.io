const fs = require("fs");
const path = require("path");
const url = path.join("../_posts");
const dayPrex = require("./dayPrex");
// 文件的绝对路径
const rename = (fileList) => {
  fileList.forEach((item, index) => {
    let newName = item.replace(/\d{4}-\d{2}-\d{2}-/, dayPrex);
    fs.rename(item, newName, (err) => {
      if (err) throw err;
      console.log("Rename complete!");
    });
  });
};

module.exports = rename;
