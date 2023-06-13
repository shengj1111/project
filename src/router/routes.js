// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Search from '@/pages/Search'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// //二级路由
// import MyOrder from '@/pages/Center/myOrder'

//路由懒加载,优化加载速度
export default [
  {
    path: '/home',
    component: () => import('@/pages/Home'),
    meta: { isShow: true },
  },
  {
    name: 'search',
    path: '/search:keyword?',
    component: () => import('@/pages/Search'),
    meta: { isShow: true },
    props: $route => {
      return {
        keyword: $route.params.keyword,
      }
    },
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { isShow: false },
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { isShow: false },
  },
  {
    path: '/detail:skuId?',
    component: () => import('@/pages/Detail'),
  },
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { isShow: true },
  },
  {
    path: '/shopCart',
    component: () => import('@/pages/ShopCart'),
    meta: { isShow: true },
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { isShow: false },
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        /* 跳转到form的地址 */
        next(false)
        // next(from.path)
      }
    },
  },
  {
    path: '/paySuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { isShow: false },
    beforeEnter: (to, from, next) => {
      if (from.path == '/pay') {
        next()
      } else {
        /* 跳转到form的地址 */
        next(false)
        // next(from.path)
      }
    },
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { isShow: false },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        /* 跳转到form的地址 */
        next(false)
        // next(from.path)
      }
    },
  },
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder'),
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      },
    ],
  },
  //重定向，一打开就显示主页
  {
    path: '*',
    redirect: '/home',
  },
]
