<template>
  <div class="userphone" v-if="auth">
    <input class="phone" type="text" v-model="phone" placeholder="手机号">
    <div class="phone-wrapper">
      <input class="code" type="text" v-model="code" placeholder="验证码">
      <div class="sendCode" :class="{disabled : clicked}" @click="sendCode">{{sendMsgText}}</div>
    </div>
    <div class="register" @click="checkCode">注册</div>
  </div>
</template>

<script>
import { get } from '@/util'
import config from '@/config'
export default {
  props: {
    auth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      phone: '',
      code: '',
      sendMsg: false,
      sendMsgText: '发送验证码',
      clicked: false,
      timer: ''
    }
  },
  methods: {
    countDown () {
      let time = 60
      this.timer = setInterval(() => {
        time--
        this.sendMsgText = time + '秒后再发送'
        if (time === 0) {
          clearInterval(this.timer)
          this.clicked = false
          this.sendMsg = false
          this.sendMsgText = '发送验证码'
        }
      }, 1000)
    },
    async sendCode () {
      if (this.clicked) {
        return
      }
      let url = config.host + '/weapp/sendcode'
      if (this.phone) {
        // if (!isPhoneAvailable(this.phone)) {
        //   wx.showModal({
        //     title: '手机号错误',
        //     content: '格式不正确'
        //   })
        //   return
        // }
        let res = await get(url, {
          phone: this.phone
        })
        console.log(res.data.data)
        if (res.data.data.msg === 200) {
          this.sendMsg = true
          this.clicked = true
          this.countDown()
        } else {
          wx.showModal({
            title: '发送失败',
            content: '错误代码为' + res.data.data.msg
          })
        }
      }
    },
    async checkCode () {
      if (this.code) {
        let url = config.host + '/weapp/checkcode'
        let res = await get(url, {
          phone: this.phone,
          code: this.code
        })
        console.log(res.data)
        if (res.data.code === 0 && res.data.data.msg.code === 200) {
          wx.showToast({
            title: '验证成功',
            icon: 'success'
          })
        } else {
          let msg = res.data.data.msg
          wx.showModal({
            title: '验证失败',
            content: '错误信息为' + msg.code + '/' + msg.msg
          })
        }
      } else {
        wx.showModal({
          title: '错误',
          content: '未发送短信或验证码不能为空'
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .userphone
    margin 10px
    .phone,.code
      border 1px solid #999
      border-radius 10px
      padding 10px
    .phone-wrapper
      display flex
      align-items center
      margin 10px 0
      .code
        flex 1
      .sendCode
        flex 1
        background #0dbc79
        border-radius 10px
        color #fff
        text-align center
        padding 10px 0
        margin-left 10px
        &.disabled
          background #999
    .register
      background #3367d6
      color #ffffff
      text-align center
      padding 10px 0
</style>
