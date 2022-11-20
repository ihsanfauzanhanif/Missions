import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/custom.css'
window.$ = window.jQuery = require('jquery');

createApp(App).use(router).mount('#app')

import 'bootstrap/dist/js/bootstrap'