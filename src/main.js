import Vue from 'vue'
import App from './App.vue'
import router from './router'
//注册三级联动组件
import TypeNav from '@/components/TypeNav'
//引入轮播图组件
import Carousel from '@/components/Carousel'
//引入VueX的仓库
import store from './store'
//引入mock数据
import '@/mock/mockServer'
//引入swiper样式
import 'swiper/css/swiper.css'
//引入element ui
import {MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Pagenation from '@/components/Pagenation'
import atm from '@/assets/1.jpg'
//图片懒加载
import VueLazyload from 'vue-lazyload'
//表单验证
import '@/plugins/vailDate'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagenation.name, Pagenation)
Vue.config.productionTip = false
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.use(VueLazyload, {
  loading: atm,
})
// 引入api接口
import * as API from '@/api'
new Vue({
  el: '#app',
  router,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册仓库
  store,
  render: (h) => h(App),
})
