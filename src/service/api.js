import request from './request';
import * as OPT from './options';

export function getNews(tag) {
    return request({
        url: OPT.GETNEWS,
        params: {
            tag
        }
    })
}

export async function getNewsDetails(id) {
    return request({
        url: OPT.GETNEWSDETAILS,
        params: {
            id
        }
    })
}

export async function getNewsComments(params) {
    return request({
        url: OPT.GETNEWSCOMMENTS,
        params
    })
}

// 获取验证码
export async function sendSMS(phoneNumber) {
    return request({
        url: OPT.SENDSMS,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        data: {
            phoneNumber
        }
    })
}

export async function getComments(params) {
    return request({
        url: OPT.GETCOMMENTS,
        params
    })
}

export async function comment(data) {
    return request({
        url: OPT.COMMENT,
        method: 'POST',
        data,
        headers: {
            'content-type': 'application/json'
        }
    })
}

export async function favComment(data) {
    return request({
        url: OPT.FAVCOMMENT,
        method: 'POST',
        data,
        headers: {
            'content-type': 'application/json'
        }
    })
}

// 注册帐号

export async function register(data) {
    return request({
        url: OPT.REGISTER,
        method: 'POST',
        data,
        headers: {
            'content-type': 'application/json'
        }
    })
}

// 密码登录
export async function loginByPassword(data) {
    return request({
        url: OPT.LOGINBYPASSWORD,
        method: 'POST',
        data,
        headers: {
            'content-type': 'application/json'
        }
    })
}

// 验证码登录
export async function loginByVercode(data) {
    return request({
        url: OPT.LOGINBYVERCODE,
        method: 'POST',
        data,
        headers: {
            'content-type': 'application/json'
        }
    })
}

// 获取个人信息
export async function getUserInfo(params) {
    return request({
        url: OPT.GETUSERINFO,
        params
    })
}