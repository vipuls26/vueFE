import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import { createPinia } from 'pinia'
import apiUrl from './services/axios'

const app = createApp(App)

app.use(router)
app.component('HeaderComponet', HeaderComponent)
app.component('FooterComponent', FooterComponent)

// setup pinia 
const pinia = createPinia()
app.use(pinia)

app.config.globalProperties.$http = apiUrl;

app.mount('#app')
