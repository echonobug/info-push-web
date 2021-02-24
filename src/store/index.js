import { createStore } from 'vuex'
import { login, getInfo } from '@/api/user'
import { ACCESS_TOKEN } from '@/util/constant'
import { toLogin } from '@/util/router'

export default createStore({
  state: {
    siderCollapsed: false,
    user: {
      name: '',
      avatar: '',
      roles: [],
      info: {}
    }
  },
  mutations: {
    COLLAPSED_SIDER (state) {
      state.siderCollapsed = true
    },
    EXPANDED_SIDER (state) {
      state.siderCollapsed = false
    },
    SET_NAME: (state, name) => {
      state.user.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.user.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.user.roles = roles
    },
    SET_INFO: (state, info) => {
      state.user.info = info
    }
  },
  actions: {
    COLLAPSED_SIDER ({ commit }) {
      commit('COLLAPSED_SIDER')
    },
    EXPANDED_SIDER ({ commit }) {
      commit('EXPANDED_SIDER')
    },
    LOGIN ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(data => {
          localStorage.setItem(ACCESS_TOKEN, data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GET_USER_INFO ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(data => {
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LOGOUT ({ commit }) {
      commit('SET_NAME', '')
      commit('SET_ROLES', [])
      localStorage.removeItem(ACCESS_TOKEN)
      toLogin()
    }
  },
  modules: {}
})
