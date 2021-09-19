<template lang="pug">
div
  a-select(:options='userOptions' v-model:value='user' class='w-3/4 sm:w-1/4' @change='userChange' show-search optionFilterProp='label')
div.m-8.grid.grid-cols-1(class='sm:grid-cols-2')
  a-statistic(title='胜场' :value='winCount' style="margin-right: 50px")
  a-statistic(title='败场' :value='loseCount' style="margin-right: 50px")
div.m-2.grid.grid-cols-1.gap-4(class='sm:grid-cols-2')
  div.full
    div.text-sm 队友胜率
    div#rate1.full(:style='{height: computedHeight}')
  div.full
    div.text-sm 对手胜率
    div#rate2.full(:style='{height: computedHeight}')
</template>
<script>
import {
  ref,
  nextTick,
} from 'vue'
import {
  Select as ASelect,
  Statistic as AStatistic,
} from 'ant-design-vue'
import {
  getPlayerStatistic
} from 'src/js/api.js'
import renderRate from 'src/js/rateChart.js'
import {
  UserOptions as userOptions,
  UserMap,
  LoadUser,
} from 'src/js/preload.js'
import Cookies from 'js-cookie'
export default {
  components: {
    ASelect,
    AStatistic,
  },
  setup(props, context) {
    let user = ref('')
    let winCount = ref(0)
    let loseCount = ref(0)
    let computedHeight = ref('200px')
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
          computedHeight.value = Math.max(data.mates.length, data.opponents.length) * 25 + 60 + 'px'
          nextTick()
            .then(() => {
              renderRate('rate1', data.mates.map(d => {
                return {
                  ...d,
                  user: _.get(userMap, [d.user, 'nick_name'], d.user),
                }})),
              renderRate('rate2', data.opponents.map(d => {
                return {
                  ...d,
                  user: _.get(userMap, [d.user, 'nick_name'], d.user),
              }}))
            })
        })
    }
    return {
      userOptions,
      user,
      userChange,
      winCount,
      loseCount,
      computedHeight
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