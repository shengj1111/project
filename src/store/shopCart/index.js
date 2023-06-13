import {reqShopCart, reqDeleteCartById, reqChangeCheck} from '@/api'
const actions = {
  async getShopCartList({commit}) {
    let result = await reqShopCart()
    if (result.code == 200) {
      commit('GETSHOPCARTLIST', result.data)
    }
  },
  //删除购物车商品
  async deleteCartListById({commit}, skuId) {
    console.log(skuId)
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
  //修改状态
  async changeCartCheckd({commit}, {skuId, isChecked}) {
    let result = await reqChangeCheck(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
  deleteAllChecked({dispatch, getters}) {
    let cartList = getters.shopCartList.cartInfoList
    //将返回的promise数据放到一个数组中
    let PromiseAll = []
    //将被选中的数据进行发送请求
    cartList.forEach((item) => {
      if (item.isChecked == 1) {
        let Promise = dispatch('deleteCartListById', item.skuId)
        PromiseAll.push(Promise)
      }
    })
    //全部成功就返回true 否则就返回false
    return Promise.all(PromiseAll)
  },
  //全选 || 全不选商品
  isCheckAllCart({dispatch, state}, isCheck) {
    let PromiseAll = []
    state.shopCartList[0].cartInfoList.forEach((item) => {
      if (item.isChecked != isCheck) {
        let promise = dispatch('changeCartCheckd', {skuId: item.skuId, isChecked: isCheck})
        PromiseAll.push(promise)
      }
    })
    return Promise.all(PromiseAll)
  },
}
const mutations = {
  GETSHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList
  },
}
const state = {
  shopCartList: [],
}
const getters = {
  shopCartList(state) {
    return state.shopCartList[0] || []
  },
}

export default {
  actions,
  mutations,
  state,
  getters,
}
