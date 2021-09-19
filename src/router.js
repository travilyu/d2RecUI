import { createRouter, createWebHashHistory } from 'vue-router'
import App from 'src/views/App'
import Ana from 'src/views/Ana'
import PlayerAna from 'src/views/PlayerAna'
import User from 'src/views/User'
import Match from 'src/views/Match'

const routes = [
  { path: '/', component: App },
  { path: '/user', component: User },
  { path: '/match', component: Match },
  { path: '/ana', component: Ana },
  { path: '/playerAna', component: PlayerAna },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})