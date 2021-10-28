/*
 * @chenzhenfei
 * download blog from jianshu.com and copy it into github page
 * unar it , replace it in the _post.
 * automatic prepend the lastest date before git add .
 */

const fs = require("fs");
const path = require("path");
const addDatePrex = require("./lib/addDatePrex");
const { exec } = require("child_process");

class File {
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
    // this.renameRar(oldAbsoluteInputPath, newAbsoluteInputPath);
    let outputPath =
      this.outPutPath +
      "/" +
      relativeInputPath.replace(".rar", "") +
      this.exportFolderSubfile;
    // console.log(outputPath, "outPutPath*****");
    // console.log(newAbsoluteInputPath, "newAbsoluteInputPath******");
    // console.log(this.outPutPath, "******");
    exec(
      `unar  ${oldAbsoluteInputPath}  -o ${this.outPutPath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        addDatePrex(outputPath);
        console.log(`stdout: ${stdout}`);
        if (stderr) console.error(`stderr: ${stderr}`);
        console.log("********unar completed!**********");
      }
    );
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

const file = new File({
  input: "../../../Downloads",
  output: "../output",
});

file.deleteFolder();
file.readDir();
file.unCompress();
