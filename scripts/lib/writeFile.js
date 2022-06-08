const { exec } = require("child_process");
const fs = require("fs");

class WriteFile {
  
  constructor() {
    this.prex = "2021-01-11-";
    this.datePre = /\d{4}-\d{2}-\d{2}-/;
    this.postDir = "../_posts";
  }
  deletePostDir(path) {
    exec(`rm -rf ${path}`);
  }

  makePostdir(postDir) {
    exec(`mkdir ${postDir}`);
  }

  copyFileToPost(file, target) {
    fs.copyFile(file, target, (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
    });
  }

  renameFileByAddDatePrexInUnarTagPath(unarTagPath, prex, excludeDatePrexFile) {
    let datePrexFile;
    if (!this.datePre.test(excludeDatePrexFile)) {
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
        this.copyFileToPost(
          unarTagPath + datePrexFile,
          `${this.postDir}/${datePrexFile}`
        );
      }
    );
    console.log("🎉🎉, completed 100% ");
  }

  addTagsOnHeader(file, content) {
    fs.writeFileSync(file, content, (err) => {
      if (err) throw err;
      console.log("写入成功");
    });
  }
  readFile(file, excludeDatePrexFile, prex) {
    let postContent = fs.readFileSync(file, "utf-8");

    if (this.datePre.test(excludeDatePrexFile)) {
      prex = excludeDatePrexFile.match(this.datePre)[0];
    }
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
  }

  /*
   * @param {unarTagPath}  标签目录 output/user-15312191-1635523978/编程范式/
   */

  addTags(unarTagPath) {
    // unarTagPath ...output
    this.deletePostDir(this.postDir);
    this.makePostdir(this.postDir);

    fs.readdir(unarTagPath, "utf8", (err, fileList) => {
      if (err) throw err;
      fileList.forEach((excludeDatePrexFile) => {
        // 获取文件后缀名
        const filePath = unarTagPath + excludeDatePrexFile;
        const postContent = this.readFile(
          filePath,
          excludeDatePrexFile,
          this.prex
        );
        this.addTagsOnHeader(filePath, postContent);

        this.renameFileByAddDatePrexInUnarTagPath(
          unarTagPath,
          this.prex,
          excludeDatePrexFile
        );
      });
    });
  }
}

module.exports = WriteFile;
