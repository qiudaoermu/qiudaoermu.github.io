const fs = require("fs");
const path = require("path");

let dowloadPath = "../../../Downloads";
let outPutPath = "../output";
let exportFolderSubfile = "/日记本/";

let readDir = fs.readdirSync(dowloadPath);

const addDateToFile = require("./addDateToFile");
readDir = readDir.filter(
  (item) => item.indexOf(".rar") !== -1 && item.indexOf("user") !== -1
);
readDir.sort();

let lastUpdateRar = readDir[readDir.length - 1];
const lastRarPath = path.join(dowloadPath, lastUpdateRar);

let outputPath =
  outPutPath + "/" + lastUpdateRar.replace(".rar", "") + exportFolderSubfile;
const { exec } = require("child_process");

// delete exit output folder
exec(`rm -rf ../output`);

// unCompress newest rar
exec(`unar  ${lastRarPath} -o ${outPutPath}`, (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }
  addDateToFile(outputPath);
  console.log(`stderr: ${stderr}`);
});
