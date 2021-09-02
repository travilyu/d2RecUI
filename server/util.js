const logger = require('./logger.js')
const _ = require('lodash')
module.exports.success = data => {
  return JSON.stringify(data ? {OPT_STATUS: 'SUCCESS', DATA: data} : {OPT_STATUS: 'SUCCESS'})
}

module.exports.fail = msg => {
  if (_.isError(msg)) {
    logger.error(msg.stack)
    msg = msg.message
  }
  return JSON.stringify(msg ? {OPT_STATUS: 'FAIL', MSG: msg} : {OPT_STATUS: 'FAIL'})
}