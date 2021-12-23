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