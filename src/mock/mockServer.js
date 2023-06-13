//引入mockjs(模拟数据)
import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

//mock函数有两个参数 第一个参数是请求的地址 第二个参数是请求的数据
let a = Mock.mock('/mock/banner', {
  //请求状态码
  code: 200,
  //请求的数据体
  data: banner,
})

let b = Mock.mock('/mock/floor', {
  //请求状态码
  code: 200,
  //请求的数据体
  data: floor,
})
