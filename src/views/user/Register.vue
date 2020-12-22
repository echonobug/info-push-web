<template>
  <div>
    <div class="input-item">
      <a-row type="flex" justify="space-between">
        <a-col :span="6">
          <h3>欢迎注册！</h3>
        </a-col>
        <a-col :span="8">
          <a-button type="link" @click="toLogin">
            使用已有账号登录
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-form
      ref="ruleFormRef"
      :model="loginForm"
      :rules="rules"
    >
      <a-form-item name="email">
        <a-input
          class="input-item"
          size="large"
          type="text"
          v-model:value="loginForm.email"
          placeholder="请输入邮箱">
          <template v-slot:prefix><i class="fa fa-envelope-o" aria-hidden="true"></i></template>
        </a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        trigger="focus"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model:visible="passwordLevelChecked">
        <template #content>
          <div :style="{ width: '240px' }">
            <div :class="passwordLevelClass">强度：<span>{{ passwordLevelName }}</span></div>
            <a-progress :percent="percent" :showInfo="false" :strokeColor=" passwordLevelColor "/>
          </div>
        </template>
        <a-form-item name="password">
          <a-input-password
            class="input-item"
            size="large"
            v-model:value="loginForm.password"
            @click="handlePasswordInputClick"
            placeholder="请输入密码">
            <template v-slot:prefix><i class="fa fa-lock" aria-hidden="true"></i></template>
          </a-input-password>
        </a-form-item>
      </a-popover>
      <a-form-item name="repeatPassword">
        <a-input-password
          class="input-item"
          size="large"
          v-model:value="loginForm.repeatPassword"
          placeholder="请再次输入密码">
          <template v-slot:prefix><i class="fa fa-lock" aria-hidden="true"></i></template>
        </a-input-password>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          @click="handleSubmit"
          :loading="loginBtn"
          :disabled="loginBtn"
          class="input-item"
        >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { toHome, toLogin } from '@/util/router'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}

export default {
  name: 'Register',
  setup () {
    const handlePasswordLevel = (rule, value) => {
      let level = 0
      if (/[0-9]/.test(value)) {
        level++
      }
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      if (value.length < 6 && level > 1) {
        level = 1
      }
      state.passwordLevel = level
      state.percent = level * 30
      if (level >= 2) {
        if (level >= 3) {
          state.percent = 100
        }
        return Promise.resolve()
      } else {
        if (level === 0) {
          state.percent = 10
        }
        return Promise.reject(new Error('请至少输入 6 个字符,同时必须包含字母数字与符号中的两种。'))
      }
    }
    const handlePasswordCheck = (rule, value) => {
      const password = state.loginForm.password
      return new Promise((resolve, reject) => {
        if (value === undefined || value.length === 0) {
          return reject(new Error('请再次输入密码'))
        }
        if (value && password && value.trim() !== password.trim()) {
          return reject(new Error('两次密码不一致'))
        }
        return resolve()
      })
    }
    const handlePasswordInputClick = () => {
      state.passwordLevelChecked = true
    }
    const passwordLevelClass = computed(() => levelClass[state.passwordLevel])
    const passwordLevelName = computed(() => levelNames[state.passwordLevel])
    const passwordLevelColor = computed(() => levelColor[state.passwordLevel])

    const state = reactive({
      loginForm: {
        email: '',
        password: '',
        repeatPassword: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: '邮箱不能为空！',
            trigger: 'blur'
          }, {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
            message: '邮箱格式不正确！',
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: handlePasswordLevel,
            trigger: 'change'
          }
        ],
        repeatPassword: [
          {
            validator: handlePasswordCheck,
            trigger: 'change'
          }
        ]
      },
      loginBtn: false,
      passwordLevelChecked: false,
      passwordLevel: 0,
      percent: 10,
      progressColor: '#FF0000'
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
      passwordLevelClass,
      passwordLevelName,
      passwordLevelColor,
      handlePasswordInputClick,
      handlePasswordCheck,
      toLogin
    }
  }
}
</script>

<style lang="scss" scoped>
.input-item {
  min-width: 400px;
}

.error {
  color: #ff0000;
}

.warning {
  color: #ff7e05;
}

.success {
  color: #52c41a;
}
</style>
