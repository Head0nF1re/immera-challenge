// import "@/assets/style.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'
import Aura from "@primevue/themes/aura";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark-mode',
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    },
})

app.mount('#app')
