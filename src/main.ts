import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import ViewUIPlus from 'view-ui-plus'
import 'ant-design-vue/dist/reset.css';
import 'view-ui-plus/dist/styles/viewuiplus.css'
import myPlugin from './utils/myPlugin'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(ViewUIPlus)
app.use(myPlugin)

app.mount('#app')
