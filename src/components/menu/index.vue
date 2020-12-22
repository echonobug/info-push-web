<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
  >
    <template v-if="item.children && item.children.length" v-slot:items>
      <Menu
        v-for="route in item.children"
        :key="route.path"
        :item="route"
      ></Menu>
    </template>
  </component>
</template>

<script>
import MenuItem from './MenuItem'
import Submenu from './Submenu'
import { reactive, toRefs } from 'vue'

export default {
  name: 'Menu',
  components: {
    MenuItem,
    Submenu
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const handleChildren = (children = []) => {
      if (children === null) return []
      return children.filter((item) => item.hidden !== true)
    }
    const showChildren = handleChildren(props.item.children)
    let menuComponent
    let routeChildren
    if (showChildren.length === 0) {
      menuComponent = 'MenuItem'
      routeChildren = toRefs(props.item)
    } else if (showChildren.length === 1 && props.item.alwaysShow !== true) {
      menuComponent = 'MenuItem'
      routeChildren = showChildren[0]
    } else {
      menuComponent = 'Submenu'
    }

    const state = reactive({
      routeChildren: routeChildren,
      menuComponent: menuComponent
    })
    return {
      ...toRefs(state),
      handleChildren
    }
  }
}
</script>
