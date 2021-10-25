const gitDiffArchive = require("git-diff-archive");
const rename = require("./rename");

gitDiffArchive().then((res) => {
  
  res.exclude = res.exclude.map((item) => item.replace(/_posts/, ""));
  rename(res.exclude);
  
});
