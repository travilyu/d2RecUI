let logger = require('./logger.js')
let {
  server,
  genResReturn
} = require('./server.js')
let {
  success,
  fail
} = require('./util.js')

let Player = require('./player.js')
server.get('/players', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  Player.getAllPlayers()
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

server.patch('/players', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  Player.modifyPlayer(req.body)
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

//User
let User = require('./user.js')
server.get('/users', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  User.getAllUsers()
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

server.patch('/users', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  User.modifyUser(req.body)
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

server.post('/users', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  User.createUser(req.body)
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

server.del('/users/:id', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  User.delUser(req.params)
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

//Match
let Match = require('./match.js')
server.get('/matches', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  let params = req.params
  logger.debug(params)
  Match.getAllMatches(params || {})
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

server.patch('/matches', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  Match.modifyMatch(req.body)
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

server.post('/matches', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  Match.createMatch(req.body)
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

server.del('/matches/:id', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  Match.delMatch(req.params.id)
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      resReturn(fail(e.message))
    })
})

const Ana = require('./ana.js')
server.get('/ana/:sid', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  Ana.getPlayerStatistic(req.params.sid)
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      logger.error(e.stack)
      resReturn(fail(e.message))
    })
})

server.get('/ana/all', function(req, res, next) {
  let resReturn = genResReturn(res, next)
  Ana.countAllWinRate()
    .then(data => {
      resReturn(success(data))
    }).catch(e => {
      logger.error(e.stack)
      resReturn(fail(e.message))
    })
})

process.on('SIGINT', function() {
  logger.error('Got STDINT, exit')
  process.exit()
})

process.on('exit', function(code) {
  logger.error('app exit with code', code)
})

process.on('uncaughtException', function(err) {
  logger.error(err.stack)
})