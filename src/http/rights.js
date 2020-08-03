import request from './request'

// 获取权限列表
export const getRights = (type) => request.get(`rights/${type}`)
