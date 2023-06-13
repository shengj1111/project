import axios from 'axios'
//引入nprogress和样式
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const app = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})
//请求拦截器
app.interceptors.request.use((config) => {
  nProgress.start()
  return config
})

app.interceptors.response.use(
  (request) => {
    nProgress.done()
    return request.data
  },
  (error) => {
    return Promise.reject(new Error('失败'))
  }
)

export default app
