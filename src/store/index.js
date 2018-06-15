import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    list: []
  },
  // actions: {
  //   changeList ({commit}, list) {
  //     commit()
  //   }
  // },
  mutations: {
    changeList (state, newList) {
      state.list = newList
    }
  }
})

export default store
