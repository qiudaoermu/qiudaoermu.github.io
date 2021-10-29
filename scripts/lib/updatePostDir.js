const { exec } = require("child_process");
const fs = require("fs");
const prex = "2021-10-21-";
const postDir = "../_posts";

const deletePostDir = (path) => {
  exec(`rm -rf ${path}`);
};

const makePostdir = (postDir) => {
  exec(`mkdir ${postDir}`);
};

const copyFileToPost = (file, target) => {
  fs.copyFile(file, target, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};

const renameFileByAddDatePrexInUnarPath = (
  unarPath,
  prex,
  excludeDatePrexFile
) => {
  const datePrexFile = prex + excludeDatePrexFile;
  fs.rename(unarPath + excludeDatePrexFile, unarPath + datePrexFile, (err) => {
    if (err) {
      throw err;
    }
    copyFileToPost(unarPath + datePrexFile, `${postDir}/${datePrexFile}`);
  });
  console.log("🎉🎉, completed 100% ");
};

const updatePostDir = (unarPath) => {
  // unarPath ...output
  deletePostDir(postDir);
  makePostdir(postDir);

  fs.readdir(unarPath, "utf8", (err, fileList) => {
    if (err) throw err;
    fileList.forEach((excludeDatePrexFile) => {
      // 获取文件后缀名
      const reg = new RegExp(`${prex}`);
      if (reg.test(excludeDatePrexFile)) return;
      renameFileByAddDatePrexInUnarPath(unarPath, prex, excludeDatePrexFile);
    });
  });
};

module.exports = updatePostDir;
