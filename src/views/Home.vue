<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    hello <i class="fa fa-user-o" aria-hidden="true"></i>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
