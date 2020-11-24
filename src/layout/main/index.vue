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
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  minHeight: 280px
}

</style>
