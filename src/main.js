import { createApp } from 'vue'
import App from './views/App.vue'
import './base.js'

import lodashPlugin from './plugin/lodash.plugin.js'

let app = createApp(App)
app.use(lodashPlugin)
app.mount('#app')
