import {reqGetCode, reqSendUserInfo, reqUserLoginInfo, reqGetUserInfo, reqUserLogOut} from '@/api'
import {getUserToken, setUserToken, removeUserToken} from '@/utils/token'
const actions = {
  //获取验证码
  async getUserCode({commit}, phone) {
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETUSERCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
  //发送注册
  async sendUserInfo({commit}, data) {
    let result = await reqSendUserInfo(data)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
  // 发送登录
  async sendUserLoginInfo({commit}, data) {
    let result = await reqUserLoginInfo(data)
    if (result.code == 200) {
      commit('SENDUSERLOGININFO', result.data.token)
    }
  },
  //获取用户信息
  async getUserInfo({commit}) {
    let result = await reqGetUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      //失败
      return Promise.reject(new Error('失败'))
    }
  },
  //退出登录
  async userLogOut({commit}) {
    let result = await reqUserLogOut()
    if (result.code == 200) {
      commit('USERLOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
  },
}
const mutations = {
  GETUSERCODE(state, code) {
    state.userCode = code
  },
  SENDUSERLOGININFO(state, token) {
    state.token = token
    setUserToken(token)
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  USERLOGOUT(state) {
    state.userInfo = {}
    state.token = ''
    removeUserToken()
  },
}
const state = {
  userCode: '',
  token: getUserToken('TOKEN') || '',
  userInfo: {},
}
const getters = {}

export default {
  actions,
  mutations,
  state,
  getters,
}
