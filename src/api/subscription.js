import request from '@/util/request'

const subscriptionApi = {
  Subscribe: '/subscription/subscribe',
  List: '/subscription/list',
  Cancel: '/subscription/cancel',
  Update: '/subscription/update'
}

export function subscribe (parameter) {
  return request({
    url: subscriptionApi.Subscribe,
    method: 'post',
    data: parameter
  })
}

export function list (parameter) {
  return request({
    url: subscriptionApi.List,
    method: 'get',
    params: parameter
  })
}

export function cancel (parameter) {
  return request({
    url: subscriptionApi.Cancel,
    method: 'get',
    params: parameter
  })
}

export function update (parameter) {
  return request({
    url: subscriptionApi.Update,
    method: 'post',
    data: parameter
  })
}
