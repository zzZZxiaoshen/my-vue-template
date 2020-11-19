import request from '@/utils/request'
let qs = require('qs');


//用户接口
export function listSys(listQuery) {
  return request({
    url: '/api/admin/list',
    method: 'post',
    data:qs.stringify(listQuery)
  })
}

export function createUser(user) {
  return request({
    url: '/api/admin/add',
    method: 'post',
    data:qs.stringify(user)
  })
}

export function updateUser(user) {
  return request({
    url: '/api/admin/update',
    method: 'post',
    data:qs.stringify(user)
  })
}

export function getUser(user) {
  return request({
    url: '/api/admin/info',
    method: 'post',
    data:qs.stringify(user)
  })
}

//角色接口
export function listRole(listQuery) {
  return request({
    url: '/api/role/list/page',
    method: 'post',
    data:qs.stringify(listQuery)
  })
}

//权限路由接口
export function listPermission() {
  return request({
    url: '/api/tree/empty/permission',
    method: 'post',
  })
}
