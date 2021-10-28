/*
 * @star
 * find the file that's status is A
 * automatic prepend the lastest date by git add hooks
 * if the file is edit
 */

const rename = require("./lib/preAddHooks");
const gitChangedFiles = require("@ebsolutions/git-my-files");

let list = gitChangedFiles("../_posts");
let status = ["M", "A"];
list = list
  .filter((item) => status.includes(item.status))
  .map((item) => item.filename);
rename(list);
