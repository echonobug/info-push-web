<template>
  <div class="container">
    <div class="logo">
      <img src="@/assets/logo.png" class="sidebar-logo">
      <h1>信息聚合与推送平台</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'UserLayout',
  components: {},
  setup () {
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-size: 100%;

  .logo {
    display: inline-flex;
    align-items: center;
    margin-right: 30px;
    margin-bottom: 15px;

    img {
      height: 80px;
      width: 80px;
      margin-bottom: 10px;
    }
  }
}
</style>
