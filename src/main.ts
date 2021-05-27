import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化css
import 'normalize.css/normalize.css'
import installElementPlus from './plugins/element'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import './styles/index.scss'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(installElementPlus)
  .mount('#app')

// vue 实例上挂载属性类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
  }
}
