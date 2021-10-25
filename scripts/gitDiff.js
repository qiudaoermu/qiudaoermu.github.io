const rename = require("./renameBeforeAdd");
const gitChangedFiles = require("@ebsolutions/git-my-files");

let list = gitChangedFiles("../_posts");
list = list.filter((item) => item.status === "A").map((item) => item.filename);
rename(list);
