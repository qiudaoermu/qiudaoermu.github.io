let month = new Date().getMonth() + 1;
month = month >= 10 ? month : "0" + month;
let newPrex =
  new Date().getFullYear() + "-" + month + "-" + new Date().getDate() + "-";
module.exports = newPrex;
