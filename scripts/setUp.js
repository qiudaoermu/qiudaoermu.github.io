/*
 * Copyright (C) 2021-2039 star <qiudaoermu@gmail.com>
 * download blog from jianshu.com and copy it into github page
 * unar it , replace it in the _post.
 * automatic prepend the lastest date before git add .
 */

const fs = require("fs");
const path = require("path");
const updatePostDir = require("./lib/updatePostDir");
const { exec } = require("child_process");

class Decompress {
  constructor({ input, output }) {
    this.inputPath = input;
    this.unRarPath = path.join(__dirname, output);
    this.readDirs = "";
    this.suffix = ".rar";
    this.prefix = "user";
  }
  deleteUnrarDir() {
    // delete exit output folder
    exec(`rm -rf ${this.unRarPath}`);
  }
  readDir() {
    this.readDirs = fs.readdirSync(this.inputPath);
  }

  unCompress() {
    const relativeInputPath = this.lastModifiedRar();
    const oldAbsoluteInputPath = path.join(this.inputPath, relativeInputPath);
    exec(
      `unar  ${oldAbsoluteInputPath}  -o ${this.unRarPath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        this.unRarPath = this.updateUnrarPath();
        let childDir = fs.readdirSync(this.unRarPath);
        childDir.forEach((item) => {
          updatePostDir(this.unRarPath + "/" + item + "/");
        });
        console.log(`stdout: ${stdout}`);
        if (stderr) console.error(`stderr: ${stderr}`);
        console.log("unar completed！50%");
      }
    );
  }
  updateUnrarPath() {
    // 更新解压后的路径，获取解压后的文件名字，偶尔情况下
    // 解压前和解压后，文件名称不一样

    const unarFieName = fs
      .readdirSync(this.unRarPath)
      .filter((item) => item.indexOf(this.prefix) !== -1);
    const unarFiePath = this.unRarPath + "/" + unarFieName;
    return unarFiePath;
  }
 
  lastModifiedRar() {
    const readDir = this.readDirs.filter(
      (item) =>
        item.indexOf(this.suffix) !== -1 && item.indexOf(this.prefix) !== -1
    );
    readDir.sort();
    return readDir[readDir.length - 1];
  }
}

const decompress = new Decompress({
  input: "../../../Downloads",
  output: "../output",
});

decompress.deleteUnrarDir();
decompress.readDir();
decompress.unCompress();
