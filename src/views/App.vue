<template lang='pug'>
div.m-2.bg-gray-50.grid.grid-cols-1.gap-4(class='sm:grid-cols-3')
  div.acButton(@click='jump("/list.html")')
    EditFilled.text-9xl
    span.badge 录入数据
  div.acButton(@click='jump("/list.html")')
    FundFilled.text-9xl
    span.badge 查看数据
  div.acButton(@click='jump("/list.html")')
    SettingFilled.text-9xl
    span.badge 设置
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
