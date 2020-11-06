import request from '@/utils/request'
let qs = require('qs');

export function listActive(listQuery) {
  return request({
    url: '/api/activity/list',
    method: 'post',
    data:qs.stringify(listQuery)
  })
}
export function createActive(active) {
  return request({
    url: '/api/activity/add',
    method: 'post',
    data:qs.stringify(active)
  })
}

export function updateActive(active) {
  return request({
    url: '/api/activity/update',
    method: 'post',
    data:qs.stringify(active)
  })
}

export function getActiveData(id) {
  return request({
    url: '/api/activity/detail',
    method: 'post',
    data:qs.stringify(id)
  })
}
