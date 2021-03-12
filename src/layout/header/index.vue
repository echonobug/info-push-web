<template>
  <a-layout-header class="header">
    <div class="left-content">
      <a-row>
        <a-col>
          <menu-unfold-outlined v-if="store.state.siderCollapsed" class="trigger"
                                @click="() => store.dispatch('EXPANDED_SIDER')"/>
          <menu-fold-outlined v-else class="trigger" @click="() => store.dispatch('COLLAPSED_SIDER')"/>
        </a-col>
        <a-col>
          <div>
            <a-button type="link" size="large" style="color: black" @click="() => store.dispatch('RELOAD_CONTENT')">
              <i class="fa fa-refresh" aria-hidden="true"></i>
            </a-button>
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="right-content">
      <avatar-dropdown/>
    </div>
  </a-layout-header>
</template>

<script>

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import AvatarDropdown from '@/layout/header/components/AvatarDropdown'

export default {
  name: 'Header',
  components: {
    AvatarDropdown,
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
  padding: 0;
  height: 50px;
  line-height: 50px;

  .left-content {
    display: inline-block;
  }

  .right-content {
    float: right;
    display: inline-block;

    :hover {
      background-color: #fafafa;
    }
  }
}

.trigger {
  font-size: 18px;
  line-height: 50px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  :hover {
    color: #1890ff;
  }
}
</style>
