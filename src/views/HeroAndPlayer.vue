<template lang="pug">
div.grid.grid-rows-2.grid-cols-6.gap-1.mx-2.my-6
  div.row-span-2.col-span-2(class='sm:col-span-1' style='position:relative')
    img(width='128' height='72' :src='heroMap[selectedHero.hero || defaultHero].img' style='position:absolute; bottom: 7px; width: auto; height:calc(auto - 7px); max-width: 100%; max-height:100%')
  div.col-span-4(class='sm:col-span-5')
    h5.text-xl.text-gray-400 选择英雄和玩家
  div.col-span-4.grid.grid-cols-2.gap-x-2(class='sm:col-span-5')
    a-form-item(:name='[side, index, "hero"]' :validateStatus='v.hero.status' :help='v.hero.help')
      a-select(:value='selectedHero.hero' @change='heroChange' show-search)
        a-select-option(v-for='hero in heros' :value='hero.text') {{hero.text}}
    a-form-item(:name='[side, index, "hero"]' :validateStatus='v.user.status' :help='v.user.help')
      a-select(:value='selectedHero.user' @change='userChange' show-search)
        a-select-option(v-for='user in Users' :value='user.id') {{ getFullName(user) }}
</template>
<script>
import {
  heros,
  heroMap,
} from 'src/js/heros.js'
import {
  ref,
} from 'vue'
import {
  Users
} from 'src/js/preload.js'

export default {
  props: {
    hero: [Number, String],
    user: Number,
    side: String,
    index: Number,
    v: Object,
  },
  emits: ['update:hero', 'update:user'],
  setup(props, { emit }) {
    let defaultHero = '艾欧'
    let selectedHero = ref({
      user: props.user,
      hero: props.hero,
    })
    let heroChange = (v) => {
      selectedHero.value.hero = v
      emit('update:hero', v)
    }
    let userChange = (v) => {
      selectedHero.value.user = v
      emit('update:user', v)
    }
    let getFullName = user => {
      return user.alias ? `${user.name}(${user.alias})` : user.name
    }
    return {
      selectedHero,
      heroChange,
      heros,
      Users,
      heroMap,
      defaultHero,
      userChange,
      getFullName,
    }
  }
}
</script>