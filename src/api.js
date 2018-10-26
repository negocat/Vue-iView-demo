import axios from "axios";
import { loading, Msg } from "./common";

// 本地环境
 axios.defaults.baseURL = "http://127.0.0.1/";
// axios.defaults.baseURL = process.env.BASE_URL;
// console.log("baseURL", process.env.BASE_URL);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('access_token');
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    loading.open();
  } else if (config.method === 'put') {
    loading.open();
  }
  // loading.open();
  return config;
});
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log('interceptor response: ' + response.status);
  loading.close();
  // console.log(response);
  return response;
}, function (error) {
  loading.close();
  let res = error.response;
  console.log(res);
  if (res.status !== undefined && res.status === 401) {
    Msg.showError("请登录！");
    setInterval(function () {
      location.replace('#/login');
    }, 1500);
  } else if (res.status !== undefined && res.status === 403) {
    Msg.showError("您没有权限操作！");
  }
  Msg.showError(res.data.message);
  return Promise.reject(error);
});

const api = {}

export default api