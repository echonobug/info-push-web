<template>
  <a-result status="500" title="500" sub-title="Sorry, 服务器冒烟了！请稍后再试！">
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
  name: 'Exception500',
  setup () {
    return { toHome }
  }
}
</script>
