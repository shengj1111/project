//跨域发送ajax请求和业务代码逻辑
import {reqGetSearchInfo} from '@/api'
const actions = {
  //传参的时候参数至少是一个空对象
  async getSearchList({commit}, params = {}) {
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  },
}
//同步修改数据的地方（唯一修改数据的地方）
const mutations = {
  GETSEARCHLIST(state, params) {
    state.searchList = params
  },
}
//数据管理的地方
const state = {
  searchList: {},
}
//理解为组件的计算属性，用于简化代码的计算量
const getters = {
  //如果没网，至少返回的是空数组
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
}

export default {
  actions,
  mutations,
  state,
  getters,
}
