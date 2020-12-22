<template>
  <a-result status="404" title="404" sub-title="Sorry, 您访问的页面走丢了！">
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
  name: 'Exception404',
  setup () {
    return { toHome }
  }
}
</script>
