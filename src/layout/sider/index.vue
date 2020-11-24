<template>
  <a-layout-sider class="sider" theme="light" :collapsed="store.state.siderCollapsed" :trigger="null" collapsible>
    <div class="logo">logo</div>
    <a-menu theme="light" mode="inline" :selectedKeys="selectedKeys">
      <a-menu-item key="1">
        <user-outlined/>
        <span class="nav-text">nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <video-camera-outlined/>
        <span class="nav-text">nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <upload-outlined/>
        <span class="nav-text">nav 3</span>
      </a-menu-item>
      <a-menu-item key="4">
        <bar-chart-outlined/>
        <span class="nav-text">nav 4</span>
      </a-menu-item>
      <a-menu-item key="5">
        <cloud-outlined/>
        <span class="nav-text">nav 5</span>
      </a-menu-item>
      <a-menu-item key="6">
        <appstore-outlined/>
        <span class="nav-text">nav 6</span>
      </a-menu-item>
      <a-menu-item key="7">
        <team-outlined/>
        <span class="nav-text">nav 7</span>
      </a-menu-item>
      <a-menu-item key="8">
        <shop-outlined/>
        <span class="nav-text">nav 8</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined
} from '@ant-design/icons-vue'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Sider',
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined
  },
  setup (props, context) {
    const store = useStore()
    const state = reactive({
      selectedKeys: ['1']
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
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
