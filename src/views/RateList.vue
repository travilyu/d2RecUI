<template lang="pug">
div
  a-table(:dataSource='rdata' rowKey='user' :columns='columns' :loading='!data.length' :pagination='pagination')
    template(#winRate='{text: rate}')
      a-progress(:percent='rate * 100' :format='d => `${parseInt(d)}%`' :status='isMate ? "normal" : "exception"')
</template>
<script>
const columns = [{
  title: '名称',
  dataIndex: 'user',
}, {
  title: '胜场',
  dataIndex: 'win',
  sorter: (a, b) => a.win - b.win,
  sortDirections: ['descend', 'ascend'],
}, {
  title: '败场',
  dataIndex: 'fail',
  sorter: (a, b) => a.fail - b.fail,
  sortDirections: ['descend', 'ascend'],
}, {
  title: '净胜场',
  dataIndex: 'netwin',
  sorter: (a, b) => a.netwin - b.netwin,
  sortDirections: ['descend', 'ascend'],
  defaultSortOrder: 'descend',
}, {
  title: '胜率',
  dataIndex: 'rate',
  slots: { customRender: 'winRate' },
  key: 'rate',
  sorter: (a, b) => a.rate - b.rate,
  sortDirections: ['descend', 'ascend'],
}]
import {
  computed
} from 'vue'
export default {
  props: {
    data: Array,
    strokeColor: {
      type: String,
      default: '#1890ff',
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    isMate: {
      type: Boolean,
      default: true,
    }
  },
  setup(props, context) {
    let rdata = computed(() => props.data.map(d => {
      return {
        ...d,
        rate: d.win / ((d.fail + d.win) || 1),
        netwin: d.win - d.fail,
      }
    }))
    return {
      rdata,
      columns,
    }
  }
}
</script>