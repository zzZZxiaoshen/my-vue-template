import request from '@/utils/request'
let qs = require('qs');

export function login(email, password) {
  const data = {
    email,
    password
  }
  return request({
    url: '/api/admin/login',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function logout() {
  return request({
    url: '/api/admin/auth/logout',
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/api/user/roles',
    method: 'post',
  })
}

