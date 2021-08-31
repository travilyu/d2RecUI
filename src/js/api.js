import API from './api.js'
import * as app from 'js/app.js'
import Cookies from 'js-cookie'

let api = API.api
api.interceptors.request.use(function(config) {
  let token = Cookies.get('token')
  if (token) {
    config.headers.token = token
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

import Vue from 'vue'
api.interceptors.response.use(function(data) {
  if (data.data && data.data.OPT_STATUS && data.data.OPT_STATUS === 'SUCCESS') {
    return data.data.DATA
  } else {
    if (data.status !== 401) {
      if ('MSG' in data.data) {
        Vue.prototype.$message.error(data.data.MSG)
      }
    } else if (window.location.pathname !== '/')  {
      window.location.href = '/'
    }
    return Promise.reject(data)
  }
}, function(error) {
  let msg = _.get(error, 'response.data.MSG', '请求错误')
  if (app.loaded || error.response.status !== 401 ) {
    Vue.prototype.$message.error(msg)
  }
  return Promise.reject(error)
})
