// const logger = require('./logger.js')
const assert = require('assert')
let { Player } = require('./db.js')

let getAllPlayers = async(filter = {}) => {
  let users = await Player.findAll({
    where: filter
  })
  return users
}

let modifyPlayer = async(params) => {
  delete params.createdAt
  delete params.updatedAt
  delete params.steam_id
  if (params.nick_name) {
    let check = await Player.findOne({
      where: {
        nick_name: params.nick_name
      }
    })
    if (check && check[0].nick_name !== params.nick_name) {
      throw Error('用户名已被占用')
    }
  }
  return Player.update(params, {
    where: {
      id: params.id
    }
  })
}

let delPlayer = async(params) => {
  assert.ok('id' in params, '参数错误')
  return Player.destroy({
    where: {
      id: params.id
    }
  })
}

module.exports = {
  getAllPlayers,
  modifyPlayer,
  delPlayer,
}