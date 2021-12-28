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
<<<<<<< HEAD
    return request({
        url: OPT.GETNEWSCOMMENTS,
        params
    })
}


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
=======
  return request({
    url: OPT.GETNEWSCOMMENTS,
    params
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
>>>>>>> ed834bbc4df163890e6462791058ac0189f4586a
}