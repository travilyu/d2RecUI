<template lang="pug">
div.full.m2
  h3.text-3xl 总胜率图
  div#rate.full(:style='{height: computedHeight}')
</template>
<script>
  import {
    getAllRate
  } from 'src/js/api.js'
  import renderRate from 'src/js/rateChart.js'
  import {
    UserMap,
    LoadUser,
  } from 'src/js/preload.js'
  export default {
    data() {
      return {
        computedHeight: '200px'
      }
    },
    mounted() {
      Promise.all([
        getAllRate(),
        LoadUser,
      ])
        .then(([data]) => {
          let userMap = UserMap.value
          this.computedHeight = data.length * 30 + 60 + 'px'
          this.$nextTick()
            .then(() => {
              renderRate('rate', data.map(d => {
                return {
                  ...d,
                  user: _.get(userMap, [d.user, 'nick_name'], d.user),
                }
              }))
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