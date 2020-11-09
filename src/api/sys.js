import request from '@/utils/request'
let qs = require('qs');

export function listSys(listQuery) {
  return request({
    url: '/api/admin/list',
    method: 'post',
    data:qs.stringify(listQuery)
  })
}
