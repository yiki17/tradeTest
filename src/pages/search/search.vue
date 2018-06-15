<template>
  <div>
    <div class="search">
      <input class="searchInput" type="text" v-model="searchVal" @confirm="search" :focus="true" confirm-type="search" placeholder="搜索内容">
    </div>
    <div class="history" v-if="searchArr.length>0">
      <div class="historyText">搜索历史</div>
      <div class="historyBadge">
        <div class="tag" v-for="(tag,idx) in searchArr" :key="idx">{{tag}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVal: '',
      searchArr: []
    }
  },
  mounted () {
    this.searchArr = wx.getStorageSync('searchArr')
  },
  methods: {
    search (res) {
      if (!this.searchVal) {
        return
      }
      if (!this.searchArr) {
        this.searchArr = []
      }
      let setArr = new Set(this.searchArr)
      setArr.add(this.searchVal)
      this.searchArr = Array.from(setArr)
      wx.setStorageSync('searchArr', this.searchArr)
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
