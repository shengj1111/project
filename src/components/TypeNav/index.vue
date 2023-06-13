<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveClass" @mouseenter="enterClass">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="navShow">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级联动 -->
              <!-- 为每个a标签添加 data-categoryName判断是不是a标签-->
              <!-- 为每个a标签添加 data-category1Id判断几级标题-->
              <div
                class="item"
                v-for="(item1, index) in cateGoryList"
                :key="item1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="item1.categoryName"
                    :data-category1Id="item1.categoryId"
                    >{{ item1.categoryName }}</a
                  >
                </h3>
                <!-- 二三级联动 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="item2 in item1.categoryChild"
                    :key="item2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="item2.categoryName"
                          :data-category2Id="item2.categoryId"
                          >{{ item2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="item3 in item2.categoryChild"
                          :key="item3.categoryId"
                        >
                          <a
                            :data-categoryName="item3.categoryName"
                            :data-category3Id="item3.categoryId"
                            >{{ item3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
//引入lodash 中封装好的截留函数
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      //一级导航的索引值
      currentIndex: -1,
      //菜单分类的显示
      navShow: true,
    }
  },
  mounted() {
    //只要不是在home这个路由组件，就将商品分类菜单隐藏
    if (this.$route.path != '/home') {
      this.navShow = false
    }
  },
  computed: {
    //接收state里面的数据，并且展现的页面上
    ...mapState({
      cateGoryList: (state) => {
        return state.home.cateGoryList
      },
    }),
  },
  methods: {
    //鼠标进入修改data数据，用来添加样式
    // 利用节流函数防卡顿(函数意义：50毫秒这个时间段只会执行一次)
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    //鼠标离开移除样式
    leaveClass() {
      this.currentIndex = -1
      //只要不是home路由组件都需要隐藏分类菜单
      if (this.$route.path != '/home') {
        this.navShow = false
      }
    },
    enterClass() {
      this.navShow = true
    },
    goSearch(event) {
      // router-link是组件，循环生成很消耗性能，每个a标签绑定点击事件也很消耗性能
      //路由的跳转 编程式导航+事件委派
      // 存在的问题就是父元素中有许多节点，需要获取对应的节点和节点多需要的参数
      //利用自定义属性来判断是不是a标签（事件中的dataset属性来判断）
      //结构拆分将 element.dataset里面的 {categoryname, category1id, category2id, category3id}拆分出来
      let element = event.target
      let { categoryname, category1id, category2id, category3id } =
        element.dataset
      // 有 categoryname 这个属性的就是a标签
      if (categoryname) {
        //跳转地址
        let location = { name: 'search' }
        //参数
        let query = { categoryName: categoryname }
        //一级标题就是 category1id，二级标题就是category2id 三级标题就是category3id
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        //将query参数添加到location这个跳转对象里面
        if (this.$route.params) {
          location.query = query
          location.params = this.$route.params
          //跳转传参数
          this.$router.push(location)
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 520px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 520px;
    }
    .sort-enter-active {
      transition: 0.5s linear;
    }
  }
}
</style>