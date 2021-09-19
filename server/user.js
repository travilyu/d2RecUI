// const logger = require('./logger.js')
const assert = require('assert')
let { User } = require('./db.js')

let getAllUsers = async(filter = {}) => {
  let users = await User.findAll({
    where: filter
  })
  return users
}

let createUser = async(params) => {
  let user = await User.findOne({
    where: {name: params.name}
  })
  if (user) {
    throw Error('用户名已被占用')
  }
  return User.create(params)
}

let modifyUser = async(params) => {
  delete params.createdAt
  delete params.updatedAt
  if (params.name) {
    let check = await User.findOne({
      where: {
        name: params.name
      }
    })
    if (check !== 0 && check[0].name !== params.name) {
      throw Error('用户名已被占用')
    }
  }
  return User.update(params, {
    where: {
      id: params.id
    }
  })
}

let delUser = async(params) => {
  assert.ok('id' in params, '参数错误')
  return User.destroy({
    where: {
      id: params.id
    }
  })
}

module.exports = {
  getAllUsers,
  createUser,
  modifyUser,
  delUser,
}