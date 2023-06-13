import {reqGetUserAddress, reqGetTradeCart} from '@/api'

const actions = {
  //获取用户地址
  async getUserAddress({commit}) {
    let result = await reqGetUserAddress()
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
  async getUserTradeCart({commit}) {
    let result = await reqGetTradeCart()
    if (result.code == 200) {
      commit('GETUSERTRADECART', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
}
const mutations = {
  GETUSERADDRESS(state, userAddress) {
    state.userAddress = userAddress
  },
  GETUSERTRADECART(state, tradeCartInfo) {
    state.tradeCartInfo = tradeCartInfo
  },
}
const state = {
  userAddress: [],
  tradeCartInfo: {},
}
const getters = {}

export default {
  actions,
  mutations,
  state,
  getters,
}
