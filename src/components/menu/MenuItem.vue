<template>
  <a-menu-item :key="routeChildren.path" @click.capture="handleLink">
    <span class="anticon"><i :class="routeChildren.meta.icon" aria-hidden="true"></i></span>
    <span>{{ routeChildren.meta.title }}</span>
  </a-menu-item>
</template>

<script>
import { isExternal } from '@/util/validate'
import router from '@/router'

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default () {
        return null
      }
    },
    routeChildren: {
      type: Object,
      default () {
        return null
      }
    }
  },
  setup (props, context) {
    const handleLink = () => {
      const routePath = props.routeChildren.path
      const target = props.routeChildren.meta.target
      if (target === '_blank') {
        if (isExternal(routePath)) {
          window.open(routePath)
        } else if (router.currentRoute !== routePath) window.open(routePath.href)
      } else {
        if (isExternal(routePath)) {
          window.location.href = routePath
        } else if (router.currentRoute !== routePath) {
          router.push(routePath)
        }
      }
    }
    return {
      handleLink
    }
  }
}
</script>
