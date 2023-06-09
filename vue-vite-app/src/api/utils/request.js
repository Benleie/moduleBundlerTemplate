import axios from 'axios'

const devAxios = axios.create({
  baseURL: '/api',
  timeout: 5000,
})
export const request = (options) => {
  const axiosOption = {
    method: options.method || 'post',
    url: options.url,
    responseType: 'json',
  }

  // 根据不同的请求方式封装数据
  switch (axiosOption.method) {
    case 'get':
      axiosOption.params = options.params
      break
    case 'post': {
      axiosOption.data = options.params
      break
    }
    case 'upload': {
      const formData = new FormData()
      for (const key in options.params) {
        formData.append(key, options.params[key])
      }
      axiosOption.data = formData
      axiosOption.params = options.query
      break
    }
    default:
      axiosOption.params = options.params
  }

  return new Promise((resolve, reject) => {
    devAxios.request(axiosOption).then((response) => {
      resolve(response)
    })
      .catch((error) => {
        reject(error.response || error)
      })
  })
}

export default axios;
