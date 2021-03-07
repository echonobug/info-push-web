import request from '@/util/request'

const TaskApi = {
  List: '/task/list'
}

export function list (parameter) {
  return request({
    url: TaskApi.List,
    method: 'get',
    params: parameter
  })
}
