import { createApp } from 'vue'
import App from './Index.vue'
import antd from 'ant-design-vue'
import './base.js'

import lodashPlugin from './plugin/lodash.plugin.js'
import router from './router.js'

let app = createApp(App)
app.use(antd)
app.use(lodashPlugin)
app.use(router)
app.mount('#app')
