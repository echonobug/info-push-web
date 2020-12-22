<template>
  <a-sub-menu :key="item.path">
    <template v-slot:title>
      <span class="anticon"><i :class="item.meta.icon" aria-hidden="true"></i></span>
      <span>{{ item.meta.title }}</span>
    </template>
    <slot name="items"></slot>
  </a-sub-menu>
</template>

<script>
export default {
  name: 'Submenu',
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
  }
}
</script>
