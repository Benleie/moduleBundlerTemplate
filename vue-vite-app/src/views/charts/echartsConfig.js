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
    valueFormatter: (value) => {
      return value + `(${value / 1000}%)`
    },
    trigger: 'axis',
    axisPointer: {
      type: "shadow"
    } 
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    min: -2,
    max: 8,
    axisTick: {
      alignWithLabel: true
    },
    data: ['20210901', '20210902', '20210903', '20210904', '20210905', '20210906']
  },
  yAxis: [
    {
      type: 'value',
      name: '单位（元）',
      position: 'left',
      boundaryGap: ['0', '5%']
    },
    {
      type: 'category',
      name: 'percent',
      position: 'right',
      // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
  ],
  series: [
    {
      name: '数据一',
      type: 'bar',
      data: [
        { value: 50000, name: '单位（元）' },
        { value: 50000, name: 'percent' },
        { value: 50000, name: 'percent' },
        { value: 50000, name: 'percent' },
        { value: 50000, name: 'percent' },
        { value: 50000, name: 'percent' }
      ]
    },
    {
      name: '数据二',
      type: 'bar',
      data: [30000, 30000, 30000, 30000, 30000, 30000]
    },
    {
      name: '数据三',
      type: 'bar',
      data: [40000, 40000, 40000, 40000, 40000, 40000]
    },
    {
      name: '数据四',
      type: 'bar',
      data: [-20000, -20000, -20000, -20000, -20000, -20000]
    }
  ]
}
// 基于准备好的dom，初始化echarts实例
export const initChart = () => {
  var myChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  myChart.setOption(options);
}
