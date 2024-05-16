---
title: "--🌦🌦-element-upload-使用axios-代理上传"
date: 2023-12-22
tags: 
- 开发日常
---
element-upload，涉及到跨域上传，需要使用http-request自定义上传
```
 <el-upload
            action="#" // 修改为#
            :http-request="hanldeUploadFile"
            class="mr-10"
            :show-file-list="false"
            :on-exceed="handleExceed"
          >
            <el-button
              type="primary"
              :icon="UploadFilled"
              @click="handleRefresh"
              >上传</el-button
            >
</el-upload>
```
 上传函数


```js
function hanldeUploadFile(param) {
  // 上传请求头为：uploadFile：binary
  // 格式 a=123&c=456
  // 只有 FormData 可以传输二进制文件流
  const formData = new FormData(); 
  formData.append('uploadFile', param.file);
  getPathToExcel(formData).then(res => {
    console.log(res);
  });
}
```

api 记得添加 header Content-Type
```
export function getPathToExcel(data) {
  return http.post(`/GLuserCode/logins/getPathToExcel`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
```
axios 封装
```
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

const service: AxiosInstance = axios.create({
  withCredentials: false,
  timeout: 50000,
  // baseURL: import.meta.env.VITE_APP_BASE_API,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(config, 'interceptors');
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.res !== 1) {
      ElMessage.error(res.resMsg || 'Error');
      return Promise.reject(res.resMsg || 'Error');
    } else {
      return res;
    }
  },
  (error: AxiosError) => {
    console.log(`err${error}`);
    ElMessage.error(error.message || 'Error');
    return Promise.reject(error.message);
  }
);

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url);
  },
  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config);
  },
};

export default service;

```

vite.config.ts配置跨域请求配置

```
   server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: {
        '/GLuserCode': {
          target: 'http://10.1.81.45:9080/pf3/GLuserCode/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/GLuserCode/, ''),
        },
      },
    },
```
