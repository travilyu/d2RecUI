let { Match } = require('./db.js')
let { Op } = require('sequelize')
let assert = require('assert')
let _ = require('lodash')

let gen5Filter = (addCond) => {
  let filters = []
  let keys = [1, 2, 3, 4, 5]
  keys.forEach(i => {
    addCond(i, filters)
  })
  return filters
}

let pack = a => _.isArray(a) ? a : [a]

let getAllMatches = async(options={}) => {
  let filters = []
  if (options.player) {
    let player = pack(options.player)
    filters.push({
      [Op.or]: gen5Filter((i, res) => {
        res.push({[`d_p_${i}`]: player})
        res.push({[`r_p_${i}`]: player})
      })
    })
  }
  if (options.rplayer) {
    let rplayer = pack(options.rplayer)
    filters.push({
      [Op.or]: gen5Filter((i, res) => {
        res.push({[`r_p_${i}`]: rplayer})
      })
    })
  }
  if (options.dplayer) {
    let dplayer = pack(options.dplayer)
    filters.push({
      [Op.or]: gen5Filter((i, res) => {
        res.push({[`d_p_${i}`]: dplayer})
      })
    })
  }
  if (options.hero) {
    let hero = pack(options.hero)
    filters.push({
      [Op.or]: gen5Filter((i, res) => {
        res.push({[`d_h_${i}`]: hero})
        res.push({[`r_h_${i}`]: hero})
      })
    })
  }
  if (options.multiPlayer) {
    assert.ok(_.isArray(options.multiPlayer), '多人查询必须是数组')
    options.multiPlayer.forEach(player => {
      filters.push({
        [Op.or]: gen5Filter((i, res) => {
          res.push({[`d_p_${i}`]: player})
          res.push({[`r_p_${i}`]: player})
        })
      })
    })
  }
  let matches = await Match.findAll({
    where: {
      [Op.and]: filters
    }
  })
  return matches
}

module.exports = {
  getAllMatches
}