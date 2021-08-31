<template lang='pug'>
div.m-2
  div
    a-row(:gutter='16')
      a-col(:span='12')
        a-statistic.ml-10(title='共计场数' :value='count')
  div
    a-button(type='primary' @click='showModal') 添加
    a-modal(:visible='visible' title='添加' @ok='add' @cancel='visible=false' width='100%' wrapClassName='full-modal')
      a-form
        div.m-2.grid.grid-cols-1.gap-x-16(class='sm:grid-cols-2')
          div
            div
              a-radio(:checked='winner === 0' @click='winner=0') 获胜
            div
              span.text-4xl(@click='winner=0') 天辉
            hero-and-player(v-for='i in Array(5)')
          div
            div
              a-radio(:checked='winner === 1' @click='winner=1') 获胜
            div
              span.text-4xl(@click='winner=1') 夜魇
            hero-and-player(v-for='i in Array(5)')
    a-table(:dataSource='data' :columns='columns')
  div.m-2.bg-gray-50.grid.grid-cols-1.gap-4(class='sm:grid-cols-2')
    div
    div

</template>

<script>
import {
  ref,
} from 'vue'
import HeroAndPlayer from './HeroAndPlayer.vue'
export default {
  components: {
    HeroAndPlayer,
  },
  setup() {
    let count = ref(1)
    let visible =ref(false)
    let winner = ref(0)
    let data = ref([])
    let formData = ref([])
    data.value = [
      {key: 1, win: '天辉', time: '2021-10-10 20:20:20', 'radiant': '小孩吃糖 凉凉 明月 懒猫 二狗', 'dire': 'rose 汤圆 zeus 稳重 大闸蟹'}
    ]
    count.value = data.value.length

    return {
      count,
      visible,
      winner,
      data,
      formData,
      showModal: () => {
        visible.value = true
      },
      add: (e) => {
        visible.value = false
      },
      columns: [
        {title: '时间', dataIndex: 'time', key: 'time'},
        {title: '获胜', dataIndex: 'win', key: 'win'},
        {title: '天辉', dataIndex: 'radiant', key: 'radiant'},
        {title: '夜魇', dataIndex: 'dire', key: 'dire'},
      ]
    }
  }
}
</script>
<style lang='less'>
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    overflow: scroll;
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>