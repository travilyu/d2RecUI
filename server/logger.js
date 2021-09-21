let winston = require('winston')
winston.transports.DailyRotateFile = require('winston-daily-rotate-file')

let logger_opts = {
  filename: 'logs/d2rec-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  handleExcetion: true,
  maxFiles: '365d',
}

let {
  format
} = winston

let myFormat = format.printf(({level, message, label, timestamp}) => {
  if (typeof message !== 'string') {
    try {
      message = JSON.stringify(message)
    } catch (e) {
      message = '无效的log内容'
    }
  }
  return `${timestamp} [${level}] ${message}`
})

let logger = winston.createLogger({
  level: 'info',
  exitOnError: false,
  format: format.combine(format.timestamp(), myFormat),
  transports: [
    new(winston.transports.Console)(),
    new(winston.transports.DailyRotateFile)(logger_opts)
  ],
})
module.exports = logger