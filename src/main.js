import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'font-awesome/css/font-awesome.min.css'
import JsonViewer from 'vue3-json-viewer'

createApp(App).use(store).use(router).use(Antd).use(JsonViewer).mount('#app')
