import request from '@/utils/request'
let qs = require('qs');

export function listActive(listQuery) {
  return request({
    url: '/api/activity/list',
    method: 'post',
    data:qs.stringify(listQuery)
  })
}
