import request from './request';
import * as OPT from './options';

export function hello() {
  return request({
    url: OPT.HELLO
  })
}