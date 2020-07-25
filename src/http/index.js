import request from './request'

// 登录
export const reqLogin = (data) => request({
  url: '/login',
  method: 'post',
  data
})

