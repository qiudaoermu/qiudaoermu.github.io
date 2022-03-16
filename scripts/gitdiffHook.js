/*
 * Copyright (C) 2021-2039 star <qiudaoermu@gmail.com>
 * find the file that's status is A
 * automatic prepend the lastest date by git add hooks
 * if the file is edit
 */

const rename = require("./lib/newestName");
const gitChangedFiles = require("@ebsolutions/git-my-files");

let list = gitChangedFiles("../_posts");
let status = ["M", "A"];
// console.log(list);
list = list
  .filter((item) => status.includes(item.status))
  .map((item) => item.filename);
console.log(list);
rename(list);
