import Vue from 'vue'
import me from './me'

const app = new Vue(me)

app.$mount()

export default {
  config: {
    // enablePullDownRefresh: true
  }
}
