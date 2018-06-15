<template>
  <div>
    <button class="loginBtn" open-type="getUserInfo" @getuserinfo="login" v-if="!logined">获取授权</button>
  </div>
</template>

<script>
import config from '@/config'
import qcloud from 'wafer2-client-sdk'
export default {
  methods: {
    login (login) {
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          wx.setStorageSync('userinfo', userInfo)
          console.log(userInfo)
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.loginBtn {
  width: 250rpx;
  height: 100rpx;
  margin: 20rpx auto;
  color: #FF6A6A;
}
</style>
