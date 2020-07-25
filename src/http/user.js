import request from './request'

// 获取用户列表
export const reqUser = (params) => request.get('/users', { params})

// 修改用户状态
export const reqChangeState = (id, type) => request.put(`/users/${id}/state/${type}`)

// 添加用户
export const reqAddUser = (data)=>request.post('/users',data)
