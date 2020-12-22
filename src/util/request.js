import axios from 'axios'
import store from '@/store'
import { message, notification } from 'ant-design-vue'
import { ACCESS_TOKEN } from '@/util/constant'
import { show403, show500 } from '@/util/router'

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 60000
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const status = error.response.status
    if (status === 403) {
      show403()
    } else if (status === 401) {
      notification.error({
        message: '登录已过期，请重新登录！'
      })
      store.dispatch('LOGOUT').then(() => {
      })
    } else if (status === 500) {
      show500()
    }
  }
  return Promise.reject(error)
}

/**
 * @description axios请求拦截器
 */
// request interceptor
instance.interceptors.request.use(config => {
  const token = localStorage.getItem(ACCESS_TOKEN)
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

/**
 * @description axios响应拦截器
 */
// response interceptor
instance.interceptors.response.use((response) => {
  const result = response.data
  if (result.code && result.code === 200) {
    return result.data
  } else {
    message.error(result.msg)
    return Promise.reject(result)
  }
}, errorHandler)

export default instance
