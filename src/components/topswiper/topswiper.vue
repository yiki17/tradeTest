<template>
  <div>
    <swiper
            :indicator-dots="true"
            indicator-active-color="#fff"
            :autoplay="true"
            duration="1000"
            :circular="true"
            class="swiper"
        >
            <div :key="imgIndex" v-for="(img,imgIndex) in imgList">
                <swiper-item>
                    <img mode="aspectFill" :src="img" class="slide-image"/>
                </swiper-item>
            </div>
        </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgList: [
        'http://cddwarehouse.store/static/ad/2018/0507/15256684303590.jpg',
        'http://cddwarehouse.store/static/ad/2018/0507/15256684658463.jpg',
        'http://cddwarehouse.store/static/ad/2018/0523/15270419399559.jpg'
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .swiper
    height 250rpx
    .slide-image
      width 100%
      height 100%
</style>
