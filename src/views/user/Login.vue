<template>
  <div>
    <a-form
      ref="ruleFormRef"
      :model="loginForm"
      :rules="rules"
    >
      <a-form-item name="name">
        <a-input
          class="input-item"
          size="large"
          type="text"
          v-model:value="loginForm.name"
          placeholder="请输入用户名或邮箱">
          <template v-slot:prefix><i class="fa fa-user" aria-hidden="true"></i></template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
          class="input-item"
          size="large"
          v-model:value="loginForm.password"
          placeholder="请输入密码">
          <template v-slot:prefix><i class="fa fa-lock" aria-hidden="true"></i></template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <div class="input-item">
          <a-row type="flex" justify="space-between">
            <a-col :span="6">
              <a-checkbox v-model:checked="loginForm.remember">
                记住我
              </a-checkbox>
            </a-col>
            <a-col :span="4">
              <a-button type="link" @click="toRegister">
                去注册
              </a-button>
            </a-col>
          </a-row>
        </div>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          @click="handleSubmit"
          :loading="loginBtn"
          :disabled="loginBtn"
          class="input-item"
        >确定
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { toHome, toRegister } from '@/util/router'

export default {
  name: 'Login',
  setup () {
    const state = reactive({
      loginForm: {
        name: '',
        password: '',
        remember: false
      },
      rules: {
        name: [
          {
            required: true,
            message: '账号不能为空！',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空！',
            trigger: 'blur'
          },
          {
            min: 3,
            message: '密码不能低于3位',
            trigger: 'blur'
          }
        ]
      },
      loginBtn: false
    })
    const store = useStore()
    const ruleFormRef = ref(null)
    const handleSubmit = () => {
      ruleFormRef.value
        .validate()
        .then(() => {
          state.loginBtn = true
          store.dispatch('LOGIN', state.loginForm)
            .then(() => {
              toHome()
            })
            .catch(e => {
              console.log(e)
            })
            .finally(() => {
              state.loginBtn = false
            })
        })
    }
    return {
      ...toRefs(state),
      handleSubmit,
      ruleFormRef,
      toRegister
    }
  }
}
</script>

<style lang="scss" scoped>
.input-item {
  min-width: 400px;
}
</style>
