<template lang="pug">
div.full.m2
  h3.text-3xl 总胜率榜
  rate-list(:data='data')
</template>
<script>
  import {
    getAllRate
  } from 'src/js/api.js'
  import RateList from './RateList.vue'
  import {
    UserMap,
    LoadUser,
  } from 'src/js/preload.js'
  export default {
    components: {
      RateList
    },
    data() {
      return {
        data: []
      }
    },
    mounted() {
      Promise.all([
        getAllRate(),
        LoadUser,
      ])
        .then(([data]) => {
          let userMap = UserMap.value
          this.data = data.map(d => {
            return {
              ...d,
              user: _.get(userMap, [d.user, 'nick_name'], d.user),
            }
          })
        })
    }
  }
</script>
<style scoped>
.full {
  height: 100%;
}
</style>