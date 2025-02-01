import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import components from './primeComponents'
import 'primeicons/primeicons.css'

import { initializeApp } from 'firebase/app'

/* ------------------------------------------------------ */

const app = createApp(App)

const firebaseConfig = {
  apiKey: 'AIzaSyCLXYbwDgRFqgXMA2Mw-25ZKFpyJmkTBgw',
  authDomain: 'vue-jwt-d524c.firebaseapp.com',
  projectId: 'vue-jwt-d524c',
  storageBucket: 'vue-jwt-d524c.firebasestorage.app',
  messagingSenderId: '105236435382',
  appId: '1:105236435382:web:49eec26961583a97447117',
}
initializeApp(firebaseConfig)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

components.forEach(({ name, component }) => {
  app.component(name, component)
})

app.mount('#app')
