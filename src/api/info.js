import request from '@/util/request'

const infoApi = {
  List: '/infoDefine/list'
}

export function list (parameter) {
  return request({
    url: infoApi.List,
    method: 'get',
    params: parameter
  })
}
