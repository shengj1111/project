//二次封装axios
import axios from 'axios'
//引入进度条和样式
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// nProgress.start()代表进度条开始
// nProgress.done()代表进度条结束

//创建axios对象
const app = axios.create({
  //基础路径（发送请求时都带有这个路径）
  baseURL: '/api',
  //当请求超时5s就结束请求
  timeout: 5000,
})

//请求拦截器:发送请求前拦截请求，在请求前做一些事情
app.interceptors.request.use((config) => {
  //config:是一个配置对象，里面的一个属性很重要，header请求头
  if (store.state.detail.uuid_token) {
    //给请求头发送一个字段(用户临时id)
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nProgress.start()
  return config
})

//响应拦截器
app.interceptors.response.use(
  (request) => {
    //请求成功，数据会传输过来
    nProgress.done()
    return request.data
  },
  (error) => {
    // 请求失败，做一些事情
    console.log(error)
    return Promise.reject(new Error('失败'))
  }
)
//对外暴露App
export default app
