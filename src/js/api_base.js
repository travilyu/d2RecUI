import axios from 'axios'
import Qs from 'qs'
import objectHash from 'object-hash'
let api = axios.create({
  baseURL: '/',
  paramsSerializer: params => Qs.stringify(params, {
    indices: false
  })
})

//standard get api function
let reqPool = {}
// 注意复用同一个结果  不要修改既有数据
let call = (method, packParams = a => a) => (url, parse = a => a) => (params={}) => {
  let hashId = objectHash.sha1({
    url,
    params
  })
  if (!reqPool[hashId]) {
    reqPool[hashId] = method(url, packParams({
        ...params
      }))
      .finally(() => {
        reqPool[hashId] = null
      })
  }
  return new Promise((resolve, reject) => {
      reqPool[hashId].then(resolve)
        .catch(reject)
    })
    .then(parse)
}

let get = call(api.get, a => {
  return {
    params: a
  }
})
let post = call(api.post)
let patch = call(api.patch)
let del = call(api.delete)

export default {
  api,
  get,
  post,
  patch,
  del,
}