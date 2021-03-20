<template>
  <img class="img" :src="img_src">
</template>
<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'About',
  setup (props, context) {
    const state = reactive({
      img_src: '',
      imgs: [
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg',
        'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1730713693,2130926401&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2699863970,3643884691&fm=26&gp=0.jpg'
      ]
    })
    let i = 0
    setInterval(() => {
      state.img_src = state.imgs[i % state.imgs.length]
      i++
    }, 500)
    return {
      ...toRefs(state)
    }
  }
}
</script>
<style>
.img {
  width: 400px;
  height: 200px;
}
</style>
