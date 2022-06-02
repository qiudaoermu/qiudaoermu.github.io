const fs = require("fs");
var unzip = require("unzip");
const download = require("download");

(async () => {
  fs.writeFileSync(
    "posts.zip",
    await download("https://www.jianshu.com/backup/download", "./dist", {
      headers: {
        Cookie:
          "_ga=GA1.2.438275822.1635925393; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217ce4ba2a0fca7-0ccd32af2de98a-1c306851-1296000-17ce4ba2a10e08%22%2C%22first_id%22%3A%2217ce4ba2a0fca7-0ccd32af2de98a-1c306851-1296000-17ce4ba2a10e08%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217ce4ba2a0fca7-0ccd32af2de98a-1c306851-1296000-17ce4ba2a10e08%22%7D; __yadk_uid=5gzGbpt2oUFIKeVvCScvrBrjfOySWt8n; UM_distinctid=180acfb77211ec-01699f214b0fe8-1c3d645d-13c680-180acfb7722572; CNZZDATA1279807957=1026422754-1635919914-%7C1652168757; read_mode=day; default_font=font2; locale=zh-CN; Hm_lvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1652169604,1652345704,1653111270; _gid=GA1.2.246189314.1653870698; remember_user_token=W1sxNTMxMjE5MV0sIiQyYSQxMSRYeWU3R2ZwZVI2djJ0eENqbE44bkwuIiwiMTY1NDE0NDQ2Ni40Mjk0NDg0Il0%3D--17a128c1869ba18c4f02c7a27d4a635369cb2416; web_login_version=MTY1NDE0NDQ2Ng%3D%3D--288b42b35602f4dc7a55eb9bbd2a83683aa6b4b7; _m7e_session_core=ba9d90b215eae6a58e173137b3def9b4; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215312191%22%2C%22first_id%22%3A%2217ce4ba2a0fca7-0ccd32af2de98a-1c306851-1296000-17ce4ba2a10e08%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217ce4ba2a0fca7-0ccd32af2de98a-1c306851-1296000-17ce4ba2a10e08%22%7D; Hm_lpvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1654144498",
      },
    })
  );

  // var extract = unzip.Extract({ path: "./" });
  // fs.createReadStream("./dist/posts.zip").pipe(extract);

  // extract.on("close", function () {
  //   console.log("解压完成!!");
  //   //删除
  // });

  // extract.on("error", function (err) {
  //   console.log(err);
  // });
})();
