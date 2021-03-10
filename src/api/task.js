import request from '@/util/request'

const TaskApi = {
  List: '/task/list',
  Log: '/job/log',
  Online: '/task/online',
  Offline: '/task/offline'
}

export function list (parameter) {
  return request({
    url: TaskApi.List,
    method: 'get',
    params: parameter
  })
}

export function online (parameter) {
  return request({
    url: TaskApi.Online,
    method: 'post',
    data: parameter
  })
}

export function offline (parameter) {
  return request({
    url: TaskApi.Offline,
    method: 'post',
    data: parameter
  })
}

export function log (parameter) {
  return request({
    url: TaskApi.Log,
    method: 'get',
    params: parameter
  })
}
