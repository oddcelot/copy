import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { useColorScheme } from './utils/colorScheme'
useColorScheme()
createApp(App).mount('#app')
