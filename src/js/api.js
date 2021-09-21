import API from './api_base.js'
import Cookies from 'js-cookie'
import { message } from 'ant-design-vue'
import Qs from 'qs'

let api = API.api
api.interceptors.request.use(function(config) {
  let token = Cookies.get('token')
  if (token) {
    config.headers.token = token
  }
  // form-urlencode的header
  if (config.method.toLowerCase() === 'post' || config.method.toLowerCase() === 'patch') {
    config.data = Qs.stringify(config.data)
    config.headers['content-type'] = 'application/x-www-form-urlencoded'
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

api.interceptors.response.use(function(data) {
  if (data.data && data.data.OPT_STATUS && data.data.OPT_STATUS === 'SUCCESS') {
    return data.data.DATA
  } else {
    let msg = _.get(data.data, 'MSG', '请求错误')
    message.error(msg)
    return Promise.reject(data)
  }
}, function(error) {
  let msg = _.get(error, 'response.data.MSG', '请求错误')
  message.error(msg)
  return Promise.reject(error)
})

let base = process.env.NODE_ENV === 'development' ? 'http://ame:10002' : ''
export let getUsers = API.get(base + '/api/users')
export let createUser = API.post(base + '/api/users')
export let modifyUser = API.patch(base + '/api/users')
export let delUser = id => API.del(base + `/api/users/${id}`)()

export let getPlayers = API.get(base + '/api/players')
export let modifyPlayer = API.patch(base + '/api/players')
export let delPlayer = id => API.del(base + `/api/players/${id}`)()

export let getMatches = API.get(base + '/api/matches')
export let createMatch = API.post(base + '/api/matches')
export let modifyMatch = API.patch(base + '/api/matches')
export let delMatch = id => API.del(base + `/api/matches/${id}`)()

export let getAllRate = API.get(base + '/api/ana/all')
export let getPlayerStatistic = id => API.get(base + `/api/ana/${id}`)()