import axios from 'axios'
import storage from '@/utils/storage'
const request = axios.create({
  baseURL:'/api/private/v1/'
})
request.interceptors.request.use(config => {
  const user = storage.get('user')
  config.headers = {
    'Authorization':user.token
  }
  return config
})
export default request
