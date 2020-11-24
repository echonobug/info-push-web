<template>
  <a-layout-header class="header">
    <menu-unfold-outlined v-if="store.state.siderCollapsed" class="trigger"
                          @click="() => store.dispatch('EXPANDED_SIDER')"/>
    <menu-fold-outlined v-else class="trigger" @click="() => store.dispatch('COLLAPSED_SIDER')"/>
  </a-layout-header>
</template>

<script>

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
import { useStore } from 'vuex'

export default {
  name: 'Header',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup () {
    const store = useStore()
    return {
      store
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  padding: 0
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  :hover {
    color: #1890ff;
  }
}
</style>
