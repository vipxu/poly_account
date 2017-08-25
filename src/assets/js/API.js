import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = ' http://39.108.57.46/juzhang';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export function fetch(url, params) {
  return axios.post(url, params);
}

export default {
  //获取科目列表
  getSubjectList(params) {        
    return fetch('/acctTitCjx/queryAcctTitList', params)        
  },
  //获取科目列表

  getAbstractList(params){
    return fetch('/dsignCjx/queryDigestList', params)
  }
}
