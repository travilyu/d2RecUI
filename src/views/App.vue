<template lang='pug'>
div.m-2.bg-gray-50.grid.grid-cols-1.gap-4(class='sm:grid-cols-3')
  router-link(to='/match')
    div.acButton
      EditFilled.text-9xl
      span.badge 比赛数据
  router-link(to='/ana')
    div.acButton
      FundFilled.text-9xl
      span.badge 总胜率
  router-link(to='/playerAna')
    div.acButton
      FundFilled.text-9xl
      span.badge 单人胜率
  router-link(to='/user')
    div.acButton
      SettingFilled.text-9xl
      span.badge 用户
</template>

<script>
import Icon from '@ant-design/icons-vue'
import {
  EditFilled,
  FundFilled,
  SettingFilled,
} from '@ant-design/icons-vue'

export default {
  name: 'App',
  components: {
    Icon,
    EditFilled,
    FundFilled,
    SettingFilled,
  },
  data: () => {
    return {
    }
  },
  methods: {
    jump(url='/index.html') {
      window.location.href = url
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.badge {
  display: block;
  text-align: center;
  font-size: 32px;
}
.acButton {
  border-radius: 20px;
  background-color:#eee;
  margin: 0 10px;
  transform: scale(.9);
  transition: all .3s;
  cursor: pointer;
}
.acButton:hover {
  background-color: #1890ff;
  border-color: white;
  transform: scale(1);
  color: white;
}
</style>
