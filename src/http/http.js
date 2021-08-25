// 1、引入axios
import axios from 'axios'
// 2、创建axios的实例
axios.defaults.baseURL = 'http://localhost:8080/api'
// 3、axios的拦截--request
axios.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

// 4、axios的拦截--response
axios.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

// 5、get请求的封装
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'get',
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 6、post请求封装  默认json格式:'Content-Type':'application/json',如果是文件上传，可以修改headers为 headers: { 'Content-Type': 'multipart/form-data' }
export function post (url, params = {}, headers = {'Content-Type': 'application/json'}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: params,
      headers: headers
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 7、get请求的封装
export function del (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'delete',
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 8、put请求封装  默认json格式:'Content-Type':'application/json',如果是文件上传，可以修改headers为 headers: { 'Content-Type': 'multipart/form-data' }
export function put (url, params = {}, headers = {'Content-Type': 'application/json'}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'put',
      data: params,
      headers: headers
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

// 9、将模块暴露
export default {
  get,
  post,
  del,
  put
}
