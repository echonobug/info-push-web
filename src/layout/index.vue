<template>
  <div v-if="loading" class="full load">
    <a-spin tip="服务器带宽较低，拼命加载中..." size="large"/>
  </div>
  <div v-else class="full">
    <a-layout style="height:100%">
      <Sider/>
      <a-layout style="height:100vh" :style="{ marginLeft: store.state.siderCollapsed?'80px':'200px',transition: 'margin-left 0.3s'}">
        <Header/>
        <Main/>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import Sider from './sider'
import Header from './header'
import Main from './main'
import { useStore } from 'vuex'
import { toLogin } from '@/util/router'
import { reactive, toRefs } from 'vue'

export default {
  components: {
    Sider,
    Header,
    Main
  },
  setup () {
    const store = useStore()
    const state = reactive(
      {
        loading: true
      }
    )
    if (store.state.user.name.length === 0) {
      store.dispatch('GET_USER_INFO').then(() => {
      }).catch(() => {
        toLogin()
      }).finally(() => {
        state.loading = false
      })
    } else {
      state.loading = false
    }
    return {
      ...toRefs(state),
      store
    }
  }

}
</script>
<style lang="scss" scoped>
.load {
  background-color: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.full {
  width: 100vw;
  height: 100vh;
}
</style>
