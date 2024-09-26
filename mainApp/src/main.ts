import { createApp } from 'vue'
import './index.css'
// import router from './router.js'
import App from './App.vue'

// import Vue from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import home from './home.vue'
import climate from './climate.vue'
import reverseCam from './reverseCam.vue'
import carplay from './carplay.vue'


// import CurrentWeather from '.vue'
// import CurrentWeatherResponse from '../views/CurrentWeatherResponse.vue'
// Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: home
  },
  {
    path: '/reverseCam',
    name: 'reverseCam',
    component: reverseCam
  },
  {
    path: '/climate',
    name: 'climate',
    component: climate
  },
  {
    path: '/carplay',
    name: 'carplay',
    component: carplay
  }
]
const router = new createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App)
.use(router)
.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
let lastPage = ''
window.ipcRenderer.on('car', (payload, data) => {
  if (data === 'car-reverse') {
    lastPage = router.currentRoute._value.fullPath
    return router.replace({ path: '/reverseCam' })
  }

  if (data === 'car-park') return router.replace({ path: lastPage })


  // console.log(payload);
  console.log(data)

});
