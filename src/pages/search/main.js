import Vue from 'vue'
import search from './search'

const app = new Vue(search)

app.$mount()

export default {
  config: {
    navigationBarTitleText: '搜索页面'
  }
}
