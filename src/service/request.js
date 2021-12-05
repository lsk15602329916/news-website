import axios from 'axios'

const BASE_URL = ''
const TIME_OUT = 60000
export default function request(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
  })

  instance.interceptors.request.use(
    config => {
      config.headers['Authorization'] = sessionStorage.getItem('Authorization')
      return config
    },
    error => {
      return Promise.reject(error);
    }
  )

  // http response 拦截器
  instance.interceptors.response.use(
    response => {
      //拦截响应，做统一处理
      if(response.data.code === 401) {
        sessionStorage.removeItem('Authorization')
        return response.data
      } else {
        if (response.data.success) {
          return response.data
        } else {
          throw response.data
        }
      }
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
      return Promise.reject(error) // 返回接口返回的错误信息
    })

  return instance(config)
}