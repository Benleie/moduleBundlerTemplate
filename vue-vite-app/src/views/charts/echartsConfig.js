import * as echarts from 'echarts';

const options = {
  color: ['#2F54EB', '#722ED1', '#EB2F96', '#52C41A', '#fff'],
  title: {
    // text: 'ECharts 入门示例'
  },
  legend: {
    // orient: 'vertical',
    orient: 'horizontal',
    left: 0,
    top: 0
  },
  tooltip: {
    order: 'valueDesc',
    trigger: 'axis',
    axisPointer: {
      type: "shadow"
    }
  },
  xAxis: {
    type: 'category',
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {
    name: '单位（元）'
  },
  series: [
    {
      name: '数据一',
      type: 'bar',
      data: [20, 20, 36, 10, 10, 20]
    },
    {
      name: '数据二',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    },
    {
      name: '数据三',
      type: 'bar',
      data: [30, 20, 36, 10, 10, 20]
    },
    {
      name: '数据四',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
}
// 基于准备好的dom，初始化echarts实例
export const initChart = () => {
  var myChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  myChart.setOption(options);
}
