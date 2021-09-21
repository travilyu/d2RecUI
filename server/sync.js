// 检查match_logs数据并插入matches
const { MatchLog, Player, Match, Race } = require("./db.js")

let hasPlayer = player => {
  return Player.findOne({
    where: {
      steam_id: player.steam_id
    }
  })
}

let sync = async () => {
  let rs = await Race.findAll()
  let playerToSync = []
  let matchToSync = []
  await Promise.all(
    rs.map(async r => {
      let check = await Match.findOne({
        where: {
          hash: r.match_id
        }
      })
      if (check) {
        return
      }
      let rDetails = await MatchLog.findAll({
        where: {
          match_id: r.match_id
        }
      })

      let match = {
	  	time: r.dt,
        win: r.won_team_id === r.radiant_team_id ? "天辉" : "夜魇",
        hash: r.match_id,
        type: 3,
      }
      // 同步用户
      await Promise.all(
        rDetails.map(async rd => {
          let { player_nick_name, player_name, steam_id } = rd
          let player = {
            steam_id,
            nick_name: player_nick_name || player_name
          }
          let check = await hasPlayer(player)
          if (!check) {
            playerToSync.push(player)
          }
          // 补充下match
          if (rd.team_id === r.radiant_team_id) {
            match[`r_p_${rd.team_solt + 1}`] = rd.steam_id
            match[`r_h_${rd.team_solt + 1}`] = rd.hero_name
          } else {
            match[`d_p_${rd.team_solt + 1}`] = rd.steam_id
            match[`d_h_${rd.team_solt + 1}`] = rd.hero_name
          }
        })
      )
      matchToSync.push(match)
    })
  )
  // console.log(playerToSync)
  // console.log(matchToSync)
  Player.bulkCreate(playerToSync)
  Match.bulkCreate(matchToSync)
}

const _ = require('lodash')
let removeNonIH = async () => {
  // 种子用户，比赛场数超过若干场的
  let rDetails = await MatchLog.findAll()
  let seedPlayerSet = new Set()
  let playerMap = {}
  _.forEach(rDetails, rd => {
    if (rd.steam_id in playerMap) {
      playerMap[rd.steam_id] += 1
    } else {
      playerMap[rd.steam_id] = 1
    }
    if (playerMap[rd.steam_id] > 3) {
      seedPlayerSet.add(rd.steam_id)
    }
  })
  let rdByMatch = _.groupBy(rDetails, 'match_id')
  let nonIHMatchIds = []
  let validPlayerSet = new Set()
  // 双方都有种子用户的为ih比赛
  // 只保留参加ih的player
  _.forEach(rdByMatch, (rds, matchId) => {
    let check = _.uniqBy(rds.filter(rd => seedPlayerSet.has(rd.steam_id)), 'team_id').length > 1
    if (!check) {
      nonIHMatchIds.push(matchId)
    } else {
      _.forEach(rds, rd => {
        validPlayerSet.add(rd.steam_id)
      })
    }
  })
  // console.log(nonIHMatchIds)
  Match.destroy({
    where: { hash: nonIHMatchIds }
  })

  let invalidPlayers = []
  _.forEach(playerMap, (foo, pid) => {
    if (!validPlayerSet.has(pid)) {
      invalidPlayers.push(pid)
    }
  })
  // console.log(invalidPlayers)
  Player.destroy({
    where: { steam_id: invalidPlayers }
  })
}

// sync()
removeNonIH()

