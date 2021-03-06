import request from './request'
// 商品列表
export const reqGoods = (params) => request.get('/goods', { params })
// 根据id查找商品
export const reqGoodsById = (id)=>request.get(`/goods/${id}`)
// 删除商品
export const removeGoodsById = (id)=>request.delete(`/goods/${id}`)
// 获取分类列表
export const getCategories = (params) => request.get('/categories',{params})
// 添加商品
export const addGood = (data)=>request.post('/goods',data)

// 添加分类
export const addCategory = (data) => request.post('/categories',data)

// 根据id查找分类
export const findCateById =(id)=>request.get(`/categories/${id}`)

// 删除分类
export const removeCateById = (id) => request.delete(`/categories/${id}`)
