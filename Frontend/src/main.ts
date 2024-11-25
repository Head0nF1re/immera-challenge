import '@/assets/style.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { ToastService } from 'primevue'
import { vueQueryPluginOptions } from './plugins/vueQuery'
import { primeVueOptions } from './plugins/primeVue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(ToastService)
app.use(PrimeVue, primeVueOptions)

app.mount('#app')
