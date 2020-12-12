<template>
  <a-layout-content class="content">
    <router-view/>
  </a-layout-content>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped>
.content {
  margin: 5px;
  padding: 24px;
  background: #fff;
  height: 100%;
  overflow: auto;
}

::-webkit-scrollbar {
  display: none;
}
</style>
