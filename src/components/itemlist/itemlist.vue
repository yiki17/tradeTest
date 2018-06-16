<template>
  <div>
    <div class="list">
      <div class="item" v-for="(item,idx) in list" :key="idx" @click="goToDetail(item)">
        <img mode="aspectFit" class="item-image" :src="item.image" alt="">
        <p class="cn">{{item.cn_title}}</p>
        <p class="en">{{item.en_title}}</p>
        <p class="price">￥{{item.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default () {
        return []
      }
    }
  },
  methods: {
    goToDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  },
  filter: {
    random (val) {
      console.log(Math.floor(Math.random() * 10))
      return val + Math.floor(Math.random() * 10)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list
    display flex
    flex-wrap: wrap
    margin-top 10px
    background #fff
    .item
      flex 0 0 50%
      width 50%
      text-align center
      .item-image
        width 100%
        height 200rpx
      .price
        color red
</style>
