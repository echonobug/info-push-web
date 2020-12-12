<template>
  <a-layout-sider class="sider" theme="dark" :collapsed="store.state.siderCollapsed" :trigger="null" collapsible>
    <logo />
    <a-menu class="left-menu" theme="dark" mode="inline" v-model:selectedKeys="selectedKey">
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
      <a-menu-item key="11">
        <user-outlined/>
        <span class="nav-text">nav 1</span>
      </a-menu-item>
      <a-menu-item key="12">
        <video-camera-outlined/>
        <span class="nav-text">nav 2</span>
      </a-menu-item>
      <a-menu-item key="13">
        <upload-outlined/>
        <span class="nav-text">nav 3</span>
      </a-menu-item>
      <a-menu-item key="14">
        <bar-chart-outlined/>
        <span class="nav-text">nav 4</span>
      </a-menu-item>
      <a-menu-item key="15">
        <cloud-outlined/>
        <span class="nav-text">nav 5</span>
      </a-menu-item>
      <a-menu-item key="16">
        <appstore-outlined/>
        <span class="nav-text">nav 6</span>
      </a-menu-item>
      <a-menu-item key="17">
        <team-outlined/>
        <span class="nav-text">nav 7</span>
      </a-menu-item>
      <a-menu-item key="18">
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
import Logo from './Logo'

export default {
  name: 'Sider',
  components: {
    Logo,
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
      selectedKey: ['1']
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
