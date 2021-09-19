let { getAllMatches } = require("./match.js")
let _ = require("lodash")

let merge = side => (rec, players) => {
  _.forEach(players, player => {
    if (!(player in rec)) {
      rec[player] = {
        [side]: 1
      }
    } else if (!(side in rec[player])) {
      rec[player][side] = 1
    } else {
      rec[player][side] += 1
    }
  })
}
let mergeWin = merge('win')
let mergeFail = merge('fail')

let sortToArr = rateMap => {
  let ans = _.orderBy(_.map(rateMap, (d, key) => {
    return {
      win: 0,
      fail: 0,
      ...d,
      user: key,
    }
  }), [d => d.win, d => -1 * d.fail])
  return ans
}

let countPlayer = (matches, sid) => {
  if (!sid) {
    throw Error('必须指定sid')
  }
  if (matches.length === 0) {
    return {}
  }
  let rec = {
    winRate: {win: 0, fail: 0},
    mates: {},
    opponents: {}
  }
  _.forEach(matches, match => {
    let playerSide
    let r = []
    let d = []
    let winSide = match.win
    let radiant = match.radiant
    let dire = match.dire
    _.forEach(radiant, rec => {
      if (rec.user === sid) {
        playerSide = '天辉'
      } else {
        r.push(rec.user)
      }
    })
    _.forEach(dire, rec => {
      if (rec.user === sid) {
        playerSide = '夜魇'
      } else {
        d.push(rec.user)
      }
    })
    let mate = playerSide === '天辉' ? r : d
    let opp = playerSide === '天辉' ? d : r
    if (winSide === playerSide) {
      mergeWin(rec.mates, mate)
      mergeFail(rec.opponents, opp)
      rec.winRate.win += 1
    } else {
      mergeFail(rec.mates, mate)
      mergeWin(rec.opponents, opp)
      rec.winRate.fail += 1
    }
  })
  rec.mates = sortToArr(rec.mates)
  rec.opponents = sortToArr(rec.opponents)
  return rec
}

let getPlayerStatistic = async playerSid => {

  let matches = await getAllMatches({
    player: playerSid,
  })


  return {
    // matches,
    playerStatistic: countPlayer(matches, playerSid)
  }
}

let countAllWinRate = async() => {
  let matches = await getAllMatches()
  let winRate = {}
  _.forEach(matches, match => {
    if (match.win === '天辉') {
      mergeWin(winRate, match.radiant.map(d => d.user))
      mergeFail(winRate, match.dire.map(d => d.user))
    } else {
      mergeWin(winRate, match.dire.map(d => d.user))
      mergeFail(winRate, match.radiant.map(d => d.user))
    }
  })
  return sortToArr(winRate)
}

module.exports = {
  getPlayerStatistic,
  countAllWinRate,
}
