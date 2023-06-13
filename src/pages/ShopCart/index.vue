<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @click="changeCheckd(cartInfo)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeSkuNum('mins', cartInfo, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change', cartInfo, $event.target.value * 1)" />
            <a class="plus" @click="changeSkuNum('add', cartInfo, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum"> {{ cartInfo.skuNum * cartInfo.skuPrice }} </span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cartInfo)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList > 0"
          @change="isCheckAllCart($event.target.checked)" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import thorttle from 'lodash/throttle.js'
  export default {
    name: 'ShopCart',
    mounted() {
      this.getShopcartData()
    },
    computed: {
      ...mapGetters(['shopCartList']),
      cartInfoList() {
        return this.shopCartList.cartInfoList || []
      },
      isAllCheck() {
        //遍历数组里面原理，只要全部元素isChecked属性都为1===>真 true
        //只要有一个不是1======>假false
        return this.cartInfoList.every(item => item.isChecked == 1)
      },
      totalPrice() {
        let sum = 0
        this.cartInfoList
          .filter(item => {
            return item.isChecked == 1
          })
          .forEach(item => {
            sum += item.skuNum * item.skuPrice
          })
        return sum
      },
    },
    methods: {
      getShopcartData() {
        this.$store.dispatch('getShopCartList')
      },
      //修改商品个数[节流]
      changeSkuNum: thorttle(async function (type, cartInfo, value) {
        //type ： mins,add 表示加减按钮 change表示输入框
        switch (type) {
          case 'add':
            value = 1
            break
          case 'mins':
            value = cartInfo.skuNum == 1 ? 0 : -1
            break
          case 'change':
            if (isNaN(value) || value < 0) {
              value = 0
            } else {
              value = parseInt(value) - cartInfo.skuNum
            }
            break
        }
        try {
          await this.$store.dispatch('addShopCart', {
            skuId: cartInfo.skuId,
            skuNum: value,
          })
          //获取服务器最新数据
          this.getShopcartData()
        } catch (error) {
          alert(error.message)
        }
      }, 1000),
      //删除商品
      async deleteCart(cartInfo) {
        if (confirm('确定删除？')) {
          try {
            await this.$store.dispatch('deleteCartListById', cartInfo.skuId)
            this.getShopcartData()
          } catch (error) {
            alert(error.message)
          }
        }
      },
      //修改商品是否被选中
      async changeCheckd(cartInfo) {
        try {
          //修改数据成功，发送请求获取数据
          let isChecked = !cartInfo.isChecked ? 1 : 0
          await this.$store.dispatch('changeCartCheckd', {
            skuId: cartInfo.skuId,
            isChecked,
          })
        } catch (error) {
          alert(error.message)
        }
        this.getShopcartData()
      },
      //删除被选中的商品
      async deleteAllChecked() {
        if (confirm('确定删除已选中的商品吗?')) {
          try {
            //发送请求获取数据
            await this.$store.dispatch('deleteAllChecked')
            this.getShopcartData()
          } catch (error) {
            alert(error.message)
          }
        }
      },
      //全选 || 全不选商品
      async isCheckAllCart(checked) {
        checked = checked ? '1' : '0'
        try {
          await this.$store.dispatch('isCheckAllCart', checked)
          this.getShopcartData()
        } catch (error) {
          alert(error.message)
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        & > div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;
        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          & > li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;
          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: 'Microsoft YaHei';
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
