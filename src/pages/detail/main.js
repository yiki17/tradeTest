import Vue from 'vue'
import detail from './detail'

const app = new Vue(detail)

app.$mount()

export default {
  config: {
    enablePullDownRefresh: true
  }
}
