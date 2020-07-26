import axios from 'axios'
import {message} from 'antd'
import storage from '@/utils/storage'
import memory from '@/utils/memory'
const request = axios.create({
  baseURL: '/api/private/v1/'
})
request.interceptors.request.use(config => {
  const user = storage.get('user')
  config.headers = {
    'Authorization': user.token
  }
  return config
})
request.interceptors.response.use(config => {
  // 请求失败
  const meta = config.data.meta
  if (meta && !/^20\d{1}$/.test(meta.status)) {
    message.error(meta.msg)
  }
  if (meta && meta.msg === '无效token') {
    message.info('会话过期,请重新登录')
    storage.remove('user')
    memory.user = {}
  }
  return config
})
export default request
