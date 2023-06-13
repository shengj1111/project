//跨域发送ajax请求和业务代码逻辑
import {reqCategoryList, reqGetBannerList, reqGetFloorList} from '@/api'
const actions = {
  async cateGoryList({commit}) {
    //请求回来的数据
    let res = await reqCategoryList()
    //如果请求的状态码==200（成功），就去commit
    if (res.code == 200) {
      commit('CATEGORYLIST', res.data)
    }
  },
  async bannerList({commit}) {
    let res = await reqGetBannerList()
    if (res.code == 200) {
      commit('BANNERLIST', res.data)
    }
  },
  async floorList({commit}) {
    let result = await reqGetFloorList()
    if (result.code == 200) {
      commit('FLOORLIST', result.data)
    }
  },
}
//同步修改数据的地方（唯一修改数据的地方）
const mutations = {
  CATEGORYLIST(state, cateGories) {
    //接收数据并将数据赋值给state
    state.cateGoryList = cateGories
  },
  BANNERLIST(state, banners) {
    state.bannerList = banners
  },
  FLOORLIST(state, floor) {
    state.floorList = floor
  },
}
//数据管理的地方
const state = {
  //存放数据
  cateGoryList: [],
  bannerList: [],
  floorList: [],
}
//理解为组件的计算属性，用于简化代码的计算量
const getters = {}

export default {
  actions,
  mutations,
  state,
  getters,
}
