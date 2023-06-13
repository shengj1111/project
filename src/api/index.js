// 这个文件是对接口API统一管理
import Requests from './ajax'
import mockRequest from './mockAjax'

//三级联动请求地址 /api/product/getBaseCategoryList
//请求方式 get

//创建三级联动的API响应
export const reqCategoryList = () => {
  return Requests({
    //向哪个地址发送请求
    url: '/product/getBaseCategoryList',
    method: 'get',
  })
}
//轮播图数据
export const reqGetBannerList = (params) => {
  return mockRequest({
    url: '/banner',
  })
}

///floor数据

export const reqGetFloorList = (params) => {
  return mockRequest({
    url: 'floor',
  })
}

export const reqGetSearchInfo = (params) => {
  return Requests({
    url: '/list',
    method: 'post',
    //传递的参数
    data: params,
  })
}

export const reqGetGoodInfo = (skuId) => {
  return Requests({
    url: `/item/${skuId}`,
    method: 'get',
  })
}

export const reqAddShopCart = (skuId, skuNum) => {
  return Requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  })
}
//获取购物车里面的信息
export const reqShopCart = (params) => {
  return Requests({
    url: '/cart/cartList',
    method: 'get',
  })
}

//删除购物车商品
export const reqDeleteCartById = (skuId) => {
  return Requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
  })
}
//修改商品选择状态
export const reqChangeCheck = (skuId, isChecked) => {
  return Requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get',
  })
}
//获取验证码
export const reqGetCode = (phone) => {
  return Requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get',
  })
}
//发送注册信息
export const reqSendUserInfo = (data) => {
  return Requests({
    url: '/user/passport/register',
    data,
    method: 'post',
  })
}
//发送登录信息
export const reqUserLoginInfo = (data) =>
  Requests({
    url: '/user/passport/login',
    data,
    method: 'post',
  })

//获取token信息
export const reqGetUserInfo = (params) => {
  return Requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get',
  })
}
//退出登录
export const reqUserLogOut = (params) => {
  return Requests({
    url: '/user/passport/logout',
    method: 'get',
  })
}
//获取地址 /user/userAddress/auth/findUserAddressList
export const reqGetUserAddress = (params) => {
  return Requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get',
  })
}
//获取订单商品信息 /api/order/auth/trade
export const reqGetTradeCart = (params) => {
  return Requests({
    url: '/order/auth/trade',
    method: 'get',
  })
}
//提交订单
export const reqSumbitOrder = (tradeNo, data) => {
  return Requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post',
  })
}
//获取订单信息
export const reqGetOrder = (orderId) => {
  return Requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get',
  })
}
//获取订单支付状态
export const reqPayStatus = (orderId) => {
  return Requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get',
  })
}
//获取订单数量 /api/order/auth/{page}/{limit}
export const reqGetMyOrderList = (page, limit) => {
  return Requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get',
  })
}
