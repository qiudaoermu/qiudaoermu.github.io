const https = require('https')
let cookie = 'read_mode=day; default_font=font2; locale=zh-CN; UM_distinctid=17ce4ba31036a6-0bf422af657f29-1c306851-13c680-17ce4ba31049e3; web_login_version=MTYzNTkyNTAxOQ%3D%3D--0110059388ddc1035c36ef0da7b4a3ab64b6515a; _ga=GA1.2.438275822.1635925393; Hm_lvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1636073961,1636175218,1636175361,1636194619; remember_user_token=W1sxNTMxMjE5MV0sIiQyYSQxMSRYeWU3R2ZwZVI2djJ0eENqbE44bkwuIiwiMTYzNjI4MzYyMS40MjExNDc2Il0%3D--3b561e0184341ae7b27a27d637945867e5c75f0b; _m7e_session_core=54cc7d0d22242ef4ec7839d95be8a186; _gid=GA1.2.1955060594.1636296254; CNZZDATA1279807957=1026422754-1635919914-%7C1636289886; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2215312191%22%2C%22first_id%22%3A%2217ce4ba2a0fca7-0ccd32af2de98a-1c306851-1296000-17ce4ba2a10e08%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217ce4ba2a0fca7-0ccd32af2de98a-1c306851-1296000-17ce4ba2a10e08%22%7D; Hm_lpvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1636296714'
const options = {
  hostname: 'https://www.jianshu.com/backup/download',
  port: 8080,
  path: '/backup/download',
  method: 'GET',
  headers: {
    'Cookie': cookie,
  }
}

const req = https.get('https://www.jianshu.com/backup/download', res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

// req.write(data)
req.end()