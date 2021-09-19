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

s.sync()

if (require.main === module) {
  testConnection()
}
