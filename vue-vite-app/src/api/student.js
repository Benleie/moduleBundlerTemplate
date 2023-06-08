// TODO: 随机生成data
import { request } from './utils/request'

// TODO: 放置到全局，供其他模板使用api
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

export const getStudentData = () => new Promise((resolve) => {
  setTimeout(() => {
    const randomCount = Math.floor(Math.random() * 4 + 1)
    console.log(randomCount)
    resolve(tableData.slice(0, randomCount))
  }, 1000)
})
// TODO: PROXY
export const getScoresList = (params) => request({
  url: '/score/getScoreList',
  params,
})
