<template lang="pug">
div.m-2
  div
    a-row(:gutter='16')
      a-col(:span='12')
        a-statistic.ml-10(title='共计场数' :value='count')
  div
    a-button(type='primary' @click='showModal') 添加
  div
    a-modal(:visible='visible' :title='modalTitle' @ok='submit' @cancel='visible=false' width='100%' wrapClassName='full-modal')
      a-form(:model='formData' ref='formRef')
        div.m-2.grid.grid-cols-1.gap-x-16(class='sm:grid-cols-2')
          div
            div
              a-radio(:checked='formData.win === "radiant"' @click='formData.win="radiant"') 获胜
            div
              span.text-4xl(@click='formData.win="radiant"') 天辉
            template(v-for='(player, i) in formData.radiant' :key='Math.random()')
              hero-and-player( v-model:user='player.user' v-model:hero='player.hero' side='radiant' :index='i' :v='vs[i]')
          div
            div
              a-radio(:checked='formData.win === "dire"' @click='formData.win="dire"') 获胜
            div
              span.text-4xl(@click='formData.win="dire"') 夜魇
            template(v-for='(player, i) in formData.dire' :key='Math.random()')
              hero-and-player( v-model:user='player.user' v-model:hero='player.hero' side='dire' :index='i' :v='vs[i+5]')
    a-table(:dataSource='tableData' rowKey='id' :columns='columns' :loading='loading')
      template(#time='{text}')
        span {{text}}
      template(#win='{text}')
        span {{text === 'radiant' ? '天辉' : '夜魇'}}
      template(#radiant='{text: rs}')
        div(v-for='r in rs' style='margin:2px 0;')
          img(width='48' height='27' :src='heroMap[r.hero].img' style='display:inline-block')
          span(style='display: inline-block; margin-left: 5px') {{ userMap[r.user].name }}
      template(#dire='{text: rs}')
        div(v-for='r in rs' style='margin:2px 0;')
          img(width='48' height='27' :src='heroMap[r.hero].img' style='display:inline-block')
          span(style='display: inline-block; margin-left: 5px') {{ userMap[r.user].name }}
      template(#action='{record}')
        a(@click='openModifyMatchModal(record)') 编辑
        a-divider(type='vertical')
        a-popconfirm(title='确认删除？' ok-text='是' cancel-text='否' @confirm='delMatch(record)' @cancel='')
          a 删除
  div.m-2.bg-gray-50.grid.grid-cols-1.gap-4(class='sm:grid-cols-2')
    div
    div

</template>

<script>
  import {
    ref,
  } from 'vue'
  import HeroAndPlayer from './HeroAndPlayer.vue'
  import {
    getMatches,
    createMatch,
    modifyMatch,
    delMatch as delMatchApi,
  } from 'src/js/api.js'
  import {
    UserMap as userMap
  } from 'src/js/preload.js'
  import {
    heroMap,
  } from 'src/js/heros.js'
  export default {
    components: {
      HeroAndPlayer,
    },
    setup() {
      let count = ref(1)
      let visible =ref(false)
      let tableData = ref([])
      let modalTitle = ref('')
      let genPlayer = () => {
        return {
          hero: '艾欧',
          user: null,
        }
      }
      let getV = (player) => {
        return {
          hero: {
            status: 'success',
            help: ''
          },
          user: {
            status: 'success',
            help: ''
          },
        }
      }
      let createNewFormData = () => {
        return {
          radiant: [
            genPlayer(),
            genPlayer(),
            genPlayer(),
            genPlayer(),
            genPlayer(),
          ],
          dire: [
            genPlayer(),
            genPlayer(),
            genPlayer(),
            genPlayer(),
            genPlayer(),
          ],
          win: 'radiant',
        }
      }
      let formData = ref(createNewFormData())
      let vs = ref(new Array(10).fill(0).map(() => getV()))
      let formRef = ref()
      let loading = ref(false)


      let heroSet = new Set()
      let userSet = new Set()
      let validate = () => {
        heroSet.clear()
        userSet.clear()
        let ans = 1
        let d = [
          ...formData.value.radiant,
          ...formData.value.dire,
        ]
        for (let i =0; i<10; i+= 1) {
          let {hero, user} = d[i]
          vs.value[i].hero.status = 'success'
          vs.value[i].hero.help = ''
          if (!hero) {
            vs.value[i].hero.status = 'error'
            vs.value[i].hero.help = '必填'
            ans = 0
          } else if (heroSet.has(hero)) {
            vs.value[i].hero.status = 'error'
            vs.value[i].hero.help = '英雄已选'
            ans = 0
          }
          heroSet.add(hero)
          vs.value[i].user.status = 'success'
          vs.value[i].user.help = ''
          if (!user) {
            vs.value[i].user.status = 'error'
            vs.value[i].user.help = '必填'
            ans = 0
          } else if (userSet.has(user)) {
            vs.value[i].user.status = 'error'
            vs.value[i].user.help = '玩家已选'
            ans = 0
          }
          userSet.add(user)
        }
        return ans
      }

      let loadMatches = () => {
        loading.value = true
        getMatches()
          .then((matches) => {
            tableData.value = matches
            count.value = matches.length
          })
          .finally(() => {
            loading.value = false
          })
      }
      loadMatches()

      let confirmAction
      let addMatch = () => {
        return createMatch(formData.value)
      }
      let showModal = () => {
          formData.value = createNewFormData()
          confirmAction = addMatch
          modalTitle.value = '新增比赛'
          visible.value = true
        }
      let openModifyMatchModal = (match) => {
        formData.value = match
        console.log(match, formData)
        visible.value = true
        modalTitle.value = '修改比赛'
        confirmAction = () => {
          return modifyMatch(formData.value)
        }
      }

      return {
        count,
        visible,
        tableData,
        heroMap,
        userMap,
        formData,
        formRef,
        loading,
        vs,
        modalTitle,
        showModal,
        openModifyMatchModal,
        delMatch: (match) => {
          delMatchApi(match.id)
            .then(() => {
              loadMatches()
            })
        },
        submit: (e) => {
          let ok = validate()
          if (ok) {
            confirmAction()
              .then(() => {
                loadMatches()
                visible.value = false
              })
          }
        },
        columns: [
          {dataIndex: 'updatedAt', title: '时间', key: 'time', slots: { customRender: 'time' }},
          {dataIndex: 'win', title: '获胜', key: 'win', slots: { customRender: 'win' }},
          {dataIndex: 'radiant', title: '天辉', key: 'radiant', slots: { customRender: 'radiant' }},
          {dataIndex: 'dire', title: '夜魇', key: 'dire', slots: { customRender: 'dire' }},
          {title: '操作', key: 'action', slots: { customRender: 'action' }}
        ],
      }
    }
  }
</script>
<style lang="less">
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
