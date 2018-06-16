<template>
  <div>
    <button class="loginBtn" open-type="getUserInfo" @getuserinfo="login" v-if="!loginSucess">获取授权</button>
    <div class="user" v-if="loginSucess">
      <img class="user-image" :src="userInfo.avatarUrl" alt="">
      <p class="user-name">{{userInfo.nickName}}</p>
      <p class="user-openId">{{userInfo.openId}}</p>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { post } from '@/util'
import qcloud from 'wafer2-client-sdk'
export default {
  data () {
    return {
      loginSucess: false,
      userInfo: {}
    }
  },
  methods: {
    login (login) {
      let that = this
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          wx.setStorageSync('userinfo', userInfo)
          console.log(userInfo)
          that.userInfo = userInfo
          that.loginSucess = true
          // that.signUp(userInfo.openId)
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    },
    async signUp (openId) {
      let url = 'http://120.78.84.181/auth/signUp'
      let res = await post(url, {
        openId
      })
      console.log(res)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loginBtn 
    width 250rpx
    height 100rpx
    margin 20rpx auto
    color #FF6A6A
  .user
    text-align center
    margin-top 50px
    .user-image
      width 250rpx
      height 250rpx
      border-radius 50%
    .user-name
      margin 10rpx
      color red
</style>
