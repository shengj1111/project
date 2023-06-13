import Vue from 'vue'
import Vuex from 'vuex'
//使用VueX
Vue.use(Vuex)
//引入模块化组件库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade,
  },
})
