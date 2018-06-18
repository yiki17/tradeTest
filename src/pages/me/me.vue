<template>
  <div>
    <button class="loginBtn" open-type="getUserInfo"  @getuserinfo="login" v-if="!loginSucess">获取授权</button>
    <div class="user" v-if="loginSucess">
      <img class="user-image" :src="userInfo.avatarUrl" alt="">
      <p class="user-name">{{userInfo.nickName}}</p>
      <p class="user-openId">{{openId}}</p>
      <button v-if="openId" class="phoneReg" open-type="getPhoneNumber" @getphonenumber="getPhone">手机注册</button>
    </div>
    <register :auth="auth"></register>
  </div>
</template>

<script>
import config from '@/config'
import { get, post } from '@/util'
import register from '@/components/register/register'
// import qcloud from 'wafer2-client-sdk'
export default {
  components: {
    register
  },
  data () {
    return {
      loginSucess: false,
      userInfo: {},
      openId: '',
      auth: false
    }
  },
  methods: {
    login (login) {
      let that = this
      if (login.mp.detail.errMsg === 'getUserInfo:ok') {
        this.userInfo = login.mp.detail.userInfo
        this.loginSucess = true
        wx.login({
          async success (res) {
            if (res.errMsg === 'login:ok') {
              let code = res.code
              let url = config.host + '/weapp/getopenid'
              let result = await get(url, {
                code
              })
              if (result.data.code === 0) {
                let open = result.data.data.msg
                console.log(open)
                that.openId = open.openid
                that.auth = true
              } else {
                console.log(result.errMsg)
                wx.showModal({
                  title: '错误',
                  content: '授权失败'
                })
              }
            }
          }
        })
      } else {
        console.log(login.mp.detail.errMsg)
        wx.showModal({
          title: '错误',
          content: '授权失败'
        })
      }
      // let that = this
      // qcloud.setLoginUrl(config.loginUrl)
      // qcloud.login({
      //   success: function (userInfo) {
      //     wx.setStorageSync('userinfo', userInfo)
      //     console.log(userInfo)
      //     that.userInfo = userInfo
      //     that.loginSucess = true
      //     // that.signUp(userInfo.openId)
      //   },
      //   fail: function (err) {
      //     console.log('登录失败', err)
      //   }
      // })
    },
    getPhone (e) {
      console.log(e)
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
