<template lang="pug">
div.grid.grid-rows-2.grid-cols-6.gap-1.mx-2.my-6
  div.row-span-2.col-span-2(class='sm:col-span-1' style='position:relative')
    img(width='128' height='72' :src='selectedHero.img' style='position:absolute; bottom: 7px; width: auto; height:calc(auto - 7px); max-width: 100%; max-height:100%')
  div.col-span-4(class='sm:col-span-5')
    h5.text-xl.text-gray-400 选择英雄和玩家
  div.col-span-4.grid.grid-cols-2.gap-x-2(class='sm:col-span-5')
    a-select(:value='selectedHero.text' @change='heroChange' show-search)
      a-select-option(v-for='hero in Heros' :value='hero.text') {{hero.text}}
    a-select
</template>
<script>
import Heros from 'src/js/heros.js'
import _ from 'lodash'
import {
  ref
} from 'vue'
let heroMap = _.keyBy(Heros.map(d => {
  return {
    text: d.text,
    img: `/d2img/${d.img}`,
  }
}), 'text')
export default {
  setup() {
    let selectedHero = ref({
      img: '/d2img/npc_dota_hero_wisp.png',
      text: '艾欧',
    })
    let heroChange = (v) => {
      selectedHero.value = heroMap[v]
    }
    return {
      selectedHero,
      heroChange,
      Heros,
    }
  }
}
</script>