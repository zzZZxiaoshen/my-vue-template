import request from '@/utils/request'
let qs = require('qs');

export function findActivityList(title, pageQuery) {
  const data = {
    title,
    pageQuery:{
      pageNo:1,
      pageSize:10
    }
  }
  return request({
    url: '/api/activity/list',
    method: 'post',
    data:qs.stringify(data)
  })
}
