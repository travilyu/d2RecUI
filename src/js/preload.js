import {
  ref
} from 'vue'
import {
  getUsers
} from './api.js'

export let Users = ref([])
export let UserMap = ref({})
getUsers()
  .then(data => {
    Users.value = data
    UserMap.value = _.keyBy(data, 'id')
  })