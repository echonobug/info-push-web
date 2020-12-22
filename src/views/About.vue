<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
    {{ data }}
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { getInfo } from '@/api/user'

export default {
  name: 'About',
  setup (props, context) {
    const store = useStore()
    const state = reactive({
      data: 'HELLO'
    })
    getInfo().then(data => {
      state.data = JSON.stringify(data)
    })
    return {
      ...toRefs(state),
      store
    }
  }
}
</script>
