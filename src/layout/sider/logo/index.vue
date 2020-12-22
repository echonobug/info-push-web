<template>
  <div class="sidebar-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <img src="@/assets/logo.png" class="sidebar-logo">
      <h1 v-if="!store.state.siderCollapsed" class="sidebar-title">{{ title }} </h1>
    </router-link>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, toRefs } from 'vue'

export default {
  name: 'Logo',
  setup (props, context) {
    const store = useStore()
    const state = reactive({
      title: '信息聚合与推送平台'
    })
    return {
      ...toRefs(state),
      store
    }
  }
}
</script>

<style lang="scss" scoped>

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #001529;
  text-align: center;
  overflow: hidden;

  .sidebar-logo-link {
    height: 100%;
    width: 100%;

    .sidebar-logo {
      width: 40px;
      height: 40px;
      vertical-align: middle;
    }

    .sidebar-title {
      display: inline-block;
      margin:  0 5px 0 5px;
      color: #fff;
      font-weight: 600;
      line-height: 40px;
      font-size: 15px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
