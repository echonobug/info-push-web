<template>
  <a-layout>
    <Sider/>
    <a-layout>
      <Header/>
      <Main />
    </a-layout>
  </a-layout>
</template>
<script>
import Sider from './sider'
import Header from './header'
import Main from './main'

export default {
  components: {
    Sider,
    Header,
    Main
  }
}
</script>
