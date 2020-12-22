<template>
  <a-dropdown placement="bottomRight" overlayClassName="content">
    <div class="content">
      <a-avatar class="avatar">U</a-avatar>
      <span class="uname">User Name</span>
    </div>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
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
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  padding: 0 15px;

  .avatar {
    color: #f56a00;
    background-color: #fde3cf;
  }

  .uname {
    margin-left: 10px;
  }

  .icon{
    margin-right: 5px;
  }
}
</style>
