import request from '@/util/request'

const infoApi = {
  ListWithSubInfo: '/infoDefine/listWithSubInfo',
  List: '/infoDefine/list'
}

export function listWithSubInfo (parameter) {
  return request({
    url: infoApi.ListWithSubInfo,
    method: 'get',
    params: parameter
  })
}

export function list (parameter, data) {
  return request({
    url: infoApi.List,
    method: 'post',
    data: data,
    params: parameter
  })
}
