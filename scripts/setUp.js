/*
 * Copyright (C) 2021-2039 star <qiudaoermu@gmail.com>
 * download blog from jianshu.com and copy it into github page
 * unar it , replace it in the _post.
 * automatic prepend the lastest date before git add .
 */

const fs = require("fs");
const path = require("path");
const generatePost = require("./lib/generatePost");
const { exec } = require("child_process");

class Decompress {
  constructor({ input, output }) {
    this.inputPath = input;
    this.outPutPath = path.join(__dirname, output);
    this.exportFolderSubfile = "/日记本/";
    this.readDirs = "";
    this.suffix = ".rar";
    this.prefix = "user";
    this.newName = "userRar";
  }
  deleteFolder() {
    // delete exit output folder
    exec(`rm -rf ${this.outPutPath}`);
  }
  readDir() {
    this.readDirs = fs.readdirSync(this.inputPath);
  }
  renameRar(file, newName) {
    fs.rename(file, newName + ".rar", (err) => {
      if (err) throw err;
      console.log("Rename Rar complete!");
    });
  }
  unCompress() {
    const relativeInputPath = this.newestRarName();
    const oldAbsoluteInputPath = path.join(this.inputPath, relativeInputPath);
    const newAbsoluteInputPath = path.join(this.inputPath, this.newName);
    exec(
      `unar  ${oldAbsoluteInputPath}  -o ${this.outPutPath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        this.outPutPath = this.updateOutputPath();
        console.log(this.outPutPath, "--------------------------------");
        generatePost(this.outPutPath);
        console.log(`stdout: ${stdout}`);
        if (stderr) console.error(`stderr: ${stderr}`);
        console.log("  🎉🎉, unar completed！");
      }
    );
  }
  updateOutputPath() {
    let unarFieName = fs
      .readdirSync(this.outPutPath)
      .filter((item) => item.indexOf("user") !== -1);
    let unarFiePath =
      this.outPutPath + "/" + unarFieName + this.exportFolderSubfile;
    return unarFiePath;
  }
  newestRarName() {
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

decompress.deleteFolder();
decompress.readDir();
decompress.unCompress();
