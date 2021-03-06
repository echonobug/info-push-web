<template>
  <a-dropdown placement="bottomRight" overlayClassName="content">
    <div class="content">
      <a-avatar v-if="isBlank(store.state.user.avatar)" class="avatar">
        {{ getFirst(store.state.user.name) }}
      </a-avatar>
      <span class="uname">{{ store.state.user.name }}</span>
    </div>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" @click="onClick">
        <a-menu-item key="center">
          <span class="icon"><i class="fa fa-user-o" aria-hidden="true"></i></span>
          个人中心
        </a-menu-item>
        <a-menu-item key="settings">
          <span class="icon"><i class="fa fa-cog" aria-hidden="true"></i></span>
          个人设置
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="logout">
          <span class="icon"><i class="fa fa-sign-out" aria-hidden="true"></i></span>
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import { useStore } from 'vuex'
import { isBlank } from '@/util/validate'
import { toUserCenter } from '@/util/router'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const store = useStore()
    const getFirst = (name) => {
      const begin = name.trim().split(' ')[0]
      return /^\w*$/.test(begin) ? begin : begin.charAt(0)
    }
    const onClick = ({ key }) => {
      if (key === 'center') {
        toUserCenter()
      } else if (key === 'logout') {
        Modal.confirm({
          title: '信息',
          content: '确认登出吗？',
          okText: '是的',
          cancelText: '取消',
          icon: createVNode(ExclamationCircleOutlined),
          onOk: () => {
            store.dispatch('LOGOUT')
          },
          onCancel () {
          }
        })
      }
    }
    return {
      store,
      isBlank,
      onClick,
      getFirst
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  padding: 0 15px;
  min-width: 120px;

  .avatar {
    color: #f56a00;
    background-color: #fde3cf;
  }

  .uname {
    margin-left: 10px;
  }

  .icon {
    margin-right: 5px;
  }
}
</style>
