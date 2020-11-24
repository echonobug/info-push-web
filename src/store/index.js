import { createStore } from 'vuex'

export default createStore({
  state: {
    siderCollapsed: false
  },
  mutations: {
    COLLAPSED_SIDER (state) {
      state.siderCollapsed = true
    },
    EXPANDED_SIDER (state) {
      state.siderCollapsed = false
    }
  },
  actions: {
    COLLAPSED_SIDER ({ commit }) {
      commit('COLLAPSED_SIDER')
    },
    EXPANDED_SIDER ({ commit }) {
      commit('EXPANDED_SIDER')
    }
  },
  modules: {}
})
