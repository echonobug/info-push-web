<template>
  <a-layout style="height:100%">
    <Sider/>
    <a-layout style="height:100vh" :style="{ marginLeft: store.state.siderCollapsed?'80px':'200px'}">
      <Header/>
      <Main />
    </a-layout>
  </a-layout>
</template>
<script>
import Sider from './sider'
import Header from './header'
import Main from './main'
import { useStore } from 'vuex'

export default {
  components: {
    Sider,
    Header,
    Main
  },
  setup () {
    const store = useStore()
    return {
      store
    }
  }
}
</script>
