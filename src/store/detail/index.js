import {reqGetGoodInfo, reqAddShopCart} from '@/api'
import {getuuid} from '@/utils/uuid_token'
const actions = {
  async getGoodInfo({commit}, skuId) {
    let result = await reqGetGoodInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  async addShopCart({commit}, {skuId, skuNum}) {
    //发送请求的时候需要返回一个值给调用函数的页面
    //是字符串就代表成功了
    let result = await reqAddShopCart(skuId, skuNum)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
}

const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}

const state = {
  goodInfo: {},
  uuid_token: getuuid(),
}
const getters = {
  categoryView() {
    return state.goodInfo.categoryView || {}
  },
  skuInfo() {
    return state.goodInfo.skuInfo || {}
  },

  spuSaleAttrList() {
    return state.goodInfo.spuSaleAttrList || []
  },
}

export default {
  actions,
  mutations,
  state,
  getters,
}
