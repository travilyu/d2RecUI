const logger = require('./logger.js')
const Sequelize = require("sequelize")
const S = Sequelize
const sequelize = new S("mysql://root:d2huiyishi@localhost/d2rec", {
  logging: logger.debug.bind(logger),
})
const s = sequelize
let testConnection = async () => {
  try {
    await s.authenticate()
    console.log("Connection has been established successfully.")
  } catch (e) {
    console.error("Unable to connect to the database:", e)
  }
}

module.exports.User = s.define("user", {
  name: { type: S.STRING },
  alias: { type: S.TEXT }
})

module.exports.Player = s.define("player", {
  steam_id: { type: S.STRING },
  avatar: { type: S.STRING },
  nick_name: { type: S.STRING },
}, {
  timestamps: false,
})

module.exports.Match = s.define("match", {
  time: { type: S.DATE },
  win: { type: S.STRING },
  r_h_1: { type: S.STRING },
  r_h_2: { type: S.STRING },
  r_h_3: { type: S.STRING },
  r_h_4: { type: S.STRING },
  r_h_5: { type: S.STRING },
  d_h_1: { type: S.STRING },
  d_h_2: { type: S.STRING },
  d_h_3: { type: S.STRING },
  d_h_4: { type: S.STRING },
  d_h_5: { type: S.STRING },
  r_p_1: { type: S.INTEGER },
  r_p_2: { type: S.INTEGER },
  r_p_3: { type: S.INTEGER },
  r_p_4: { type: S.INTEGER },
  r_p_5: { type: S.INTEGER },
  d_p_1: { type: S.INTEGER },
  d_p_2: { type: S.INTEGER },
  d_p_3: { type: S.INTEGER },
  d_p_4: { type: S.INTEGER },
  d_p_5: { type: S.INTEGER },
  hash: {type: S.STRING},
  type: {type: S.STRING},
})

let MatchLog = s.define('match_log', {
  dt: {type: S.DATE},
  match_id: {type: S.INTEGER},
  steam_id: {type: S.STRING},
  player_name: {type: S.STRING},
  player_nick_name: {type: S.STRING},
  team_id: {type: S.INTEGER},
  team_solt: {type: S.INTEGER},
  hero_name: {type: S.INTEGER},
}, {
  timestamps: false,
})
MatchLog.removeAttribute('id')
module.exports.MatchLog = MatchLog

module.exports.Race = s.define('race', {
  match_id: {
    type: S.INTEGER,
    primaryKey: true,
  },
  radiant_team_id: {type: S.INTEGER},
  dire_team_id: {type: S.INTEGER},
  won_team_id: {type: S.INTEGER},
}, {
  timestamps: false,
  freezeTableName: true,
})

s.sync()

if (require.main === module) {
  testConnection()
}
