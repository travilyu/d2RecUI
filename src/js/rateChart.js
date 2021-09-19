import * as echarts from 'echarts'
import _ from 'lodash'
export default (id, rateData) => {
  let chart = echarts.init(document.getElementById(id))
  chart.resize()
  let users = _.map(rateData, d => d.user)
  let wins = rateData.map(d => {
    return {
      value: d.win || null,
      raw: d,
    }
  })
  let fails = rateData.map(d => {
    return {
      value: -1 * d.fail || null,
      raw: d,
    }
  })
  let options = {
    grid: {
        left: '20',
        right: '20',
        bottom: '20',
        containLabel: true
    },
    legend: {
      data: ['胜利', '失败']
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      data: users,
    },
    series: [
      {
        name: '胜利',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
        },
        itemStyle: {
          color: 'red',
        },
        data: wins,
      }, {
        name: '失败',
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
        },
        itemStyle: {
          color: 'blue',
        },
        data: fails,
      },
    ],
  }
  chart.setOption(options)
  return chart
}
