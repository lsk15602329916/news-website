import axios from 'axios'
import Utils from '@/utils';

const BASE_URL = 'https://qcx6h7.api.cloudendpoint.cn'
const TIME_OUT = 60000
export default function request(config) {
    Utils.update('loading', true)
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: TIME_OUT
    })

    instance.interceptors.request.use(
        config => {
            config.headers['Authorization'] = sessionStorage.getItem('_TOKEN')
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
            if (response.data.code === 401) {
                sessionStorage.removeItem('_TOKEN')
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