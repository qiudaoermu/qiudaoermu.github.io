/*
 * @chenzhenfei
 * download blog from jianshu.com and copy it into github page
 * unar it , replace it in the _post.
 * automatic prepend the lastest date before git add .
 */

const fs = require("fs");
const path = require("path");
const addDateToFile = require("./lib/addDatePrex");
const { exec } = require("child_process");

class File {
  constructor({ input, output }) {
    this.dowloadPath = input;
    this.outPutPath = path.join(__dirname, output);
    this.exportFolderSubfile = "/日记本/";
    this.readDirs = "";
    this.suffix = ".rar";
    this.prefix = "user";
  }
  deleteFolder() {
    // delete exit output folder
    exec(`rm -rf ${this.outPutPath}`);
  }
  readDir() {
    this.readDirs = fs.readdirSync(this.dowloadPath);
  }
  unCompress() {
    const relativePath = this.getNewestRar();
    console.log(relativePath, "********************************");
    const absolutePath = path.join(this.dowloadPath, relativePath);

    let outputPath =
      this.outPutPath +
      "/" +
      relativePath.replace(this.suffix, "") +
      this.exportFolderSubfile;
    console.log(absolutePath, "absolutePath********************************");
    console.log(this.outPutPath, "outPutPath********************************");
    exec(
      `unar  ${absolutePath} -o ${this.outPutPath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(outputPath, "********************************");
        addDateToFile(outputPath);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    );
  }
  getNewestRar() {
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
