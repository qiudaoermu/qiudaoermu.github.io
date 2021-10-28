const { exec } = require("child_process");
const fs = require("fs");
// 文件的绝对路径
const prex = "2021-10-21-";
const outPutPath = "../_posts";
const deletePostFolder = (path) => {
  exec(`rm -rf ${path}`);
};

const copyFileToPost = (file, target) => {
  fs.copyFile(file, target, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

const reNameFile = (url, oldName, newName) => {
  // console.error(url + newName, "--------------------------------");
  fs.rename(url + oldName, url + newName, (err) => {
    if (err) {
      throw err;
    }
    copyFileToPost(url + newName, `${outPutPath}/${newName}`);
  });
};

const addDatePrex = (url) => {
  deletePostFolder(outPutPath);
  exec(`mkdir ${outPutPath}`);
  fs.readdir(url, "utf8", (err, fileList) => {
    if (err) throw err;
    fileList.forEach((item, index) => {
      // 获取文件后缀名
      const oldName = item;
      const reg = new RegExp(`${prex}`);
      const newName = prex + oldName;
      // console.log(url, "url + oldName");
      if (reg.test(oldName)) return;
      reNameFile(url, oldName, newName);
    });
  });
};

module.exports = addDatePrex;
