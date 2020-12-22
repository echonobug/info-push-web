<template>
  <a-layout-sider class="sider" theme="dark" :collapsed="store.state.siderCollapsed" :trigger="null" collapsible>
    <logo/>
    <a-menu class="left-menu" theme="dark" mode="inline" v-model:selectedKeys="selectedKey">
      <Menu v-for="route in routes" :key="route.path" :item="route"></Menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import Logo from './logo'
import Menu from '@/components/menu'
import { routes, router } from '@/router'

export default {
  name: 'Sider',
  components: {
    Logo,
    Menu
  },
  setup () {
    const store = useStore()
    const selectedKey = []
    selectedKey.push(router.currentRoute.value.path)
    const navRoutes = routes
    const state = reactive({
      selectedKey: selectedKey,
      routes: navRoutes
    })
    return {
      ...toRefs(state),
      store
    }
  }
}
</script>

<style lang="scss" scoped>

.sider {
  height: 100%;
  position: fixed;
  left: 0;

  .left-menu {
    height: 100%;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    display: none;
  }
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
