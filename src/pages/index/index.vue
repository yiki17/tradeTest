<template>
  <div>
    <topswiper></topswiper>
    <div class="searchBtn">
      <div class="searchText" @click="goTosearch"><icon class="searchIcon" type="search" size="14"></icon>搜索</div>
    </div>
    <div class="content">
      <div class="classification">
        <div class="item">
          <img class="item-img" mode="aspectFit" src="../../../static/all.png" alt="">
          <p class="item-text">所有商品</p>
        </div>
        <div class="item">
          <img class="item-img" mode="aspectFit" src="../../../static/internet.png" alt="">
          <p class="item-text">互联网专场</p>
        </div>
        <div class="item">
          <img class="item-img" mode="aspectFit" src="../../../static/collect.png" alt="">
          <p class="item-text">我的收藏</p>
        </div>
        <div class="item">
          <img class="item-img" mode="aspectFit" src="../../../static/offer.png" alt="">
          <p class="item-text">我的订单</p>
        </div>
      </div>

    </div>
    <item-list :list="list"></item-list>
    <div class="tips" v-if="!more">-没有更多商品了-</div>
  </div>
</template>

<script>
import { get } from '@/util.js'
import topswiper from '@/components/topswiper/topswiper'
import itemList from '@/components/itemlist/itemlist'
export default {
  components: {
    topswiper,
    itemList
  },
  data () {
    return {
      list: [],
      imgList: [
        'http://p0j1jycu8.bkt.clouddn.com/goods-18041981144461.png',
        'http://p0j1jycu8.bkt.clouddn.com/goods-180504460168250.jpg',
        'http://p0j1jycu8.bkt.clouddn.com/goods-1805071531771724.jpg',
        'http://p0j1jycu8.bkt.clouddn.com/goods-1805042049122415.jpg',
        'http://p0j1jycu8.bkt.clouddn.com/goods-1805041194237575.jpg',
        'http://p0j1jycu8.bkt.clouddn.com/goods-1805041017752503.jpg'
      ],
      page: 1,
      more: true
    }
  },
  watch: {
    list () {
      this.list.forEach((item, idx) => {
        item.image = this.imgList[idx % 6]
      })
    }
  },
  created () {
    this.getList()
  },
  methods: {
    goTosearch () {
      wx.navigateTo({
        url: '/pages/search/main'
      })
    },
    async getList (init) {
      let url = 'http://120.78.84.181/goods'
      // 重新刷新商品
      if (init) {
        this.page = 1
        this.more = true
      }
      wx.showNavigationBarLoading()
      const res = await get(url, {
        page: this.page
      })
      if (res.statusCode === 200) {
        let list = res.data.data
        if (list.length === 0) {
          this.more = false
        }
        if (init) {
          this.list = list
          wx.stopPullDownRefresh()
        } else {
          this.list.push(...list)
        }
      } else {
        console.log(res)
      }
      wx.hideNavigationBarLoading()
    }
  },
  onPullDownRefresh () {
    this.getList(true)
  },
  onReachBottom () {
    if (!this.more) {
      return
    }
    this.page = this.page + 1
    this.getList()
  }
}
</script>

<style lang="stylus" scoped>
.searchBtn 
  background: #eee
  padding: 10rpx
  margin: 10rpx 0

  .searchText 
    width: 80%
    border-radius: 10px
    vertical-align: middle
    text-align: center
    background: #ffffff
    margin: 0 auto
    font-size: 14px
    .searchIcon 
      margin: 2px 4px 0 0
.content
  .classification
    display flex
    .item
      flex 0 0 25%
      width 25%
      text-align center
      .item-img
        width 100%
        height 100rpx
      .item-text
        font-size 14px
.tips
  text-align center
  color #aaa
  margin 10px
  font-size 14px
</style>
