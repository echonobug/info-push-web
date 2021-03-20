import request from '@/util/request'

const infoApi = {
  ListWithSubInfo: '/infoDefine/listWithSubInfo',
  List: '/infoDefine/list',
  Save: '/infoDefine/save',
  Del: '/infoDefine/delete'
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

export function save (data) {
  return request({
    url: infoApi.Save,
    method: 'post',
    data: data
  })
}

export function del (id) {
  return request({
    url: infoApi.Del,
    method: 'post',
    params: id
  })
}
