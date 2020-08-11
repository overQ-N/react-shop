import request from './request'

// 获取权限列表
export const getRights = (type) => request.get(`rights/${type}`)

// 获取角色列表
export const getRoles = ()=>request.get('roles')

// 删除角色指定权限
export const delRight = (roleId, rightId) => request.delete(`roles/${roleId}/rights/${rightId}`)

// 角色授权
export const assignRights = (roleId, rights) => request.post(`roles/${roleId}/rights`, {rids:rights})

// 编辑角色
export const editRole = (id, data) => request.put(`roles/${id}`, data)

// 删除角色
export const delRole = id => request.delete(`roles/${id}`)

// 添加角色
export const addRole = data => request.post('roles',data)
