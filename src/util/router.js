import router from '@/router'

function go (url) {
  router.push(url).then(() => {
  })
}

export function toHome () {
  go('/')
}

export function toRegister () {
  go('/user/register')
}

export function toLogin () {
  go('/user/login')
}

export function toUserCenter () {
  go('/user/center')
}

export function show500 () {
  go('/500')
}

export function show403 () {
  go('/403')
}
