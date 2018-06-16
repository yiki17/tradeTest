<template>
  <div v-if="detail" class="detail">
    <p>cn title: {{detail.cn_title}}</p>
    <p>en title: {{detail.en_title}}</p>
    <p>price: {{detail.price}}</p>
    <p>market price: {{detail.market_price}}</p>
  </div>
</template>

<script>
import { get } from '@/util'
export default {
  data () {
    return {
      detail: {}
    }
  },
  mounted () {
    this.shopId = this.$root.$mp.query.id
    console.log(this.shopId)
    this.getDetail()
  },
  methods: {
    async getDetail () {
      let url = 'http://120.78.84.181/goods/' + this.shopId
      let detail = await get(url)
      this.detail = detail.data.data
      console.log(this.detail)
      wx.setNavigationBarTitle({
        title: this.detail.cn_title
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .detail
    text-align center
</style>
