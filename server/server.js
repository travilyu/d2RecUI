let constr = require('./const.js')
const _ = require('lodash')
let restify = require('restify')
let logger = require('./logger.js')
let {
  fail
} = require('./util.js')

/**server setting**/
let server = restify.createServer({
  name: 'server',
  formatters: {
    'application/json': function(req, res, body) {
      if (body instanceof Error) {
        return body.message
      } else if (Buffer.isBuffer(body)) {
        return body.toString('base64')
      } else if (body instanceof Object) {
        return JSON.stringify(body)
      } else {
        return body
      }
    }
  }
})

server.listen(constr.API_SERVER_PORT, '0.0.0.0', function(err) {
  if (err) {
    return logger.error(err)
  }
  logger.info(`Server Start on ${constr.API_SERVER_PORT}`)
})

/**event handler**/
server.on('NotFound', function(req, res, error, cb) {
  logger.info(`req url ${req.url}`)
  res.send(404, JSON.stringify({
    OPT_STATUS: 'API_NOT_FOUND'
  }))
  res.end()
})

server.on('MethodNotAllowed', function(req, res, error, cb) {
  res.send(405, JSON.stringify({
    OPT_STATUS: 'METHOD_NOT_ALLOWED'
  }))
  res.end()
})

server.use(restify.plugins.queryParser({
  mapParams: true
}))
server.use(restify.plugins.bodyParser({
  mapParams: false
}))
server.pre(restify.pre.sanitizePath())

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header('Access-Control-Allow-Methods', '*')
  return next()
})

/***token解析***/
server.use(function(req, res, next) {
  return next()
})

let genResReturn = (res, next) => (...args) => {
  res.header('content-type', 'application/json')
  if (args.length === 1) {
    if (args[0] instanceof Error) {
      logger.error(args[0].stack)
      res.send(500, fail(args[0].message))
    } else if (_.isArray(args[0])) {
      return genResReturn(res, next)(...args[0])
    } else {
      res.send(...args)
    }
  } else {
    res.send(...args)
  }
  res.end()
  return next()
}

module.exports = {
  server,
  genResReturn
}
