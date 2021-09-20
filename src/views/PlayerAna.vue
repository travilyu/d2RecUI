<template lang="pug">
div
  div
    a-select(:options='userOptions' v-model:value='user' class='w-3/4 sm:w-1/4' @change='userChange' show-search optionFilterProp='label')
  div.m-8.grid.grid-cols-1(class='sm:grid-cols-2')
    a-statistic(title='胜场' :value='winCount' style="margin-right: 50px")
    a-statistic(title='败场' :value='loseCount' style="margin-right: 50px")
  div.m-2.grid.grid-cols-1.gap-4(class='sm:grid-cols-2')
    div.p-6.full
      div.text-sm 队友胜率
      rate-list(:data='mateData')
    div.p-6.full
      div.text-sm 对手胜率
      rate-list(:data='oppData' :isMate='false')
</template>
<script>
import {
  ref,
  nextTick,
} from 'vue'
import {
  getPlayerStatistic
} from 'src/js/api.js'
import RateList from './RateList.vue'
import {
  UserOptions as userOptions,
  UserMap,
  LoadUser,
} from 'src/js/preload.js'
import Cookies from 'js-cookie'
export default {
  components: {
    RateList
  },
  setup(props, context) {
    let user = ref('')
    let winCount = ref(0)
    let loseCount = ref(0)
    let mateData = ref([])
    let oppData = ref([])
    let userChange = () => {
      let sid = user.value
      Cookies.set('sid', sid)
      Promise.all([
        getPlayerStatistic(sid),
        LoadUser,
      ])
        .then(([data]) => {
          data = data.playerStatistic
          winCount.value = data.winRate.win
          loseCount.value = data.winRate.fail
          let userMap = UserMap.value
          nextTick()
            .then(() => {
              mateData.value = data.mates.map(d => {
                return {
                  ...d,
                  user: _.get(userMap, [d.user, 'nick_name'], d.user),
                }})
              oppData.value = data.opponents.map(d => {
                return {
                  fail: d.win,
                  win: d.fail,
                  user: _.get(userMap, [d.user, 'nick_name'], d.user),
              }})
            })
        })
    }
    return {
      userOptions,
      user,
      userChange,
      winCount,
      loseCount,
      mateData,
      oppData,
    }
  },
  mounted() {
    let lastSid = Cookies.get('sid')
    if (lastSid) {
      this.user = lastSid
      this.$nextTick()
        .then(() => {
          this.userChange()
        })
    }
  }
}
</script>
<style scoped>
.full {
  height: 100%;
}
</style>