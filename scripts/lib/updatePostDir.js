const { exec } = require("child_process");
const fs = require("fs");
const prex = "2022-03-16-";
const postDir = "../_posts";
const datePre = /\d{4}-\d{2}-\d{2}-/;
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

const renameFileByAddDatePrexInUnarTagPath = (
  unarTagPath,
  prex,
  excludeDatePrexFile
) => {
  let datePrexFile
  if (!datePre.test(excludeDatePrexFile))  {
    datePrexFile = prex + excludeDatePrexFile;
  } else {
    datePrexFile = excludeDatePrexFile;

  }
  fs.rename(
    unarTagPath + excludeDatePrexFile,
    unarTagPath + datePrexFile,
    (err) => {
      if (err) {
        throw err;
      }
      copyFileToPost(unarTagPath + datePrexFile, `${postDir}/${datePrexFile}`);
    }
  );
  console.log("🎉🎉, completed 100% ");
};

const addTagsOnHeader = (file, content) => {
  fs.writeFileSync(file, content, (err) => {
    if (err) throw err;
    console.log("写入成功");
  });
};
const readFile = (file, excludeDatePrexFile, prex) => {
  let postContent = fs.readFileSync(file, "utf-8");
  let s = file.split("/");
  let tags = s[s.length - 2];
  let note = `---
  layout: post
  tilte: "${excludeDatePrexFile}"
  date: ${prex}
  tags: 
    - ${tags}\n
---\n\n`;
  let contentTag = `
* content
{:toc}\n\n
`;
  const content = note + contentTag + postContent;
  return content;
};

/*
 * @param {unarTagPath}  标签目录 output/user-15312191-1635523978/编程范式/
 */

const updatePostDir = (unarTagPath) => {
  // unarTagPath ...output
  deletePostDir(postDir);
  makePostdir(postDir);

  fs.readdir(unarTagPath, "utf8", (err, fileList) => {
    if (err) throw err;
    fileList.forEach((excludeDatePrexFile) => {
      // 获取文件后缀名
      const filePath = unarTagPath + excludeDatePrexFile;
      const postContent = readFile(filePath, excludeDatePrexFile, prex);
      addTagsOnHeader(filePath, postContent);
      const reg = new RegExp(`${prex}`);
      if (reg.test(excludeDatePrexFile)) return;
      renameFileByAddDatePrexInUnarTagPath(
        unarTagPath,
        prex,
        excludeDatePrexFile
      );
    });
  });
};

module.exports = updatePostDir;
