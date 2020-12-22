<template>
  <a-result status="403" title="403" sub-title="Sorry, you don't have access to this page.">
    <template #extra>
      <a-button type="primary" @click="toHome">
        返回首页
      </a-button>
    </template>
  </a-result>
</template>

<script>
import { toHome } from '@/util/router'

export default {
  name: 'Exception403',
  setup () {
    return { toHome }
  }
}
</script>
