<template>
  <div>
    <div class="search">
      <input class="searchInput" type="text" v-model="searchVal" @confirm="search" :focus="true" confirm-type="search" placeholder="搜索内容">
    </div>
    <div class="history" v-if="historyArr.length>0 && list.length == 0">
      <div class="historyText">搜索历史</div>
      <div class="historyBadge">
        <div class="tag" @click="changeList(tag)" v-for="(tag,idx) in historyArr" :key="idx">{{tag}}</div>
      </div>
    </div>
    <div v-if="list.length>0"><item-list :list="list"></item-list></div>
  </div>
</template>

<script>
import itemList from '@/components/itemlist/itemlist'
export default {
  components: {
    itemList
  },
  data () {
    return {
      searchVal: '',
      historyArr: [],
      list: []
    }
  },
  mounted () {
    this.list = []
    this.searchVal = ''
    this.historyArr = wx.getStorageSync('historyArr')
  },
  methods: {
    search (res) {
      if (!this.searchVal) {
        this.list = []
        return
      }
      if (!this.historyArr) {
        this.historyArr = []
      }
      let setArr = new Set(this.historyArr)
      setArr.add(this.searchVal)
      this.historyArr = Array.from(setArr)
      wx.setStorageSync('historyArr', this.historyArr)
      this.getList()
    },
    getList () {
      let list = this.$store.state.list
      this.list = list.filter((item) => item.cn_title.indexOf(this.searchVal) !== -1)
      console.log(this.list)
    },
    changeList (newVal) {
      this.searchVal = newVal
      this.getList()
    }
  }
}
</script>

<style lang="stylus">
page {
  background-color: #eee;
}
</style>

<style lang="stylus" scoped>
  .searchInput
    padding 5px 20px
    border-radius 10rpx
    margin 10px
    border 1px solid #999
  .history
    margin 10px
    font-size 14px
    .historyText
      margin 10px
    .historyBadge
      display flex
      .tag
        padding 5px 10px
        border-radius 5px
        background #999
        margin-right 5px
</style>
