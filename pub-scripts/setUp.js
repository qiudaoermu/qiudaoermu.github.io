/*
 * Copyright (C) 2021-2039 star <qiudaoermu@gmail.com>
 * download blog from jianshu.com and copy it into github page
 * unar it , replace it in the _post.
 * automatic prepend the lastest date before git add .
 */
const download = require("download");
const fs = require("fs");
const config = require("./config");
const path = require("path");
const WriteFile = require("./lib/writeFile");
const { exec } = require("child_process");
const file = new WriteFile();
class Decompress {
  constructor({ input, output }) {
    this.inputPath = input;
    this.unRarPath =  output
    this.suffix = ".rar";
    this.prefix = "user";
  }
  deleteUnrarDir() {
    // delete exit output folder
    exec(`rm -rf ${this.unRarPath}`);
  }

  unCompress() {
    this.deleteUnrarDir();
    const inputRarPath = this.newestRar();
    exec(
      `unar  ${inputRarPath}  -o ${this.unRarPath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        // 简书文章分为不同累不，解压到不同文件夹
        let childDirs = fs.readdirSync(this.unCompressPath());
        childDirs.forEach((item) => {
          file.addTags(this.unCompressPath() + "/" + item + "/");
        });
        if (stderr) console.error(`stderr: ${stderr}`);
      }
    );
  }
  unCompressPath() {
    // 更新解压后的路径，获取解压后的文件名字，偶尔情况下
    // 解压前和解压后，文件名称不一样,需要重新读取文件名

    const unarFieName = fs
      .readdirSync(this.unRarPath)
      .filter((item) => item.indexOf(this.prefix) !== -1);
    const unarFiePath = this.unRarPath + "/" + unarFieName;
    return unarFiePath;
  }
  // 获取最新文章的压缩包
  newestRar() {
    const readDir = fs
      .readdirSync(this.inputPath)
      .filter(
        (item) =>
          item.indexOf(this.suffix) !== -1 && item.indexOf(this.prefix) !== -1
      );
    readDir.sort();
    return path.join(this.inputPath, readDir[readDir.length - 1]);
  }
}
let cwd = process.cwd();

const decompress = new Decompress({
  input: __dirname + config.downloadPath,
  output: cwd +  "/output",
});

  // download(
  //   "https://upload-images.jianshu.io/upload_images/15312191-cd7b966ad6e65360.png?imageMogr2/auto-orient/strip|imageView2/2/w/762/format/webp",
  //   "./dist"
  // ).catch((err) => {
  //   console.error(err);
  // });
(async () => {
  //  await download(config.downloadUrl, __dirname + config.downloadPath, {
  //    headers: {
  //      Cookie: config.cookie,
  //    },
  //  })
  //    .then((res) => {
  //      console.log(res);
  //    })
  //    .catch((error) => {
  //      console.log(error, "********************************");
  //    });

  decompress.unCompress();
})();
