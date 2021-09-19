let { Match } = require("./db.js")
let { Op } = require("sequelize")
let assert = require("assert")
let _ = require("lodash")

let gen5Filter = addCond => {
  let filters = []
  let keys = [1, 2, 3, 4, 5]
  keys.forEach(i => {
    addCond(i, filters)
  })
  return filters
}

let pack = a => (_.isArray(a) ? a : [a])

let parseInputMatch = match => {
  assert.ok("radiant" in match, "比赛格式有问题")
  let res = {
    win: match.win,
  }
  match.radiant.forEach((r, i) => {
    res[`r_p_${i + 1}`] = r.user
    res[`r_h_${i + 1}`] = r.hero
  })
  match.dire.forEach((r, i) => {
    res[`d_p_${i + 1}`] = r.user
    res[`d_h_${i + 1}`] = r.hero
  })
  if ('id' in match) {
    res.id = match.id
  }
  return res
}

let genOutputMatch = match => {
  assert.ok("r_p_1" in match, "比赛格式有问题")
  let res = {
    win: match.win,
    radiant: [],
    dire: [],
    id: match.id,
    createdAt: match.createdAt,
    updatedAt: match.updatedAt,
    time: match.time,
  }
  ;[1, 2, 3, 4, 5].forEach(i => {
    res.radiant[i - 1] = {
      user: match[`r_p_${i}`],
      hero: match[`r_h_${i}`]
    }
    res.dire[i - 1] = {
      user: match[`d_p_${i}`],
      hero: match[`d_h_${i}`]
    }
  })
  return res
}

let genPlayerCondBy = (side, winSide) => (player, i) => {
  let prefix = side === '天辉' ? 'r_p_' : 'd_p_'
  let cond = {
    [`${prefix}${i}`]: player
  }
  if (winSide) {
    cond.win = winSide
  }
  return cond
}

let otherSide = side => side === '天辉' ? '夜魇' : '天辉'

// 前端负责将用户name或别名转换为对应的id
let getAllMatches = async (options = {}) => {
  let filters = []
  let winBy = (side) => {
    if (_.isUndefined(options.win)) {
      return null
    }
    return options.win ? side : otherSide(side)
  }
  let rPlayerCond = genPlayerCondBy('天辉', winBy('天辉'))
  let dPlayerCond = genPlayerCondBy('夜魇', winBy('夜魇'))
  if (options.player) {
    let player = pack(options.player)
    filters.push({
      [Op.or]: gen5Filter((i, res) => {
        res.push(rPlayerCond(player, i))
        res.push(dPlayerCond(player, i))
      })
    })
  }
  if (options.rplayer) {
    let rplayer = pack(options.rplayer)
    filters.push({
      [Op.or]: gen5Filter((i, res) => {
        res.push(rPlayerCond(rplayer, i))
      })
    })
  }
  if (options.dplayer) {
    let dplayer = pack(options.dplayer)
    filters.push({
      [Op.or]: gen5Filter((i, res) => {
        res.push(dPlayerCond(dplayer, i))
      })
    })
  }
  if (options.hero) {
    let hero = pack(options.hero)
    filters.push({
      [Op.or]: gen5Filter((i, res) => {
        res.push({ [`d_h_${i}`]: hero })
        res.push({ [`r_h_${i}`]: hero })
      })
    })
  }
  if (options.multiPlayer) {
    assert.ok(_.isArray(options.multiPlayer), "多人查询必须是数组")
    options.multiPlayer.forEach(player => {
      filters.push({
        [Op.or]: gen5Filter((i, res) => {
          res.push(rPlayerCond(player, i))
          res.push(dPlayerCond(player, i))
        })
      })
    })
  }
  let matches = await Match.findAll({
    where: {
      [Op.and]: filters
    },
    order: [['time', 'desc']]
  })
  return matches.map(genOutputMatch)
}

const genHash = require("object-hash")

let createMatch = async match => {
  if ("hash" in match) {
    delete match["hash"]
  }
  match = parseInputMatch(match)
  let hash = genHash(match)
  let check = await Match.findOne({
    where: {
      hash
    }
  })
  if (check) {
    throw Error("该比赛已被收录")
  }
  match["hash"] = hash
  return Match.create(match)
}

let modifyMatch = async match => {
  assert.ok("id" in match, "未指定比赛id")
  match = parseInputMatch(match)
  let rec = await Match.findOne({
    where: { id: match.id }
  })
  if (!rec) {
    throw Error("无效的id")
  }
  match = {
    ...rec,
    ...match
  }
  delete match["hash"]
  let hash = genHash(match)
  let check = await Match.findOne({
    where: {
      hash
    }
  })
  if (check) {
    throw Error("该比赛已被收录")
  }
  match["hash"] = hash
  return Match.update(match, {
    where: {
      id: match.id
    }
  })
}

let delMatch = async id => {
  return Match.destroy({
    where: {
      id
    }
  })
}

module.exports = {
  getAllMatches,
  createMatch,
  modifyMatch,
  delMatch
}
