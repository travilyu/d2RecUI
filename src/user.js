import { createApp } from 'vue'
import App from './views/User.vue'
import './base.js'
import Antd from 'ant-design-vue';

import lodashPlugin from './plugin/lodash.plugin.js'

let app = createApp(App)
app.use(Antd)
app.use(lodashPlugin)
app.mount('#app')