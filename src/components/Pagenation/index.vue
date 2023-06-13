<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="getPageNo(pageNo - 1)">
      上一页
    </button>
    <button
      @click="getPageNo(1)"
      v-if="startNumAndEndNum.start > 1"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start && page <= totalPages"
      @click="getPageNo(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPages">···</button>
    <button
      @click="getPageNo(totalPages)"
      v-if="startNumAndEndNum.end < totalPages"
      :class="{ active: pageNo == totalPages }"
    >
      {{ totalPages }}
    </button>
    <button :disabled="pageNo == totalPages" @click="getPageNo(pageNo + 1)">
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagenation',
  props: ['pageNo', 'pageSize', 'total', 'continues', 'totalPages'],
  computed: {
    startNumAndEndNum() {
      let start = 0,
        end = 0
      // 总页数小于连续页码
      if (this.getTotalPage < this.continues) {
        start = 1
        end = this.getTotalPage
      } else {
        //正常情况
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        //页码数小于0
        if (start < 1) {
          start = 1
          end = this.continues
        }
        //超出最大的页码数
        if (end > this.getTotalPage) {
          end = this.getTotalPage
          start = end - (this.continues - 1)
        }

        return { start, end }
      }
    },
  },
  methods: {
    //发送当前页数给父组件
    getPageNo(pageNo) {
      this.$emit('getPageNo', pageNo)
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
