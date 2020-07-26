import request from './request'

// 获取用户列表
export const reqUser = (params) => request.get('/users', { params})

// 修改用户状态
export const reqChangeState = (id, type) => request.put(`/users/${id}/state/${type}`)

// 添加用户
export const reqAddUser = (data)=>request.post('/users',data)

// 修改用户
export const reqUpdateUser = (data) => request.put(`/users/${data.id}`, data)
// 删除用户
export const reqDelUser = (id)=>request.delete(`/users/${id}`)
// 获取角色列表
export const reqRoleList = ()=> request.get('/roles')
// 分配用户角色
export const reqAssignRole = (id,data) => request.put(`/users/${id}/role`,data)
