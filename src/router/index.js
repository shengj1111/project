//引入Vue、路由和路由组件
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)
// 重写replace || push 方法
// 先保存一份原来的push || replace
let myPush = VueRouter.prototype.push
let myreplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  //location是要到哪去，resolve是成功，reject是失败
  //如果成功和失败的参数都有就进行路由跳转
  if (resolve && reject) {
    myPush.call(this, location, resolve, reject)
  } else {
    //成功或者失败没有参数，就给两个回调函数
    myPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {y: 0}
  },
})

//全局路由守卫（前置）
router.beforeEach(async (to, from, next) => {
  //获取用户token
  let token = store.state.user.token
  //获取userInfo里面的name进行判断
  let name = store.state.user.userInfo.name
  //如果token在就不能去登陆界面
  if (token) {
    //登陆了，但是要到登陆界面
    if (to.path == '/login') {
      next('/')
    } else {
      //登录了
      if (name) {
        next()
      } else {
        //没有用户名
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token失效了，就清空数据，跳转到登录页
          store.commit('USERLOGOUT')
          next('/login')
        }
      }
    }
  } else {
    // 没登陆
    let topath = to.path
    if (
      topath.indexOf('/trade') != -1 ||
      topath.indexOf('/pay') != -1 ||
      topath.indexOf('/center') != -1 ||
      topath.indexOf('/paySuccess') != -1
    ) {
      //query传输登录之后跳转的页面
      router.push('/login?redict=' + topath)
    } else {
    }
    next()
  }
})

export default router
