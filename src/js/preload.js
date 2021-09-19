import {
  ref
} from 'vue'
import {
  getPlayers
} from './api.js'

export let Users = ref([])
export let UserMap = ref({})
export let UserOptions = ref([])
export let LoadUser = getPlayers()
  .then(data => {
    Users.value = data
    UserMap.value = _.keyBy(data, 'steam_id')
    UserOptions.value = data.map(d => {
      return {
        label: d.nick_name,
        value: d.steam_id,
      }
    })
  })