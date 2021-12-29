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
            config.headers['Authorization'] = localStorage.getItem('_TOKEN')
            return config
        },
        error => {
            return Promise.reject(error);
        }
    )

    // http response 拦截器
    instance.interceptors.response.use(
        response => {
            Utils.update('loading', false)
            //拦截响应，做统一处理
            if (response.data.code === 401) {
                Utils.update('token', '')
                localStorage.removeItem('_TOKEN')
            }
            return response.data
        },
        //接口错误状态处理，也就是说无响应时的处理
        error => {
            Utils.update('loading', false)
            return Promise.reject(error) // 返回接口返回的错误信息
        })

    return instance(config)
}