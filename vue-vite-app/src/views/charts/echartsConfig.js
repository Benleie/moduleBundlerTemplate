import * as echarts from 'echarts';

const barOptions = {
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

const pieOptions = {
  color: ['#2F54EB', '#722ED1', '#EB2F96', '#52C41A', '#fff'],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    // orient: 'vertical',
    orient: 'horizontal',
    left: 0,
    top: 0
    // left: 'left'
  },
  series: [
    {
      name: '2021.09.01-2021.09.06',
      type: 'pie',
      radius: '50%',
      label: {
        alignTo: 'edge',
        color: 'inherit',
        formatter: '{b}: {c}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
      },
      data: [
        { value: 64, name: '类型一' },
        { value: 12, name: '类型二' },
        { value: 12, name: '类型三' },
        { value: 12, name: '类型四' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

const ringOptions = {
  color: ['#2F54EB', '#722ED1', '#EB2F96', '#52C41A', '#999'],
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '2021.09.01-2021.09.06',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        alignTo: 'edge',
        color: 'inherit',
        formatter: '{b}: {c}',
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: 40,
      //     fontWeight: 'bold'
      //   }
      // },
      labelLine: {
        // show: false
      },
      data: [
        { value: 64, name: '类型一' },
        { value: 12, name: '类型二' },
        { value: 12, name: '类型三' },
        { value: 12, name: '类型四' }
      ],
    }
  ]
};

// 基于准备好的dom，初始化echarts实例
export const initChart = () => {
  var myChart = echarts.init(document.getElementById('main'));
  // 绘制图表
  myChart.setOption(ringOptions);
}
