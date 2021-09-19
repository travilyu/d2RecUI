// import { createApp } from 'vue'
let { createApp } = require('vue')
import App from './Index.vue'
import './base.js'

import lodashPlugin from './plugin/lodash.plugin.js'
import router from './router.js'

let app = createApp(App)
app.use(lodashPlugin)
app.use(router)
app.mount('#app')
