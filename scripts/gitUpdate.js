const rename = require("./rename");
const gitChangedFiles = require("@ebsolutions/git-my-files");

/// Check specified folder path
let list = gitChangedFiles("../_posts");
list = list.map((item) => item.filename);
rename(list);
/// Check project root directory
