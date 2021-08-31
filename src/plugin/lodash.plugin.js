import _ from 'lodash'

export default {
  install: (app, options) => {
    app._ = _
    window._ = _
  }
}